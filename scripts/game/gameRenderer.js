Renderer = (function(graphics){

    let xScale = graphics.canvas.width / 50;
    let yScale = graphics.canvas.height / 50;

    function clear(){
        graphics.context.save();
        graphics.context.setTransform(1, 0, 0, 1, 0, 0);
        graphics.context.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.context.restore();
    }

    function drawMonster(monster){
        let spec = monster.spec;


        graphics.context.save();
        graphics.context.translate(monster.x - spec.width / 2, monster.y - spec.height / 2);
        graphics.context.rotate(spec.rotation);
        graphics.context.translate(-(monster.x - spec.width / 2), -(monster.y - spec.height / 2));


        graphics.context.drawImage(
            spec.asset,
            spec.width * spec.spriteNum, spec.offY,
            spec.width, spec.height,
            monster.x * xScale - 3 * spec.width / 4, monster.y * yScale - spec.height,
            spec.width * 2, spec.height * 2
            );

        graphics.context.restore();
    }

    function drawTurretTop(turret){
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

    function drawTurretBase(turret){
        let spec = turret.spec;

        graphics.context.drawImage(
            spec.asset,
            spec.basePosX, spec.basePosY,
            spec.bwidth, spec.bheight,
            turret.x * xScale, turret.y * yScale,
            xScale * turret.size, yScale * turret.size
        );
    }

    function drawBadBackground(board){
        for(let y = 0; y < board.length; y ++){
            for(let x = 0; x < board[y].length; x ++){
                if(board[y][x].occupied === true){
                    graphics.context.fillStyle = 'rgb(0, 0, 0)';
                } else {
                    graphics.context.fillStyle = 'rgb(150, 150, 150)';
                }
                graphics.context.fillRect(x * xScale, y * yScale, xScale, yScale);
            }
        }
    }

    return {
        clear: clear,
        drawMonster: drawMonster,
        drawTurretTop : drawTurretTop,
        drawTurretBase : drawTurretBase,
        drawBackground: drawBadBackground
    }
}(GameGraphics));