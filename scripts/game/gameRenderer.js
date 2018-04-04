Renderer = function (graphics) {

    const xScale = graphics.canvas.width / Game.BOARD_SIZE;
    const yScale = graphics.canvas.height / Game.BOARD_SIZE;

    const worldxScale = parseInt(document.getElementById("tower-game").style.width) / 50;
    const worldyScale = parseInt(document.getElementById("tower-game").style.height) / 50;




    function clear() {
        graphics.context.save();
        graphics.context.setTransform(1, 0, 0, 1, 0, 0);
        graphics.context.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.context.restore();
    }

    function drawTmpTurret(t) {
        graphics.context.globalAlpha = .5;
        drawTurretBase(t);
        drawTurretTop(t);
        graphics.context.globalAlpha = 1;
    }

    function drawTurretRadius(t, canPlace) {
        if (canPlace === true) {
            graphics.context.fillStyle = 'rgba(0, 0, 255, .3)';
        }
        else {
            graphics.context.fillStyle = 'rgba(255, 0, 0, .3)';
        }
        graphics.context.beginPath();
        graphics.context.arc((t.x + t.size / 2) * xScale, (t.y + t.size / 2) * yScale, (t.range) * xScale, 0, Math.PI * 2);
        graphics.context.fill();
        graphics.context.fillStyle = 'rgba(255, 255, 255, 1)';
    }

    function drawLives(lives) {
        graphics.context.font = "40px Arial";
        graphics.context.fillStyle = 'rgba(255, 255, 255, 1)';
        graphics.context.fillText("Lives: " + lives, 40, graphics.canvas.height - 50);
    }

    function drawScore(score) {
        graphics.context.font = "40px Arial";
        graphics.context.fillStyle = 'rgba(255, 255, 255, 1)';
        graphics.context.fillText("Score: " + score, 40, graphics.canvas.height - 150);
    }

    function drawMoney(money) {
        graphics.context.font = "40px Arial";
        graphics.context.fillStyle = 'rgba(255, 255, 255, 1)';
        graphics.context.fillText("Money: " + money, 40, graphics.canvas.height - 100);
    }

    function drawTextParticle(p){
        graphics.context.fillStyle = p.color;
        graphics.context.font = "20px Arial";
        graphics.context.fillText(p.text, p.x * xScale, p.y * yScale);
    }


    function drawMonster(monster) {



        if(monster.rotation !== undefined){
            graphics.context.save();
            graphics.context.translate((monster.x * xScale + monster.width / 2), (monster.y * yScale + monster.height / 2));
            graphics.context.rotate(monster.rotation + monster.rotationOffset);
            graphics.context.translate(-(monster.x * xScale + monster.width / 2), -(monster.y * yScale + monster.height / 2));
        }

        graphics.context.drawImage(
            monster.asset,
            monster.width * monster.spriteNum, monster.offY,
            monster.width, monster.height,
            monster.x * xScale - 3 * monster.width / 4, monster.y * yScale -  3 *monster.height / 4,
            2 * monster.width, 2 * monster.height
        );


        if(monster.rotation !== undefined) {
            graphics.context.restore();
        }
    }

    function drawHealthBar(monster){
        graphics.context.strokeStyle = 'rgba(0, 0, 0, 1)';
        let redColor = Math.round((1 - (monster.health / monster.maxHealth)) * 255);
        let greenColor = Math.round((monster.health / monster.maxHealth) * 255);
        graphics.context.fillStyle = 'rgba(' + redColor + ', ' + greenColor + ', 0,1)';

        graphics.context.fillRect(monster.x * xScale, monster.y * yScale - monster.height / 2, (monster.health / monster.maxHealth) * 60, 10);
        graphics.context.strokeRect(monster.x * xScale, monster.y * yScale - monster.height / 2, 60, 10);

    }


    function drawCoverage(tower){
        graphics.context.fillStyle = 'rgba(0, 0, 255, .1)';
        graphics.context.beginPath();
        graphics.context.arc((tower.x + tower.size / 2) * xScale, (tower.y + tower.size / 2) * yScale, tower.range * xScale, 0, Math.PI * 2);
        graphics.context.fill();
    }

    function drawGrid(board){
        graphics.context.strokeStyle = 'rgba(0, 0, 0, .3)';
        graphics.context.fillStyle = 'rgba(0, 0, 0, .3)';
        graphics.context.beginPath();
        for(let i = 0; i <= board.length; i++){
            graphics.context.moveTo(0, i * yScale);
            graphics.context.lineTo(graphics.canvas.width, i * yScale);
            graphics.context.moveTo(i * xScale, 0);
            graphics.context.lineTo(i * xScale, graphics.canvas.height);
        }
        graphics.context.stroke();
    }

    function drawProjectile(proj) {

        graphics.context.save();
        graphics.context.translate((proj.x + proj.spec.width / 2) * xScale, (proj.y + proj.spec.height / 2) * yScale);
        graphics.context.rotate(proj.rotation + proj.spec.rotationOffset);
        graphics.context.translate(-1 * (proj.x + proj.spec.width / 2) * xScale, -1 * (proj.y + proj.spec.height / 2) * yScale);

        graphics.context.drawImage(
            proj.spec.asset,
            proj.x * xScale, proj.y * yScale,
            proj.spec.width * xScale, proj.spec.height * yScale
        );

        graphics.context.restore();
    }

    function drawTurretTop(turret) {
        let spec = turret.spec;

        graphics.context.save();
        graphics.context.translate(turret.x * xScale + xScale * turret.size / 2, turret.y * yScale + yScale * turret.size / 2);
        graphics.context.rotate(turret.rotation + spec.rotationOffset);
        graphics.context.translate(-(turret.x * xScale + xScale * turret.size / 2), -(turret.y * yScale + yScale * turret.size / 2));

        graphics.context.drawImage(
            spec.asset,
            spec.turretPosX, spec.turretPosY,
            spec.twidth, spec.theight,
            turret.x * xScale, turret.y * yScale,
            xScale * turret.size, yScale * turret.size
        );
        graphics.context.restore();
    }

    function drawTurretBase(turret) {
        let spec = turret.spec;

        graphics.context.drawImage(
            spec.asset,
            spec.basePosX, spec.basePosY,
            spec.bwidth, spec.bheight,
            turret.x * xScale, turret.y * yScale,
            xScale * turret.size, yScale * turret.size
        );
    }

    function drawTurretUpgrade(turret){
        graphics.context.drawImage(
            MyGame.assets['upgradeStar'],
            turret.upgradeLevel * 150, 0,
            150, 145,
            turret.x * xScale, (turret.y + (turret.size - 1)) * yScale,
            xScale, yScale
        );
    }

    function drawBadBackground(board) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (board[y][x].occupied === true) {
                    graphics.context.fillStyle = 'rgb(0, 0, 0)';
                } else {
                    graphics.context.fillStyle = 'rgb(150, 150, 150)';
                }
                graphics.context.fillRect(x * xScale, y * yScale, xScale, yScale);
            }
        }
    }

    function drawGoodBackground(board){
        graphics.context.opacity = 1.0;
        graphics.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
        for (let y = 0; y <= board.length / 2; y++) {
            for (let x = 0; x <= board[y].length / 2; x++) {
            graphics.context.drawImage(background.backAsset, background.travBackground.x,
            background.travBackground.y, background.width,
            background.height, (2*x - 1) * xScale, (2*y - 1) * yScale, 2*xScale, 2*yScale);
            }
        }
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if(board[y][x].occupied === true) {
                    graphics.context.drawImage(background.backAsset, background.deadBackground.x,
                        background.deadBackground.y, background.width / 2,
                        background.height / 2, x * xScale, y * yScale, xScale, yScale);
                }
            }
        }

    }

    function drawParticle(p){
        graphics.context.save();
        graphics.context.translate((p.x + p.size / 2) * xScale, (p.y + p.size / 2) * yScale);
        graphics.context.rotate(p.angle);
        graphics.context.translate(-1 * (p.x  + p.size / 2) * xScale, -1 * (p.y + p.size / 2) * yScale);
        graphics.context.fillStyle = p.color;
        graphics.context.fillRect(p.x * xScale, p.y * yScale, p.size * xScale, p.size* yScale);
        graphics.context.restore();
    }

    return {
        xScale: xScale,
        yScale: yScale,
        worldxScale: worldxScale,
        worldyScale: worldyScale,
        drawTextParticle, drawTextParticle,
        drawHealthBar: drawHealthBar,
        drawGrid: drawGrid,
        drawCoverage: drawCoverage,
        drawMoney: drawMoney,
        drawLives: drawLives,
        clear: clear,
        drawParticle: drawParticle,
        drawScore: drawScore,
        drawTmpTurret: drawTmpTurret,
        drawTurretRadius: drawTurretRadius,
        drawMonster: drawMonster,
        drawTurretTop: drawTurretTop,
        drawTurretUpgrade: drawTurretUpgrade,
        drawTurretBase: drawTurretBase,
        drawBackground: drawGoodBackground,
        drawProjectile: drawProjectile
    }
}(GameGraphics);