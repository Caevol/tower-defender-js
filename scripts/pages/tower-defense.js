Menu.screens['tower-defense'] =  (function() {


    function initialize() {
        Keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function () {
            Game.endGame();
            Menu.showScreen('main-menu');
        });

        Mouse.registerCommand("mousedown", function(e) {
            if(Game.gameState().selectedTower === null){
                return;
            }


            let posX = Math.round((e.clientX - GameGraphics.canvas.offsetLeft) / Renderer.worldxScale);
            let posY = Math.round((e.clientY - GameGraphics.canvas.offsetTop) / Renderer.worldyScale);

            if(posX >= 0 && posY >= 0 && posX < Game.BOARD_SIZE && posY < Game.BOARD_SIZE) {
                //console.log(posX + " " + posY);
                Game.insertTurret(posX, posY);
            }

        });

        Mouse.registerCommand("mousemove", function(e){
            if(Game.gameState().selectedTower === null){
                return;
            }
        });

        document.getElementById("next-wave").addEventListener(
            "click",
            function() {
                if(Game.gameState().waveComplete === true) {
                    Game.gameState().waveComplete = false;
                    this.disabled = true;
                }
            });

        document.getElementById("tower-1").addEventListener(
            "click",
            function() {
                if(Game.gameState().selectedTower !== "scifi3") {
                    Game.gameState().selectedTower = "scifi3";
                } else {
                    Game.gameState().selectedTower = null;
                }
            });

    }


    function run() {

        Game.rebuildGame();
        Game.gameLoop(performance.now() - Game.gameState().prevTime);
    }

    return {
        initialize : initialize,
        run : run
    };
}());
