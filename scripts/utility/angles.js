function getAngle(rotation, turx, tury, tgx, tgy) {
    let v1 = {
        x : Math.cos(rotation),
        y : Math.sin(rotation)
    };
    let v2 = {
        x : tgx - turx,
        y : tgy - tury
    };

    //normalize vectors
    let dist = Math.sqrt(Math.pow(v2.x,2) + Math.pow(v2.y, 2));
    v2.x /= dist;
    v2.y /= dist;

    let angle = Math.acos(v1.x * v2.x + v1.y * v2.y);
    let crossProduct = v1.x * v2.y - v1.y * v2.x;

    return {
        angle : angle,
        crossProduct : crossProduct
    }

}

function getDistance(turret, monster){
    return Math.sqrt(Math.pow(monster.x - turret.x, 2) + Math.pow(monster.y - turret.y, 2));
}