var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Player = /** @class */ (function () {
    function Player() {
        var _this = this;
        this.changePlayer = function () {
            if (_this.currentPlayer && _this.html.playerDisplay !== null) {
                _this.html.playerDisplay.classList.remove("player".concat(_this.currentPlayer));
                _this.currentPlayer = (_this.currentPlayer === "X") ? "O" : "X";
                _this.html.playerDisplay.innerHTML = _this.currentPlayer;
                _this.html.playerDisplay.classList.add("player".concat(_this.currentPlayer));
            }
        };
        this.currentPlayer = "X";
        this.html = new Html();
    }
    return Player;
}());
var PlayerX = /** @class */ (function () {
    function PlayerX() {
        this.PLAYER_X_WON = 'PLAYER_X_WON';
    }
    return PlayerX;
}());
var PlayerO = /** @class */ (function () {
    function PlayerO() {
        this.PLAYER_O_WON = 'PLAYER_O_WON';
    }
    return PlayerO;
}());
var Html = /** @class */ (function () {
    function Html() {
        this.TIE = 'TIE';
        this.tiles = __spreadArray([], document.querySelectorAll('.tile'), true);
        this.playerDisplay = document.querySelector('.display-player');
        this.resetButton = document.querySelector('#reset');
        this.announcer = document.querySelector('.announcer');
    }
    return Html;
}());
var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        var _this = this;
        this.init = function () {
            _this.html.tiles.forEach(function (tile, index) {
                tile.addEventListener('click', function () { return _this.userAction(tile, index); });
            });
            if (_this.html.resetButton)
                _this.html.resetButton.addEventListener('click', _this.resetBoard);
        };
        this.handleResultValidation = function () {
            var roundWon = false;
            var winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (var i = 0; i <= 7; i++) {
                var _a = winningConditions[i].map(function (index) { return _this.board[index]; }), a = _a[0], b = _a[1], c = _a[2];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
            if (roundWon) {
                _this.announce(_this.player.currentPlayer === 'X' ? _this.playerX.PLAYER_X_WON : _this.playerO.PLAYER_O_WON);
                _this.isGameActive = false;
                return;
            }
            if (_this.board.every(function (cell) { return cell !== ''; })) {
                _this.announce(_this.html.TIE);
            }
        };
        this.announce = function (type) {
            if (_this.html.announcer) {
                switch (type) {
                    case _this.playerO.PLAYER_O_WON:
                        _this.html.announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                        break;
                    case _this.playerX.PLAYER_X_WON:
                        _this.html.announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                        break;
                    case _this.html.TIE:
                        _this.html.announcer.innerHTML = 'Tie';
                }
                _this.html.announcer.classList.remove('hide');
            }
        };
        this.isValidAction = function (tile) {
            return tile.textContent !== "X" && tile.textContent !== "O";
        };
        this.updateBoard = function (index) {
            _this.board[index] = _this.player.currentPlayer;
        };
        this.userAction = function (tile, index) {
            if (_this.isValidAction(tile) && _this.isGameActive) {
                tile.innerHTML = _this.player.currentPlayer;
                tile.classList.add("player".concat(_this.player.currentPlayer));
                _this.updateBoard(index);
                _this.handleResultValidation();
                _this.player.changePlayer();
            }
        };
        this.resetBoard = function () {
            _this.board = ['', '', '', '', '', '', '', '', ''];
            _this.isGameActive = true;
            if (_this.html.announcer)
                _this.html.announcer.classList.add('hide');
            if (_this.player.currentPlayer === 'O') {
                _this.player.changePlayer();
            }
            _this.html.tiles.forEach(function (tile) {
                tile.innerHTML = '';
                tile.classList.remove('playerX');
                tile.classList.remove('playerO');
            });
        };
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.isGameActive = true;
        this.html = new Html();
        this.player = new Player();
        this.playerO = new PlayerO();
        this.playerX = new PlayerX();
        this.init();
    }
    return TicTacToe;
}());
window.addEventListener('DOMContentLoaded', function () {
    new TicTacToe();
});
