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
    speed : .07,
    path : null,
    maxHealth : 100,
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
    speed : .03,
    path : null,
    maxHealth: 250,
    health : 250,
    value : 25
};

let flyingCreep = {
    //SPEC INFO
    elapsedTime : 0,
    asset : MyGame.assets['plane'],
    spriteNum : 0,
    spriteCount : 2,
    width : MyGame.assets['plane'].width / 2,
    height: MyGame.assets['plane'].height,
    offY: 0,
    spriteTime : [100, 100],
    rotation: 0,
    rotationOffset: Math.PI / 2,
    //END SPEC INFO

    type : "Air",
    x : 0,
    y : 0,
    speed : .05,
    path : null,
    maxHealth: 350,
    health : 350,
    value : 50
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

    type: "Ground",

    //INTERIOR
    canfire : true,
    cooldown : 100,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 15,
    rotation: 0,
    rotationSpeed : .004,
    size : 3,
    upgradeCost : null,
    sellval : 150,
    purchaseCost : 0,
    projectile: "fireball", //update
    upgradeLevel : 2,
    upgradeTower : null
};

let scifiturret2 = {
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

    type: "Ground",

    //INTERIOR
    canfire : true,
    cooldown : 200,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 13,
    rotation: 0,
    rotationSpeed : .003,
    size : 3,
    upgradeCost : 100,
    sellval : 70,
    purchaseCost : 0,
    projectile: "fireball", //update
    upgradeLevel : 1,
    upgradeTower : "scifi3"
};

let scifiturret1 = {
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

    type: "Ground",

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
    rotationSpeed : .0025,
    size : 3,
    upgradeCost : 50,
    sellval : 25,
    purchaseCost : 30,
    projectile: "fireball", //update
    upgradeLevel : 0,
    upgradeTower : "scifi2"
};

let bombTower3 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['greyTurret'],
        basePosX : 635,
        basePosY : 80,
        turretPosX : 725,
        turretPosY : 80,
        bheight : 82,
        bwidth: 65,
        theight : 82,
        twidth: 78,
        rotationOffset: Math.PI / 2
    },

    type: "Ground",

    //INTERIOR
    canfire : true,
    cooldown : 1300,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 11,
    rotation: 0,
    rotationSpeed : .003,
    size : 4,
    upgradeCost : null,
    sellval : 250,
    purchaseCost : 0,
    projectile: "bombball3",
    upgradeLevel : 2,
    upgradeTower : null
};

let bombTower2 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['greyTurret'],
        basePosX : 635,
        basePosY : 80,
        turretPosX : 725,
        turretPosY : 80,
        bheight : 82,
        bwidth: 65,
        theight : 82,
        twidth: 78,
        rotationOffset: Math.PI / 2
    },


    type: "Ground",

    //INTERIOR
    canfire : true,
    cooldown : 1300,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 11,
    rotation: 0,
    rotationSpeed : .003,
    size : 4,
    upgradeCost : 150,
    sellval : 100,
    purchaseCost : 0,
    projectile: "bombball2",
    upgradeLevel : 1,
    upgradeTower : "bomb3"
};

let bombTower1 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['greyTurret'],
        basePosX : 635,
        basePosY : 80,
        turretPosX : 725,
        turretPosY : 80,
        bheight : 82,
        bwidth: 65,
        theight : 82,
        twidth: 78,
        rotationOffset: Math.PI / 2
    },

    type: "Ground",

    //INTERIOR
    canfire : true,
    cooldown : 1500,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 10,
    rotation: 0,
    rotationSpeed : .003,
    size : 4,
    upgradeCost : 80,
    sellval : 40,
    purchaseCost : 50,
    projectile: "bombball",
    upgradeLevel : 0,
    upgradeTower : "bomb2"
};

let linearAirTurret3 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['superLaserTurret'],
        basePosX : 130,
        basePosY : 130,
        turretPosX : 160,
        turretPosY : 30,
        bheight : 130,
        bwidth: 130,
        theight : 70,
        twidth: 100,
        rotationOffset: 0
    },

    type: "Air",

    //INTERIOR
    canfire : true,
    cooldown : 100,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 15,
    rotation: 0,
    rotationSpeed : .004,
    size : 3,
    upgradeCost : null,
    sellval : 150,
    purchaseCost : 0,
    projectile: "fireballAir",
    upgradeLevel : 2,
    upgradeTower : null
};

let linearAirTurret2 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['superLaserTurret'],
        basePosX : 130,
        basePosY : 130,
        turretPosX : 30,
        turretPosY : 160,
        bheight : 130,
        bwidth: 130,
        theight : 70,
        twidth: 100,
        rotationOffset: 0
    },

    type: "Air",

    //INTERIOR
    canfire : true,
    cooldown : 200,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 13,
    rotation: 0,
    rotationSpeed : .003,
    size : 3,
    upgradeCost : 100,
    sellval : 70,
    purchaseCost : 0,
    projectile: "fireballAir",
    upgradeLevel : 1,
    upgradeTower : "linearair3"
};

