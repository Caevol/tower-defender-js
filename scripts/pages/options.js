Menu.screens['options'] = (function() {


    function initialize() {
        document.getElementById('back-button-options').addEventListener(
            'click',
            function() { Menu.showScreen('main-menu'); }
        );

        document.getElementById('keybindings-page').addEventListener(
            'click',
            function() { Menu.showScreen('keybindings'); }
        );

        document.getElementById('game-options-page').addEventListener(
            'click',
            function() { Menu.showScreen('game-options'); }
        );

    }


    function run() {

    }

    return {
        initialize : initialize,
        run : run
    };
}());
