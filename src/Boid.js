

class Boid {
    constructor() {
        this.position = createVector(random(width),random(height));
        this.velocity = createVector(random(-1,1),random(-1,1));
        this.velocity.setMag(random(0.5,2));
        this.acceleration = createVector();

    }

    show() {
        strokeWeight(16);
        stroke(255);
        point(this.position.x,this.position.y);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }
    align(boids){
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        

        for(let other of boids){
            let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
            
            if(d < perceptionRadius && other != this){
                
                steering.add(other.velocity);
                total++;
            }
            
        }
        if(total>0){
            steering.div(total);
            steering.sub(this.velocity);
            
        }
        return steering;
    }
    flock(boids){
        let alignment = this.align(boids);
        this.acceleration = alignment; //F=M*a, M = 0 add M variety later
    }

    
}