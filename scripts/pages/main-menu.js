Menu.screens['main-menu'] = (function() {

    function initialize() {
        document.getElementById('new-game').addEventListener(
            'click',
            function() { Menu.showScreen('tower-defense'); }
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

        document.getElementById('readme-page').addEventListener(
            'click',
            function() {
                Menu.showScreen('readme');
            }
        );
    }

    function run() {
    }

    return {
        initialize : initialize,
        run : run
    };
}());
