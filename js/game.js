// Board
let grid = document.getElementsByClassName("cell");

// Textboxes
let player_textbox = document.getElementById("player-text");

// Game Variables
    // "going" : Game is going on
    // "over" : Game is over
    // "X" : Game is won by X
    // "O" : Game is won by O
let game_status = "going";
    // Variable which maintain which player is here
let cur_player = 'a';
    // Accounts how many X and O are placed
let placed_chars = 0;

// Functions
// Whenever new game starts new board will be made by this or board will be reset
function Start() {
    let ran = Math.floor(Math.random() * 2);
    cur_player = (ran == 0) ? 'X' : 'O';

    game_status = "going";
    placed_chars = 0;

    player_textbox.innerText = "Current Player: " + cur_player;
}

// To toggle player X to O and O to X
function TogglePlayer() {
    cur_player = (cur_player === 'X') ? 'O' : 'X';
    player_textbox.innerText = "Current Player: " + cur_player;
}

// Check someone is won or not
    // if won return that character i.e. X or O
    // if none win return null
function SomeoneWon() {
    // Winner Logic for
    // rows
    for(let i=0 ; i<9 ; i+=3) {
        if(grid[i].innerText === grid[i+1].innerText && grid[i+1].innerText === grid[i+2].innerText)
            return grid[i].innerText;
    }
    
    // columns
    for(let i=0 ; i<3 ; ++i) {
        if(grid[i].innerText === grid[i+3].innerText && grid[i+3].innerText === grid[i+6].innerText)
            return grid[i].innerText;
    }
    // diagonal
    if(grid[0].innerText === grid[4].innerText && grid[4].innerText === grid[8].innerText)
        return grid[0].innerText;

    // anti-diagonal
    if(grid[2].innerText === grid[4].innerText && grid[4].innerText === grid[6].innerText)
        return grid[2].innerText;

    return null;
}

// Updates the status of the current game
function CheckStatus() {
    let won_status = SomeoneWon();
    if(won_status != null) {
        game_status = won_status;
        return;
    }
    if(placed_chars === 9) game_status = "over";
}

// Place the appropiate Status on the TextBox
function PlaceStatuOnTextBox() {
    if(game_status === "over") player_textbox.innerText = "GAME DRAW";
    else if(game_status === "X") player_textbox.innerText = "X WON GAME";
    else if(game_status === "O") player_textbox.innerText = "X WON GAME";
}

// Place the X or O on the approiate position on the board
function Place_Char(row, col) {
    if(game_status !== "going") return;

    let ind = 3 * row + col;

    if(grid[ind].innerText === 'X' || grid[ind].innerText === 'O') return;

    grid[ind].innerText = cur_player;
    ++placed_chars;

    TogglePlayer();
    
    CheckStatus();
    PlaceStatuOnTextBox();
}

// Whenever the reset button is pressed, this function initiated
function reset() {
    for(let r=0 ; r<9 ; ++r) grid[r].innerText = r + 1;
    Start();
}

// Initial Execution
    // Where all fun begins
Start();