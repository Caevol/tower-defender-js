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

        document.getElementById("Upgrade").addEventListener("click", Game.upgradeSelectedTower);

        document.getElementById("Sell").addEventListener("click", Game.sellSelectedTower);

        document.getElementById("next-wave").addEventListener("click", Game.nextWave);

        document.getElementById("tower-1").addEventListener(
            "click",
            function() {
                if(Game.gameState().purchaseTower !== "scifi1") {
                    Game.gameState().purchaseTower = "scifi1";
                } else {
                    Game.gameState().purchaseTower = null;
                }
            });

        document.getElementById("tower-2").addEventListener(
            "click",
            function() {
                if(Game.gameState().purchaseTower !== "bomb1") {
                    Game.gameState().purchaseTower = "bomb1";
                } else {
                    Game.gameState().purchaseTower = null;
                }
            });

        document.getElementById("tower-3").addEventListener(
            "click",
            function() {
                if(Game.gameState().purchaseTower !== "linearair1") {
                    Game.gameState().purchaseTower = "linearair1";
                } else {
                    Game.gameState().purchaseTower = null;
                }
            });

        document.getElementById("tower-4").addEventListener(
            "click",
            function() {
                if(Game.gameState().purchaseTower !== "seekingAir1") {
                    Game.gameState().purchaseTower = "seekingAir1";
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
