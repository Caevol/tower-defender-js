Menu.screens['game-options'] = (function() {


    function initialize() {
        document.getElementById('back-button-game-options').addEventListener(
            'click',
            function() { Menu.showScreen('options'); }
        );
    }


    function run() {

    }

    return {
        initialize : initialize,
        run : run
    };
}());
