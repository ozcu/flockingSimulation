
flock = [];


  function setup(){

    createCanvas(640, 480);
    for(let i=0;i<100;i++){
      flock.push(new Boid());
    }
    
  };


  function draw() {
    background(0);

    //draw boids
    for(let boid of flock){
      
      boid.flock(flock);
      boid.show();
      boid.update();
      
 
    }   

  };

