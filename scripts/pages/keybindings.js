Menu.screens['keybindings'] = (function() {


    function initialize() {
        document.getElementById('back-button-keybindings').addEventListener(
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