let linearAirTurret1 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['superLaserTurret'],
        basePosX : 130,
        basePosY : 130,
        turretPosX : 30,
        turretPosY : 30,
        bheight : 130,
        bwidth: 130,
        theight : 70,
        twidth: 100,
        rotationOffset: 0
    },

    type: "Air",

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
    rotationSpeed : .0025,
    size : 3,
    upgradeCost : 50,
    sellval : 25,
    purchaseCost : 30,
    projectile: "fireballAir",
    upgradeLevel : 0,
    upgradeTower : "linearair2"
};

let seekingAirTurret3 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['seekingTurret'],
        basePosX : 700,
        basePosY : 125,
        turretPosX : 1250,
        turretPosY : 60,
        bheight : 650,
        bwidth: 550,
        theight : 650,
        twidth: 300,
        rotationOffset: Math.PI / 2
    },

    type: "Air",

    //INTERIOR
    canfire : true,
    cooldown : 800,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 20,
    rotation: 0,
    rotationSpeed : .0025,
    size : 3,
    upgradeCost : null,
    sellval : 25,
    purchaseCost : 30,
    projectile: "seekingAirMine",
    upgradeLevel : 2,
    upgradeTower : null
};

let seekingAirTurret2 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['seekingTurret'],
        basePosX : 700,
        basePosY : 125,
        turretPosX : 1250,
        turretPosY : 60,
        bheight : 650,
        bwidth: 550,
        theight : 650,
        twidth: 300,
        rotationOffset: Math.PI / 2
    },

    type: "Air",

    //INTERIOR
    canfire : true,
    cooldown : 1000,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 15,
    rotation: 0,
    rotationSpeed : .0025,
    size : 3,
    upgradeCost : 50,
    sellval : 25,
    purchaseCost : 30,
    projectile: "seekingAirMine",
    upgradeLevel : 1,
    upgradeTower : "seekingAir3"
};

let seekingAirTurret1 = {
    //SAFE TO BAD COPY
    spec : {
        asset : MyGame.assets['seekingTurret'],
        basePosX : 700,
        basePosY : 125,
        turretPosX : 1250,
        turretPosY : 60,
        bheight : 650,
        bwidth: 550,
        theight : 650,
        twidth: 300,
        rotationOffset: Math.PI / 2
    },

    type: "Air",

    //INTERIOR
    canfire : true,
    cooldown : 1200,
    cooldownRemaining : 0,
    target : null,
    //END INTERIOR

    x : 0,
    y : 0,
    range: 10,
    rotation: 0,
    rotationSpeed : .0025,
    size : 3,
    upgradeCost : 50,
    sellval : 25,
    purchaseCost : 30,
    projectile: "seekingAirMine",
    upgradeLevel : 0,
    upgradeTower : "seekingAir2"
};

let seekingMine = {
    spec : {
        asset : MyGame.assets['seekingMine'],
        width : 2,
        height : 2,
        rotationOffset: 0
    },

    type: "Air",

    detonation: true,
    dropsTrail : true,
    dropRate: 50,
    dropTime: 0,

    x: 0,
    y: 0,
    velX : 0,
    velY : 0,
    rotation: 0,
    speed: .0002,
    damage: 45,
    radius: 3,

    update: null,
    detonate: null
};

let fireballAir = {
    spec : {
        asset : MyGame.assets['fireballair'],
        width : 1,
        height : 1,
        rotationOffset: 0
    },

    type: "Air",

    x: 0,
    y: 0,
    rotation: 0,
    speed: .025,
    damage: 15,
    radius: 1,

    update: null,
    detonate: null

};

let fireball = {
    spec : {
        asset : MyGame.assets['fireball'],
        width : 1,
        height : 1,
        rotationOffset: 0
    },

    type: "Ground",

    x: 0,
    y: 0,
    rotation: 0,
    speed: .025,
    damage: 15,
    radius: 1,

    update: null,
    detonate: null

};

let bombball = {
    spec : {
        asset : MyGame.assets['littleBomb'],
        width : 1.5,
        height : 1.5,
        rotationOffset: 0
    },

    type: "Ground",

    dropsTrail : true,
    dropRate: 150,
    dropTime: 0,

    x: 0,
    y: 0,
    rotation: 0,
    speed: .015,
    damage: 15,
    collateralDamage: 8,
    impactArea : 4,
    radius: 1.5,

    update: null,
    detonate: null

};

let bombballRed = {
    spec : {
        asset : MyGame.assets['littleRedBomb'],
        width : 2.5,
        height : 2.5,
        rotationOffset: 0
    },

    type: "Ground",

    dropsTrail : true,
    dropRate: 150,
    dropTime: 0,

    x: 0,
    y: 0,
    rotation: 0,
    speed: .035,
    damage: 35,
    collateralDamage: 13,
    impactArea : 6,
    radius: 2.5,

    update: null,
    detonate: null

};

let bombballBlue = {
    spec : {
        asset : MyGame.assets['littleBlueBomb'],
        width : 2,
        height : 2,
        rotationOffset: 0
    },

    type: "Ground",

    dropsTrail : true,
    dropRate: 150,
    dropTime: 0,

    x: 0,
    y: 0,
    rotation: 0,
    speed: .025,
    damage: 25,
    collateralDamage: 10,
    impactArea : 5,
    radius: 2,

    update: null,
    detonate: null

};