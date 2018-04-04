Menu.screens['game-options'] = (function() {

    function updateGridButton(){
        document.getElementById("show-grid").textContent = Game.settings.showGrid.toString();
    }

    function updateCoverageButton(){
        document.getElementById("show-coverage").textContent = Game.settings.showCoverage.toString();
    }

    function initialize() {

        updateCoverageButton();
        updateGridButton();

        document.getElementById("show-grid").addEventListener(
            'click',
            function() { Game.toggleGrid(); updateGridButton();}
        );
        document.getElementById("show-coverage").addEventListener(
            'click',
            function() { Game.toggleCoverage(); updateCoverageButton();}
        );


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
