
Game = (function(graphics) {

    const BOARD_SIZE = 50;
    let gameState = {};

    function Tile(occ){
        return {
            occupied: occ   //bool
        }
    }

    function getGameState(){
        return gameState;
    }

    function pointIsOccupied(x, y){
        const LEGAL_POINTS = [BOARD_SIZE / 2 - 2, BOARD_SIZE / 2 - 1, BOARD_SIZE / 2, BOARD_SIZE / 2 + 1];
        if (x == 0 || y == 0 || x == BOARD_SIZE - 1 || y == BOARD_SIZE - 1) {
            if(LEGAL_POINTS.indexOf(x) == -1 && LEGAL_POINTS.indexOf(y) == -1) {
                return true
            }
        }
        return false
    }

    function TileBoard(sizeX, sizeY) {
        let tileBoard = [];

        for (let y = 0; y < sizeY; y++) {
            let row = [];
            for (let x = 0; x < sizeX; x++){
                row.push(Tile(pointIsOccupied(x, y)));
            }
            tileBoard.push(row);
        }
        return tileBoard;
    }


    function rebuildGame() {
        gameState = {
            selectedTower: null,
            purchaseTower: null,
            waveNumber: 0,
            waves: [],
            monsters: [],
            money: 150,
            waveComplete: true,
            tileBoard: TileBoard(BOARD_SIZE, BOARD_SIZE),
            continueGame: true
        }

    }

    function endGame() {
        continueGame = false;
    }


    function gameLoop(elapsedTime) {
        if(gameState.continueGame === false){
            return;
        }

        //process input
        //update game model
        //render
    }


    return {
        gameLoop: gameLoop,
        rebuildGame: rebuildGame,
        endGame: endGame,
        gameState: getGameState
    }

}(GameGraphics));