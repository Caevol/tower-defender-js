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

        graphics.fillStyle = 'rgb(255, 255, 255)';
        //graphics.context.fillRect(monster.x * (graphics.canvas.width / 50), monster.y * (graphics.canvas.height / 50), 50, 50);

        graphics.context.save();
        graphics.context.translate(monster.x, monster.y );
        graphics.context.rotate(spec.rotation);
        graphics.context.translate(-monster.x, -monster.y);


        graphics.context.drawImage(
            spec.asset,
            spec.width * spec.spriteNum, spec.offY,
            spec.width, spec.height,
            monster.x * xScale, monster.y * yScale,
            spec.width * 2, spec.height * 2
            );

        graphics.context.restore();

    }

    return {
        clear: clear,
        drawMonster: drawMonster
    }
}(GameGraphics));