Game = function (graphics) {

    let sellButton = document.getElementById("Sell");
    let upgradeButton = document.getElementById("Upgrade");

    const BOARD_SIZE = 50;
    const MONSTER_THRESHOLD = .3;
    const TURRET_THRESHOLD = .1;
    let gameState = {};
    const BACKGROUND = [];
    const FORBIDDEN = [[0, 23], [0, 24], [0, 25], [0, 26],
            [23, 0], [24, 0], [25, 0], [26, 0],
        [49, 23], [49, 24], [49, 25], [49, 26],
        [23, 49], [24, 49], [25, 49], [26, 49]
        ];


        function Monster(startX, startY, endX, endY, creepType){
        let m = {};
        switch(creepType){
            case "mask":
                m = Object.assign({}, maskCreep);
                break;
            case "greenDemon":
                m = Object.assign({}, greenWalkingCreep);
                break;
        }

        m.x = startX;
        m.y = startY;
        m.end = {x: endX, y: endY};
        m.path = Pathfinder.getPath(m.x, m.y, m.end.x, m.end.y, gameState.tileBoard);
        return m;
    }

    function Turret(x, y, towerType){
        let t = {};
        switch(towerType) {
            case "scifi1":
                t = Object.assign({}, scifiturret1);
                break;
            case "scifi2":
                t = Object.assign({}, scifiturret2);
                break;
            case "scifi3":
                t = Object.assign({}, scifiturret3);
        }
        t.x = x;
        t.y = y;
        return t;
    }

    function insertTurret(x, y){

        let t = Turret(x, y, gameState.purchaseTower);


        if(canPlaceTurret(t, x, y) === true){
         //occupy space
            occupySpaces(t);

            updateMonsterPaths();

            gameState.money -= t.purchaseCost;
            Game.gameState().turrets.push(t);
        }


    }


    function canPlaceTurret(t, x, y){
        if(gameState.money - t.purchaseCost < 0){
            return false;
        }

        for(let i = 0; i < FORBIDDEN.length; i ++){
            if(x === FORBIDDEN[i][0] && y === FORBIDDEN[i][1]){
                return false;
            }
        }

        for(let y0 = y; y0 < y + t.size; y0 ++){
            for(let x0 = x; x0 < x + t.size; x0 ++){
                if(gameState.tileBoard[y0][x0].occupied === true){
                    return false;
                }
            }
        }

        occupySpaces(t);

        let p1 = Pathfinder.getPath(0, BOARD_SIZE / 2, BOARD_SIZE - 1, BOARD_SIZE / 2, gameState.tileBoard); //LEFT RIGHT
        let p2 = Pathfinder.getPath(BOARD_SIZE / 2, 0, BOARD_SIZE / 2, BOARD_SIZE - 1, gameState.tileBoard); //UP DOWN PATH

        if(p1 === null || p2 === null){
            deOccupySpaces(t);
            return false;
        }

        for(let i = 0; i < gameState.monsters.length; i ++){
            let m = gameState.monsters[i];
            let pos = m.path;
            while(pos.nxt !== null){
                if(gameState.tileBoard[pos.y][pos.x].occupied === true){
                    let p = Pathfinder.getPath(m.path.x, m.path.y, m.end.x, m.end.y, gameState.tileBoard);
                    if(p === null){
                        deOccupySpaces(t);
                        return false;
                    }
                }
                pos = pos.nxt;
            }


        }
        deOccupySpaces(t);
        return true;
    }

    function updateMonsterPaths(){
        for(let i = 0; i < gameState.monsters.length; i ++){
            let m = gameState.monsters[i];

            let pos = m.path;
            while(pos.nxt !== null){
                if(gameState.tileBoard[pos.y][pos.x].occupied === true){
                    m.path = Pathfinder.getPath(m.path.x, m.path.y, m.end.x, m.end.y, gameState.tileBoard);
                    break;
                }
                pos = pos.nxt;
            }


            if(m.path === null) {
                console.log("SOMETHINGS GONE WRONG, MONSTER PATH IS NULL")
            }

        }
    }

    function Projectile(x, y, angle, projectileType){
        let p = {};
        switch(projectileType) {
            case "fireball":
                p = Object.assign({}, fireball);
                p.update = linearProjectileUpdate;
                p.detonate = detonateSingleTarget;
                break;
        }
        p.x = x;
        p.y = y;
        p.angle = angle;
        return p;
    }

    function updateProjectiles(elapsedTime){
        let keepers = [];
        for(let i = 0; i < gameState.projectiles.length; i ++){
            let p = gameState.projectiles[i];
            if(p.update(p, elapsedTime) === true){
                keepers.push(p);
            }
        }
        gameState.projectiles = keepers;
    }

    function linearProjectileUpdate(p, elapsedTime){
        p.x += Math.cos(p.angle) * elapsedTime * p.speed;
        p.y += Math.sin(p.angle) * elapsedTime * p.speed;

        for(let n = 0; n < gameState.monsters.length; n ++){
            let m = gameState.monsters[n];
            let dist = Math.sqrt(Math.pow(m.x - p.x,2) + Math.pow(m.y - p.y,2));
            if(dist <= p.radius) {
                p.detonate(p, m);
                return false;
            }
        }
        return true;
    }

    function detonateSingleTarget(p, m){
        hitMonster(p.damage, m);
        // TODO: generate particles
    }

    function hitMonster(damage, monster){
        monster.health -= damage;
    }

    function updateMonsters(elapsedTime){
        let keepers = [];
        for(let i = 0; i < gameState.monsters.length; i ++){
            let m = gameState.monsters[i];

            //update sprite info
            m.elapsedTime += elapsedTime;
            if(m.elapsedTime >= m.spriteTime[m.spriteNum]){
                m.elapsedTime -= m.spriteTime[m.spriteNum];
                m.spriteNum += 1;
                m.spriteNum = m.spriteNum % m.spriteCount;
            }

            //move monster
            if(m.type === "Ground" ) {
                let dist = Math.sqrt(Math.pow(m.path.x - m.x, 2) + Math.pow(m.path.y - m.y, 2));
                if (dist < MONSTER_THRESHOLD) {


                    if (m.path.nxt === null) {
                        //Monster made it to objective, hit board
                        gameState.lives -= 1;
                        continue;
                        //delete monster
                    }
                    else {
                        m.path = m.path.nxt;
                    }
                }

                let vector = {
                    x : m.path.x - m.x,
                    y : m.path.y - m.y
                };

                dist = Math.sqrt(Math.pow(m.path.x - m.x, 2) + Math.pow(m.path.y - m.y, 2));
                vector.x /= dist;
                vector.y /= dist;

                m.x += vector.x * m.speed;
                m.y += vector.y * m.speed;

                if(m.health > 0) {
                    keepers.push(m);
                } else {
                    gameState.money += m.value
                }
            }
        }
        gameState.monsters = keepers;
    }

    function updateTowers(elapsedTime) {
        //all towers turn towards target and fire, the projectiles then handle their own movement and detonation

        for (let i = 0; i < gameState.turrets.length; i ++){
            let t = gameState.turrets[i];

            //update cooldown
            if(t.canfire === false) {
                t.cooldownRemaining -= elapsedTime;
                if (t.cooldownRemaining <= 0) {
                    t.canfire = true;
                    t.cooldownRemaining = t.cooldown;
                }
            }

            if(t.target !== null && getDistance(t, t.target) > t.range) {
                t.target = null;
            }

            //find new target
            if(t.target === null || t.target.health <= 0){
                //look for new target
                t.target = null;
                let minDist = t.range + 1;
                for(let n = 0; n < gameState.monsters.length; n ++){
                    let newDist = getDistance(t, gameState.monsters[n]);
                    if(newDist < minDist){
                        minDist = newDist;
                        t.target = gameState.monsters[n];
                    }
                }
            }

            //turn towards and fire on target
            if(t.target !== null){
                let angles = getAngle(t.rotation, t.x, t.y, t.target.x, t.target.y);
                if(angles.angle < TURRET_THRESHOLD){
                    if(t.canfire){
                        gameState.projectiles.push(Projectile(t.x, t.y, t.rotation, t.projectile));
                        t.canfire = false;
                    }
                }
                else {
                    t.rotation += Math.sign(angles.crossProduct) * t.rotationSpeed * elapsedTime;
                }
            }
        }
    }

    function Tile(occ) {
        return {
            occupied: occ   //bool
        }
    }

    function getGameState() {
        return gameState;
    }

    function pointIsOccupied(x, y) {
        const LEGAL_POINTS = [BOARD_SIZE / 2 - 2, BOARD_SIZE / 2 - 1, BOARD_SIZE / 2, BOARD_SIZE / 2 + 1];
        if (x == 0 || y == 0 || x == BOARD_SIZE - 1 || y == BOARD_SIZE - 1) {
            if (LEGAL_POINTS.indexOf(x) == -1 && LEGAL_POINTS.indexOf(y) == -1) {
                return true
            }
        }
        return false
    }

    function occupySpaces(tower){
        for(let y = tower.y; y < tower.y + tower.size; y ++){
            for(let x = tower.x; x < tower.x + tower.size; x ++){
                gameState.tileBoard[y][x].occupied = true;
            }
        }
    }

    function deOccupySpaces(tower){
        for(let y = tower.y; y < tower.y + tower.size; y ++){
            for(let x = tower.x; x < tower.x + tower.size; x ++){
                gameState.tileBoard[y][x].occupied = false;
            }
        }
    }

    function TileBoard(sizeX, sizeY) {
        let tileBoard = [];

        for (let y = 0; y < sizeY; y++) {
            let row = [];
            for (let x = 0; x < sizeX; x++) {
                row.push(Tile(pointIsOccupied(x, y)));
            }
            tileBoard.push(row);
        }

        return tileBoard;
    }

    function rebuildGame(level = 1) {
        gameState = {
            curMouseX : -1,
            curMouseY : -1,
            mouseMovedThisFrame : false,

            level : level,
            wave : 0,
            waveMonster : 0,
            waveElapsedTime: 0,
            selectedTower: null,
            purchaseTower: null,
            levelWaves: null,
            waves: [],
            monsters: [],
            turrets: [],
            projectiles: [],
            money: 150,
            lives: 100,
            waveComplete: true,
            tileBoard: TileBoard(BOARD_SIZE, BOARD_SIZE),
            continueGame: true,
            prevTime: performance.now(),
        };

        setLevel(gameState);

    }

    function instantiateMonster(monsterInfo){
        let x, y, endX, endY;


        switch(monsterInfo[2]){
            case "SIDE":
                x = 0;
                y = Math.floor(Math.random() * 4) + 23;
                endX = BOARD_SIZE - 1;
                endY = Math.floor(Math.random() * 4) + 23;
                break;
            case "TOP":
                x = Math.floor(Math.random() * 4) + 23;
                y = 0;
                endX = Math.floor(Math.random() * 4) + 23;
                endY = BOARD_SIZE - 1;
                break;
        }


        gameState.monsters.push(Monster(x, y, endX, endY, monsterInfo[1]));
    }

    function updateLevel(elapsedTime){
        if(gameState.waveComplete === true) {
            return;
        }

        // Wave Complete, move to next wave and wait for player
        if(gameState.waveMonster === gameState.levelWaves[gameState.wave].length && gameState.monsters.length === 0){
            gameState.waveComplete = true;
            document.getElementById("next-wave").disabled = false;
            gameState.wave += 1;
            gameState.projectiles.length = 0;
            gameState.waveMonster = 0;
            gameState.waveElapsedTime = 0;

            if(gameState.wave >= gameState.levelWaves.length){
                gameState.level ++;
                rebuildGame(gameState.level);
            }
            return;
        }

        if(gameState.waveMonster >= gameState.levelWaves[gameState.wave].length) {
            return;
        }

        //generate next wave monster on time
        gameState.waveElapsedTime += elapsedTime;
        let activeWave = gameState.levelWaves[gameState.wave];
        if(gameState.waveElapsedTime > activeWave[gameState.waveMonster][0]) {
            //instantiate monster
            instantiateMonster(activeWave[gameState.waveMonster]);
            gameState.waveElapsedTime -= activeWave[gameState.waveMonster][0];
            gameState.waveMonster ++;
        }
    }

    function drawMonsters(elapsedTime){
        for(let i = 0; i < gameState.monsters.length; i++){
            Renderer.drawMonster(gameState.monsters[i]);
        }
    }

    function drawTurrets(elapsedTime){
        for(let i = 0; i < gameState.turrets.length; i++){
            Renderer.drawTurretBase(gameState.turrets[i]);
        }
        for(let i = 0; i < gameState.turrets.length; i++){
            Renderer.drawTurretTop(gameState.turrets[i]);
        }

        for(let i = 0; i < gameState.turrets.length; i++){
            Renderer.drawTurretUpgrade(gameState.turrets[i]);
        }
    }

    function drawProjectiles(elapsedTime){
        for(let i = 0; i < gameState.projectiles.length; i++){
            Renderer.drawProjectile(gameState.projectiles[i]);
        }
    }

    function drawUITurret(elapsedTime){
        if(gameState.purchaseTower === null){
            return;
        }
        if(gameState.curMouseX < 0 || gameState.curMouseX >= BOARD_SIZE || gameState.curMouseY < 0 || gameState.curMouseY >= BOARD_SIZE){
            return;
        }

        let t = Turret(gameState.curMouseX, gameState.curMouseY, gameState.purchaseTower);
        Renderer.drawTmpTurret(t);

        let canPlace = canPlaceTurret(t, gameState.curMouseX, gameState.curMouseY);

        Renderer.drawTurretRadius(t, canPlace);

    }

    function upgradeSelectedTower(){
        if(gameState.selectedTower === null || gameState.selectedTower.upgradeTower === null || gameState.money - gameState.selectedTower.purchaseCost < 0){
            return;
        }

        gameState.money -= gameState.selectedTower.upgradeCost;

        let t = Turret(gameState.selectedTower.x, gameState.selectedTower.y, gameState.selectedTower.upgradeTower);
        let i = gameState.turrets.indexOf(gameState.selectedTower);

        gameState.turrets.splice(i, 1);
        gameState.turrets.push(t);

        setSelectedTower(t);
    }

    function sellSelectedTower(){
        if(gameState.selectedTower === null){
            return;
        }

        gameState.money += gameState.selectedTower.sellval;

        let i = gameState.turrets.indexOf(gameState.selectedTower);
        gameState.turrets.splice(i, 1);
        deOccupySpaces(gameState.selectedTower);

        setSelectedTower(null);
    }

    function selectTower(x, y){
        if(x >= 0 && y >= 0 && y < Game.BOARD_SIZE && x < Game.BOARD_SIZE) {

            for(let i = 0; i < gameState.turrets.length; i++){
                let t = gameState.turrets[i];
                if(x >= t.x && x < t.x + t.size && y >= t.y && y < t.y + t.size){
                    setSelectedTower(t);
                    return;
                }
            }
            setSelectedTower(null);
        }

    }

    function setSelectedTower(t){
        if(t === null){
            gameState.selectedTower = null;
            upgradeButton.textContent = "Upgrade";
            sellButton.textContent = "Sell";
            upgradeButton.disabled = true;
            sellButton.disabled = true;
            return;
        }

        gameState.selectedTower = t;
        if(t.upgradeCost === null){
            upgradeButton.textContent = "FULLY UPGRADED";
            upgradeButton.disabled = true;
        }
        else {
            upgradeButton.textContent = "Upgrade: " + t.upgradeCost;
            upgradeButton.disabled = false;
        }
        sellButton.textContent = "Sell: " + t.sellval;

        sellButton.disabled = false;
    }

    function endGame() {
        gameState.continueGame = false;
    }

    function processInput(elapsedTime) {
        Keyboard.update(elapsedTime);
        Mouse.update(elapsedTime);
    }

    function gameLoop() {

        elapsedTime = performance.now() - gameState.prevTime;
        gameState.prevTime += elapsedTime;

        if (gameState.continueGame === false) {
            return;
        }

        if (elapsedTime > 100) { //1 second lag, skip and pretend it never happened
            requestAnimationFrame(gameLoop);
            return;
        }


        processInput(elapsedTime);
        update(elapsedTime);
        render(elapsedTime);

        requestAnimationFrame(gameLoop);

    }

    function render(elapsedTime) {
        Renderer.clear();
        Renderer.drawBackground(gameState.tileBoard);
        drawTurrets(elapsedTime);
        drawUITurret(elapsedTime);
        drawMonsters(elapsedTime);
        drawProjectiles(elapsedTime);
        //drawParticles

        Renderer.drawLives(gameState.lives);
        Renderer.drawMoney(gameState.money);
    }

    function update(elapsedTime) {
        updateLevel(elapsedTime);
        updateTowers(elapsedTime);
        updateProjectiles(elapsedTime);
        updateMonsters(elapsedTime);
        //update particles
    }

    return {
        BOARD_SIZE: BOARD_SIZE,
        upgradeSelectedTower: upgradeSelectedTower,
        sellSelectedTower: sellSelectedTower,
        selectTower: selectTower,
        gameLoop: gameLoop,
        rebuildGame: rebuildGame,
        insertTurret: insertTurret,
        endGame: endGame,
        gameState: getGameState
    }

}(GameGraphics);