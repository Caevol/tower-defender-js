Menu.screens['readme'] = (function() {

    function initialize() {
        document.getElementById('readme-back').addEventListener(
            'click',
            function() { Menu.showScreen('main-menu'); }
        );
    }

    function run() {

    }

    return {
        initialize : initialize,
        run : run
    };
}());
