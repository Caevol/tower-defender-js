let ParticleSystem = (function(){

    const SHRINK_SPEED = .0003;
    const FLOAT_SPEED = .005;
    let particles = [];
    let textParticles = [];

    function TextParticle(x, y, lifetime, text, color){
        return {
            x : x,
            y : y,
            lifetime: lifetime,
            text : text,
            color : color
        }
    }

    function Particle(x, y, lifetime, velx, vely, angle, angleRotation, size, color, shrink = false){
         return {
             shrink: shrink,
             x: x,
             y: y,
             lifetime: lifetime,
             velX: velx,
             velY: vely,
             angle: angle,
             angleRotation: angleRotation,
             size: size,
             color: color
         };
     }

     function updateParticles(elapsedTime){
        let keepers = [];
        for(let i = 0; i < particles.length; i++){
            let p = particles[i];

            p.x += p.velX * elapsedTime;
            p.y += p.velY * elapsedTime;
            p.angle += p.angleRotation * elapsedTime;

            if(p.shrink === true){
                p.size -= elapsedTime * SHRINK_SPEED;
                p.x += elapsedTime * SHRINK_SPEED / 2;
                p.y += elapsedTime * SHRINK_SPEED / 2;
            }

            p.lifetime -= elapsedTime;
            if(p.lifetime > 0){
                keepers.push(p);
            }
        }
        particles = keepers;

         updateTextParticles(elapsedTime);
     }

     function resetParticles(){
        particles.length = 0;
        textParticles.length = 0;
     }

     function generateTextParticle(x, y, text){
         let t = TextParticle(x,y, 800, text, 'rgb(255, 239, 213)');
         textParticles.push(t);
     }

     function updateTextParticles(elapsedTime){
         let keepers = [];
         for(let i = 0; i < textParticles.length; i++){
             let p = textParticles[i];
             p.y -= FLOAT_SPEED * elapsedTime;
             p.lifetime -= elapsedTime;
             if(p.lifetime > 0){
                 keepers.push(p);
             }
         }
         textParticles = keepers;
     }

     function generateStandingParticle(x, y, color){
         particles.push(Particle(x, y, 1000, 0, 0, 0, 0, .3, color, true));
     }

     function generateParticles(particleCount, x, y, width, height, color){
        let c = null;
        switch(color){
            case "red":
                c = 'rgb(255, 0, 0)';
                break;
            case "blue":
                c = 'rgb(0, 0, 255)';
                break;
            case "yellow":
                c = 'rgb(255, 239, 213)';
                break;
            case "orange":
                c = 'rgb(255, 69, 0)';
                break;
        }

        for(let i = 0; i < particleCount; i++) {
            let pos = Math.random() * (width * height);
            let posX = (pos % height) + x;
            let posY = (pos / height) + y;
            let lifetime = Math.floor(Math.random() * 900 + 300);

            let angle = Math.atan2(posY - (y + height / 2), posX - (x + width / 2));
            let vel = Math.random() * .005;
            let velX = Math.cos(angle) * vel;
            let velY = Math.sin(angle) * vel;
            let angleRotation = Math.random() * (Math.PI / 4);
            let size = Math.random() * .2 + .2;

            particles.push(Particle(posX, posY, lifetime, velX, velY, angle, angleRotation, size, c, false));
        }

     }

     function renderParticles(){
         for(let i = 0; i < particles.length; i++){
             Renderer.drawParticle(particles[i]);
         }

         for(let i = 0; i < textParticles.length; i++){
             Renderer.drawTextParticle(textParticles[i]);
         }
     }

     return {
         generateTextParticle: generateTextParticle,
         generateStandingParticle: generateStandingParticle,
         resetParticles: resetParticles,
         renderParticles: renderParticles,
         updateParticles: updateParticles,
         generateParticles: generateParticles
     }
}());