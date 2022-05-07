flock = [];


  function setup(){

    createCanvas(windowWidth, windowHeight);

    textSize(16);
    noStroke();

    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(50,800)
  
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(50,850)

    separationSlider = createSlider(0, 2, 1, 0.1);
    separationSlider.position(50,900)

    for(let i=0;i<100;i++){
      flock.push(new Boid());
    }
    
  };


  function draw() {
    background(0);

    text("Align", alignSlider.x * 2 + alignSlider.width, 800);
    fill(50);
    text("Cohere", cohesionSlider.x * 2 + cohesionSlider.width,850);
    fill(50);
    text("Separate", separationSlider.x * 2 + separationSlider.width, 900);
    fill(50);

    //draw boids
    for(let boid of flock){
      
      boid.handleEdges();
      boid.moveFlock(flock);
      boid.show();
      boid.update();
      
 
    }   

  };

