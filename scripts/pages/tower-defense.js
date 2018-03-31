Menu.screens['tower-defense'] =  (function() {


    function initialize() {
        Keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function () {
            Game.endGame();
            Menu.showScreen('main-menu');
        });

    }


    function run() {
        Game.rebuildGame();
    }

    return {
        initialize : initialize,
        run : run
    };
}());
