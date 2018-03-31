Game = function (graphics) {

    const BOARD_SIZE = 50;
    const MONSTER_THRESHOLD = .3;
    const TURRET_THRESHOLD = .1;
    let gameState = {};
    const BACKGROUND = [];

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
            case "scifi3":
                t = Object.assign({}, scifiturret3);
                break;
        }
        t.x = x;
        t.y = y;
        return t;
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
        console.log(monster.health);
    }

    function updateMonsters(elapsedTime){
        let keepers = [];
        for(let i = 0; i < gameState.monsters.length; i ++){
            let m = gameState.monsters[i];

            //update sprite info
            m.spec.elapsedTime += elapsedTime;
            if(m.spec.elapsedTime >= m.spec.spriteTime[m.spec.spriteNum]){
                m.spec.elapsedTime -= m.spec.spriteTime[m.spec.spriteNum];
                m.spec.spriteNum += 1;
                m.spec.spriteNum = m.spec.spriteNum % m.spec.spriteCount;
            }

            //move monster
            if(m.type === "Ground" ) {

                let dist = Math.sqrt(Math.pow(m.path.x - m.x, 2) + Math.pow(m.path.y - m.y, 2));
                if (dist < MONSTER_THRESHOLD) {


                    if (m.path.nxt === undefined) {
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
            if(t.interior.canfire === false) {
                t.interior.cooldownRemaining -= elapsedTime;
                if (t.interior.cooldownRemaining <= 0) {
                    t.interior.canfire = true;
                    t.interior.cooldownRemaining = t.interior.cooldown;
                }
            }

            if(t.interior.target !== null && getDistance(t, t.interior.target) > t.range) {
                t.interior.target = null;
            }

            //find new target
            if(t.interior.target === null || t.interior.target.health <= 0){
                //look for new target
                let minDist = t.range + 1;
                for(let n = 0; n < gameState.monsters.length; n ++){
                    let newDist = getDistance(t, gameState.monsters[n]);
                    if(newDist < minDist){
                        minDist = newDist;
                        t.interior.target = gameState.monsters[n];
                    }
                }
            }

            //turn towards and fire on target
            if(t.interior.target !== null){
                let angles = getAngle(t.rotation, t.x, t.y, t.interior.target.x, t.interior.target.y);
                if(angles.angle < TURRET_THRESHOLD){
                    if(t.interior.canfire){
                        gameState.projectiles.push(Projectile(t.x, t.y, t.rotation, t.projectile));
                        t.interior.canfire = false;
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

    function rebuildGame() {
        gameState = {
            selectedTower: null,
            purchaseTower: null,
            waveNumber: 0,
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

        let t = Turret(25, 25, "scifi3");
        occupySpaces(t);
        gameState.turrets.push(t);

        let t1 = Turret(15, 25, "scifi3");
        occupySpaces(t1);
        gameState.turrets.push(t1);

        let t2 = Turret(35, 25, "scifi3");
        occupySpaces(t2);
        gameState.turrets.push(t2);

        gameState.monsters.push(Monster(15, 3, 45, 48, "mask"));
        gameState.monsters.push(Monster(30, 30, 3, 7, "greenDemon"));





        gameLoop(performance.now() - gameState.prevTime);
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
    }

    function drawProjectiles(elapsedTime){
        for(let i = 0; i < gameState.projectiles.length; i++){
            Renderer.drawProjectile(gameState.projectiles[i]);
        }
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
        drawMonsters(elapsedTime);
        drawProjectiles(elapsedTime);
        //drawParticles
    }

    function update(elapsedTime) {
        updateTowers(elapsedTime);
        updateProjectiles(elapsedTime);
        updateMonsters(elapsedTime);
        //update particles
    }

    return {
        gameLoop: gameLoop,
        rebuildGame: rebuildGame,
        endGame: endGame,
        gameState: getGameState
    }

}(GameGraphics);