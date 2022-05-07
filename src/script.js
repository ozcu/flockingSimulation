flock = [];


  function setup(){

    createCanvas(640, 480);
    
    alignSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 1, 0.1);

    for(let i=0;i<100;i++){
      flock.push(new Boid());
    }
    
  };


  function draw() {
    background(0);

    //draw boids
    for(let boid of flock){
      
      boid.handleEdges();
      boid.moveFlock(flock);
      boid.show();
      boid.update();
      
 
    }   

  };

