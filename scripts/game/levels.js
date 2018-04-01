
level1 = [

];

level2 = [
    [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9,14], [9, 15], [9, 16], [9, 17], [9, 18], [9, 19],
    [10, 9], [ 11, 9], [ 12, 9], [ 13, 9], [14, 9], [ 15, 9], [ 16, 9], [ 17, 9], [ 18, 9], [ 19, 9],

    [39, 9], [39, 10], [39, 11], [39, 12], [39, 13], [39,14], [39, 15], [39, 16], [39, 17], [39, 18], [39, 19],
    [38, 9], [ 37, 9], [ 36, 9], [ 35, 9], [34, 9], [ 33, 9], [ 32, 9], [ 31, 9], [ 30, 9], [ 29, 9],


    [10, 39], [ 11, 39], [ 12, 39], [ 13, 39], [14, 39], [ 15, 39], [ 16, 39], [ 17, 39], [ 18, 39], [ 19, 39],
    [9, 39], [9, 38], [9, 37], [9, 36], [9, 35], [9,34], [9, 33], [9, 32], [9, 31], [9, 30], [9, 29],

    [39, 39], [39, 38], [39, 37], [39, 36], [39, 35], [39,34], [39, 33], [39, 32], [39, 31], [39, 30], [39, 29],
    [ 29, 39], [ 30, 39], [ 31, 39], [32, 39], [ 33, 39], [ 34, 39], [ 35, 39], [ 36, 39], [ 37, 39], [38, 39],
];

level3 = [
    [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7],
    [31, 7], [32, 7], [33, 7], [34, 7], [35, 7], [36, 7], [37, 7], [38, 7], [39, 7], [40, 7], [41, 7], [42, 7], [43, 7], [44, 7],

    [15, 34], [16, 34], [17, 34], [18, 34], [19, 34], [20, 34], [21, 34], [22, 34], [23, 34], [24, 34], [25, 34], [26, 34],
    [27, 34], [28, 34], [29, 34], [30, 34], [31, 34], [32, 34], [33, 34], [34, 34], [35, 34], [36, 34]
];

level1Waves = [
    [
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE'],
        [1000, "mask", 'SIDE']
    ],
    [
        [400, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],

        [500, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE']
    ],
    [
        [400, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "greenDemon", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "greenDemon", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "greenDemon", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "greenDemon", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "greenDemon", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "greenDemon", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
        [150, "mask", 'SIDE'],
    ]
];

level2Waves = [

];

level3Waves = [];

function setLevel(gameState){
    switch(gameState.level){
        case 1:
            gameState.levelWaves = level1Waves;
            break;
        case 2:
            gameState.levelWaves = level2Waves;
            break;
        case 3:
            gameState.levelWaves = level3Waves;
            break;
    }
    gameState.wave = 0;
    fillBoard(gameState.tileBoard, gameState.level)
}

function fillBoard(board, level){
    let activeLevel = null;

    switch(level) {
        case 1:
            activeLevel = level1;
            break;
        case 2:
            activeLevel = level2;
            break;
        case 3:
            activeLevel = level3;
            break;
    }

    for(let i = 0; i < activeLevel.length; i ++){
        let pos = activeLevel[i];
        //0 is x, 1 is y
        board[pos[1]][pos[0]].occupied = true;
    }

}