
//LOCAL RIGHT NOW, NEEDS TO POST TO SERVER INSTEAD!
Menu.screens['high-scores'] = (function() {

    let socket = io();
    let scores = [];

    socket.on('scoreResult', function(data){
        scores = data.scores;

        let str = "High Scores: <br> <ol>";
        for(let i = 0; i < scores.length; i ++){
            str += "<li>" + scores[i] + "</li>";
        }

        let scoreList = document.getElementById("high-scores-list");

        str += "</ol>";
        scoreList.innerHTML = str;

    });

    function initialize() {
        document.getElementById('back-button-scores').addEventListener(
            'click',
            function() { Menu.showScreen('main-menu'); }
        );
    }


    function run() {
        socket.emit('getScores');
    }

    return {
        initialize : initialize,
        run : run
    };
}());
