class Boid {
    constructor() {
        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;

    }

    show() {
        strokeWeight(4);
        stroke(255);
        //point(this.position.x,this.position.y);
    }

    update(){
        this.position.add(this.velocity); //fixed
        this.velocity.add(this.acceleration); //0,0
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    //Align itself with other boids
    align(boids){
        let perceptionRadius = 80;
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
            steering.setMag(this.maxSpeed); //setting limit before is important
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        
        return steering;
    }

    //Steer itself toward avg position of local flockmates
    cohere(boids){
        let perceptionRadius = 80;
        let steering = createVector();
        let total = 0;
        

        for(let other of boids){
            let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
            
            if(d < perceptionRadius && other != this){
                
                steering.add(other.position);
                total++;
            }
            
        }
        if(total>0){
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed); 
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        
        return steering;
    }

    //Steer itself to avoid crowding with local flockmates
    separate(boids){
        let perceptionRadius = 80;
        let steering = createVector();
        let total = 0;
        

        for(let other of boids){
            let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
            
            if(d < perceptionRadius && other != this){
                let diff = p5.Vector.sub(this.position,other.position);
                diff.mult(1 / d); //subtracted vector is inversly correlated with distance
                steering.add(diff);
                total++;
            }
            
        }
        if(total>0){
            steering.div(total);
            steering.setMag(this.maxSpeed); 
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        
        return steering;
    }

    //Add vectors
    moveFlock(boids){
        this.acceleration.mult(0);

        let alignment = this.align(boids);
        let cohesion = this.cohere(boids);
        let separation = this.separate(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        this.acceleration.add(alignment); //F=M*a, M = 0 add M variety later
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        
    }

    //Reset position out of Canvas
    handleEdges(){
        if(this.position.x > width){
            this.position.x = 0;
        }else if(this.position.x < 0){
            this.position.x = width;
        }
        else if(this.position.y > height - 250){
            this.position.y = 0;
        }else if(this.position.y < 0){
            this.position.y = height - 250; //room for sliders
        }
    }

    
}