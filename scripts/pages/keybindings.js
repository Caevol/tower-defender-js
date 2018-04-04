Menu.screens['keybindings'] = (function() {

    function registerUpgradeKey(event){
        Keyboard.deRegisterCommand(Game.upgradeSelectedTower);
        Keyboard.registerCommand(event.keyCode, Game.upgradeSelectedTower);
        document.removeEventListener('keydown', registerUpgradeKey);
        document.getElementById('keybind-upgrade').textContent = KeyboardMap[event.keyCode];
    }

    function registerSellKey(event){
        Keyboard.deRegisterCommand(Game.sellSelectedTower);
        Keyboard.registerCommand(event.keyCode, Game.sellSelectedTower);
        document.removeEventListener('keydown', registerSellKey);
        document.getElementById('keybind-sell').textContent = KeyboardMap[event.keyCode];
    }

    function registerNextKey(event){
        Keyboard.deRegisterCommand(Game.nextWave);
        Keyboard.registerCommand(event.keyCode, Game.nextWave);
        document.removeEventListener('keydown', registerNextKey);
        document.getElementById('keybind-next').textContent = KeyboardMap[event.keyCode];
    }

    function initialize() {
        Keyboard.registerCommand(KeyEvent.DOM_VK_U, Game.upgradeSelectedTower);
        Keyboard.registerCommand(KeyEvent.DOM_VK_S, Game.sellSelectedTower);
        Keyboard.registerCommand(KeyEvent.DOM_VK_G, Game.nextWave);

        document.getElementById('back-button-keybindings').addEventListener(
            'click',
            function() { Menu.showScreen('options'); }
        );

        document.getElementById('keybind-upgrade').addEventListener(
            'click',
            function() {
                document.addEventListener('keydown', registerUpgradeKey);
            }

        );
        document.getElementById('keybind-sell').addEventListener(
            'click',
            function() {
                document.addEventListener('keydown', registerSellKey);
            }
        );
        document.getElementById('keybind-next').addEventListener(
            'click',
            function() {
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
