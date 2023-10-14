class TicTacToe{
    private tiles: Element[];
    private playerDisplay: Element | null;
    private resetButton: Element | null;
    private announcer: Element | null;
    private board: string[];
    private currentPlayer: string;
    private isGameActive: boolean;
    private readonly PLAYERX_WON: string = 'PLAYERX_WON';
    private readonly PLAYERO_WON: string = 'PLAYERO_WON';
    private readonly TIE: string = 'TIE';
    private readonly winningConditions: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    constructor(){
        this.tiles = Array.from(document.querySelectorAll('.tile'));
        this.playerDisplay = document.querySelector('.display-player');
        this.resetButton = document.querySelector('#reset');
        this.announcer = document.querySelector('.announcer');

        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.isGameActive = true;
        this.init();
    
    }
    private init = ():void => {
        this.tiles.forEach( (tile: Element, index: number) => {
            tile.addEventListener('click', () => this.userAction(tile, index));
        });
        if(this.resetButton )this.resetButton.addEventListener('click', this.resetBoard);
    }
    private handleResultValidation = ():void => {
        let roundWon = false;
        for (let i: number = 0; i <= 7; i++) {
            const winCondition = this.winningConditions[i];
            const [a , b , c] =winCondition.map(index => this.board[index])
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            this.announce(this.currentPlayer === 'X' ? this.PLAYERX_WON : this.PLAYERO_WON);
            this.isGameActive = false;
            return;
        }
        if (!this.board.includes('')) this.announce(this.TIE);
    }
    private announce = (type: string):void => {
        if (this.announcer){
            switch (type) {
                case this.PLAYERO_WON:
                    this.announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                    break;
                case this.PLAYERX_WON:
                    this.announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                    break;
                case this.TIE:
                    this.announcer.innerHTML = 'Tie';
            }
            this.announcer.classList.remove('hide');
        }

    }
    private isValidAction = (tile: Element): boolean => {
        return tile.textContent !== 'X' && tile.textContent !== 'O'
    };
    private updateBoard =  (index: number): void => {
        this.board[index] = this.currentPlayer;
    }
    private changePlayer = ():void => {
        if (this.playerDisplay){
            this.playerDisplay.classList.remove(`player${this.currentPlayer}`);
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.playerDisplay.innerHTML = this.currentPlayer;
            this.playerDisplay.classList.add(`player${this.currentPlayer}`);
        }
    }
    private userAction = (tile: Element, index: number):void => {
        if(this.isValidAction(tile) && this.isGameActive) {
            tile.innerHTML = this.currentPlayer;
            tile.classList.add(`player${this.currentPlayer}`);
            this.updateBoard(index);
            this.handleResultValidation();
            this.changePlayer();
        }
    }
    private resetBoard = ():void => {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.isGameActive = true;
        if(this.announcer) this.announcer.classList.add('hide');

        if (this.currentPlayer === 'O') {
            this.changePlayer();
        }

        this.tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

}
window.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
})