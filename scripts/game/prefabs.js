let maskCreep = {

    //SPEC INFO
    elapsedTime : 0,
    asset : MyGame.assets['maskman'],
    spriteNum : 0,
    spriteCount : 9,
    width : MyGame.assets['maskman'].width / 9,
    height: MyGame.assets['maskman'].height,
    offY: 0,
    spriteTime : [100, 100, 100, 100, 100, 100, 100, 100, 100],
    //END SPEC INFO

    type : 'Ground',
    x : 0,
    y : 0,
    speed : .1,
    path : null,
    health : 100,
    value : 10
};

let greenWalkingCreep = {
    //SPEC INFO
    elapsedTime : 0,
    asset : MyGame.assets['greenDemon'],
    spriteNum : 0,
    spriteCount : 4,
    width : MyGame.assets['greenDemon'].width / 4,
    height: MyGame.assets['greenDemon'].height / 4,
    offY: 2 * MyGame.assets['greenDemon'].height / 4,
    spriteTime : [250, 250, 250, 250],
    //END SPEC INFO

    type : "Ground",
    x : 0,
    y : 0,
    speed : .05,
    path : null,
    health : 250,
    value : 25
};

let scifiturret3 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['greyTurret'],
        basePosX : 175,
        basePosY : 75,
        turretPosX : 288,
        turretPosY : 93,
        bheight : 80,
        bwidth: 80,
        theight : 75,
        twidth: 65,
        rotationOffset: Math.PI / 2
    },

    //INTERIOR
    canfire : true,
    cooldown : 500,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 10,
    rotation: 0,
    rotationSpeed : .003,
    size : 3,
    upgradeCost : 100,
    sellval : 50,
    purchaseCost : 75,
    projectile: "fireball", //update
    upgradeTower : null
};

let fireball = {
    spec : {
        asset : MyGame.assets['fireball'],
        width : 1.5,
        height : 1.5,
    },
    x: 0,
    y: 0,
    angle: 0,
    speed: .015,
    damage: 15,
    radius: 1.5,

    update: null,
    detonate: null

};