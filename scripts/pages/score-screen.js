Menu.screens['score-screen'] = (function() {

    let socket = io();

    function initialize() {}


    function run() {

        let data = { score : Game.gameState().score };
        socket.emit('score', data);

        Menu.showScreen('main-menu');
    }

    return {
        initialize : initialize,
        run : run
    };
}());
