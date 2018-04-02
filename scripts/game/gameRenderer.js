Renderer = function (graphics) {

    let xScale = graphics.canvas.width / Game.BOARD_SIZE;
    let yScale = graphics.canvas.height / Game.BOARD_SIZE;

    let worldxScale = parseInt(document.getElementById("tower-game").style.width) / 50;
    let worldyScale = parseInt(document.getElementById("tower-game").style.height) / 50;


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

    function drawMoney(money) {
        graphics.context.font = "40px Arial";
        graphics.context.fillStyle = 'rgba(255, 255, 255, 1)';
        graphics.context.fillText("Money: " + money, 40, graphics.canvas.height - 100);
    }

    function drawMonster(monster) {


        graphics.context.save();
        graphics.context.translate(monster.x - monster.width / 2, monster.y - monster.height / 2);
        graphics.context.rotate(monster.rotation);
        graphics.context.translate(-(monster.x - monster.width / 2), -(monster.y - monster.height / 2));


        graphics.context.drawImage(
            monster.asset,
            monster.width * monster.spriteNum, monster.offY,
            monster.width, monster.height,
            monster.x * xScale - 3 * monster.width / 4, monster.y * yScale - monster.height,
            monster.width * 2, monster.height * 2
        );

        graphics.context.restore();
    }

    function drawProjectile(proj) {

        graphics.context.drawImage(
            proj.spec.asset,
            proj.x * xScale, proj.y * yScale,
            proj.spec.width * xScale, proj.spec.height * yScale
        )
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

    return {
        xScale: xScale,
        yScale: yScale,
        worldxScale: worldxScale,
        worldyScale: worldyScale,
        drawMoney: drawMoney,
        drawLives: drawLives,
        clear: clear,
        drawTmpTurret: drawTmpTurret,
        drawTurretRadius: drawTurretRadius,
        drawMonster: drawMonster,
        drawTurretTop: drawTurretTop,
        drawTurretBase: drawTurretBase,
        drawBackground: drawBadBackground,
        drawProjectile: drawProjectile
    }
}(GameGraphics);