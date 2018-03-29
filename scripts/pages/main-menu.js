Menu.screens['main-menu'] = (function() {

    function initialize() {
        document.getElementById('new-game').addEventListener(
            'click',
            function() { Game.rebuildGame(); Menu.showScreen('tower-defense'); }
        );

        document.getElementById('credits-page').addEventListener(
            'click',
            function() { Menu.showScreen('credits');}
        );
        document.getElementById('high-scores-page').addEventListener(
            'click',
            function() { Menu.showScreen('high-scores'); });

        document.getElementById('options-page').addEventListener(
            'click',
            function() { Menu.showScreen('options'); });

    }

    function run() {
    }

    return {
        initialize : initialize,
        run : run
    };
}());
