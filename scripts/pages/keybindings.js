Menu.screens['keybindings'] = (function() {

    function registerUpgradeKey(event){
        Keyboard.deRegisterCommand(Game.upgradeSelectedTower);
        Keyboard.registerCommand(event.keyCode, Game.upgradeSelectedTower);
        document.removeEventListener('keydown', registerUpgradeKey);
        document.getElementById('keybind-upgrade').textContent = KeyboardMap[event.keyCode];
        localStorage.upgradeKey = event.keyCode;
    }

    function registerSellKey(event){
        Keyboard.deRegisterCommand(Game.sellSelectedTower);
        Keyboard.registerCommand(event.keyCode, Game.sellSelectedTower);
        document.removeEventListener('keydown', registerSellKey);
        document.getElementById('keybind-sell').textContent = KeyboardMap[event.keyCode];
        localStorage.sellKey = event.keyCode;
    }

    function registerNextKey(event){
        Keyboard.deRegisterCommand(Game.nextWave);
        Keyboard.registerCommand(event.keyCode, Game.nextWave);
        document.removeEventListener('keydown', registerNextKey);
        document.getElementById('keybind-next').textContent = KeyboardMap[event.keyCode];
        localStorage.nextKey = event.keyCode;
    }

    function initialize() {
        let upgradeKey = KeyEvent.DOM_VK_U;
        let sellKey = KeyEvent.DOM_VK_S;
        let nextKey = KeyEvent.DOM_VK_G;

        if(localStorage.upgradeKey !== undefined){
            upgradeKey = localStorage.upgradeKey;
        }
        if(localStorage.sellKey !== undefined){
            sellKey = localStorage.sellKey;
        }
        if(localStorage.nextKey !== undefined){
            nextKey = localStorage.nextKey;
        }
        Keyboard.registerCommand(upgradeKey, Game.upgradeSelectedTower);
        Keyboard.registerCommand(sellKey, Game.sellSelectedTower);
        Keyboard.registerCommand(nextKey, Game.nextWave);
        document.getElementById('keybind-upgrade').textContent = KeyboardMap[upgradeKey];
        document.getElementById('keybind-sell').textContent = KeyboardMap[sellKey];
        document.getElementById('keybind-next').textContent = KeyboardMap[nextKey];


        document.getElementById('back-button-keybindings').addEventListener(
            'click',
            function() { Menu.showScreen('options'); }
        );

        document.getElementById('keybind-upgrade').addEventListener(
            'click',
            function() {
                document.getElementById('keybind-upgrade').textContent = "_";
                document.addEventListener('keydown', registerUpgradeKey);
            }

        );
        document.getElementById('keybind-sell').addEventListener(
            'click',
            function() {
                document.getElementById('keybind-sell').textContent = "_";
                document.addEventListener('keydown', registerSellKey);
            }
        );
        document.getElementById('keybind-next').addEventListener(
            'click',
            function() {
                document.getElementById('keybind-next').textContent = "_";
                document.addEventListener('keydown', registerNextKey);
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
