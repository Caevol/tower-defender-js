let maskCreep = {
    spec : {
        elapsedTime : 0,
        asset : MyGame.assets['maskman'],
        spriteNum : 0,
        spriteCount : 9,
        width : MyGame.assets['maskman'].width / 9,
        height: MyGame.assets['maskman'].height,
        offY: 0,
        spriteTime : [100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    type : "Ground",
    x : 0,
    y : 0,
    speed : .1,
    path : null,
    health : 100
};

let greenWalkingCreep = {
    spec : {
        elapsedTime : 0,
        asset : MyGame.assets['greenDemon'],
        spriteNum : 0,
        spriteCount : 4,
        width : MyGame.assets['greenDemon'].width / 4,
        height: MyGame.assets['greenDemon'].height / 4,
        offY: 2 * MyGame.assets['greenDemon'].height / 4,
        spriteTime : [250, 250, 250, 250]
    },
    type : "Ground",
    x : 0,
    y : 0,
    speed : .05,
    path : null,
    health : 250
};