Menu.screens['tower-defense'] =  (function() {


    function initialize() {
        Keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function () {
            Game.endGame();
            Menu.showScreen('main-menu');
        });

        Mouse.registerCommand("mousedown", function(e) {

            let posX = Math.round((e.clientX - GameGraphics.canvas.offsetLeft) / Renderer.worldxScale);
            let posY = Math.round((e.clientY - GameGraphics.canvas.offsetTop) / Renderer.worldyScale);

            if(Game.gameState().purchaseTower === null){

                Game.selectTower(posX, posY);
                return;
            }

            if(Game.gameState().purchaseTower !== null && posX >= 0 && posY >= 0 && posX < Game.BOARD_SIZE && posY < Game.BOARD_SIZE) {
                //console.log(posX + " " + posY);
                Game.insertTurret(posX, posY);
            }

        });

        Mouse.registerCommand("mousemove", function(e){
            if(Game.gameState().purchaseTower === null){
                return;
            }

            let posX = Math.round((e.clientX - GameGraphics.canvas.offsetLeft) / Renderer.worldxScale);
            let posY = Math.round((e.clientY - GameGraphics.canvas.offsetTop) / Renderer.worldyScale);


            if(posX !== Game.gameState().curMouseX || posY !== Game.gameState().curMouseY){
                    Game.gameState().curMouseX = posX;
                    Game.gameState().curMouseY = posY;
                    Game.gameState().mouseMovedThisFrame = true;
            }
            else {
                Game.gameState().mouseMovedThisFrame = false;
            }

        });

        document.getElementById("Upgrade").addEventListener(
            "click",
            function() {
                Game.upgradeSelectedTower();
            }
        );

        document.getElementById("Sell").addEventListener(
            "click",
            function() {
                Game.sellSelectedTower();
            }
        );

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
                if(Game.gameState().purchaseTower !== "scifi3") {
                    Game.gameState().purchaseTower = "scifi3";
                } else {
                    Game.gameState().purchaseTower = null;
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
