class Player{
    public currentPlayer: string;
    private html: Html;
    constructor(){
        this.currentPlayer = "X";
        this.html = new Html();
    }
   public changePlayer = ():void => {
        if (this.currentPlayer && this.html.playerDisplay !== null){
            this.html.playerDisplay.classList.remove(`player${this.currentPlayer}`);
            this.currentPlayer = (this.currentPlayer === "X") ? "O" : "X";
            this.html.playerDisplay.innerHTML = this.currentPlayer;
            this.html.playerDisplay.classList.add(`player${this.currentPlayer}`);
        }
    }

}
class PlayerX{
    public PLAYER_X_WON: string = 'PLAYER_X_WON';

}
class PlayerO{
    public PLAYER_O_WON: string = 'PLAYER_O_WON';
}
class Html{
    public tiles:Element[];
    public playerDisplay: Element | null;
    public resetButton: Element | null;
    public announcer: Element | null;
    public TIE: string = 'TIE';
    constructor(){
        this.tiles = [...document.querySelectorAll('.tile')];
        this.playerDisplay = document.querySelector('.display-player');
        this.resetButton = document.querySelector('#reset');
        this.announcer = document.querySelector('.announcer');

    }
}
class TicTacToe{
    private board: string[];
    private isGameActive: boolean;
    private html: Html;
    private player: Player;
    private playerX : PlayerX;
    private playerO : PlayerO;

    constructor(){
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.isGameActive = true;
        this.html = new Html();
        this.player = new Player();
        this.playerO = new PlayerO();
        this.playerX = new PlayerX();
        

        this.init();
    }
    private init = ():void => {
        this.html.tiles.forEach( (tile: Element, index: number) => {
            tile.addEventListener('click', () => this.userAction(tile, index));
        });
        if(this.html.resetButton )this.html.resetButton.addEventListener('click', this.resetBoard);
    }
    private handleResultValidation = ():void => {
        let roundWon = false;
        const winningConditions: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i: number = 0; i <= 7; i++) {
            const [a, b, c] = winningConditions[i].map(index => this.board[index]);
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            this.announce(this.player.currentPlayer === 'X' ? this.playerX.PLAYER_X_WON : this.playerO.PLAYER_O_WON);
            this.isGameActive = false;
            return;
        }
        if (this.board.every(cell => cell !== '')) {
            this.announce(this.html.TIE);
        }
    }
    private announce = (type: string):void => {
        if (this.html.announcer){
            switch (type) {
                case this.playerO.PLAYER_O_WON:
                    this.html.announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                    break;
                case this.playerX.PLAYER_X_WON:
                    this.html.announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                    break;
                case this.html.TIE:
                    this.html.announcer.innerHTML = 'Tie';
            }
            this.html.announcer.classList.remove('hide');
        }

    }
    private isValidAction = (tile: Element): boolean => {
        return tile.textContent !== "X" && tile.textContent !== "O"
    };
    private updateBoard =  (index: number): void => {
        this.board[index] = this.player.currentPlayer;
    }
    
    private userAction = (tile: Element, index: number):void => {
        if(this.isValidAction(tile) && this.isGameActive) {
            tile.innerHTML = this.player.currentPlayer;
            tile.classList.add(`player${this.player.currentPlayer}`);
            this.updateBoard(index);
            this.handleResultValidation();
            this.player.changePlayer();
        }
    }
    private resetBoard = ():void => {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.isGameActive = true;
        if(this.html.announcer) this.html.announcer.classList.add('hide');

        if (this.player.currentPlayer === 'O') {
            this.player.changePlayer();
        }

        this.html.tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

}

window.addEventListener('DOMContentLoaded',() =>  {
    new TicTacToe();

})