flock = [];


  function setup(){

    createCanvas(windowWidth, windowHeight);

    let boundary = new Rectangle(windowWidth / 2  ,windowHeight / 2 ,windowWidth / 2 ,windowHeight / 2 );
    let qt = new Quadtree(boundary, 4);
    console.log(qt);

    for (let i=0;i<2000;i++){
      let p = new Point(random(windowWidth),random(windowHeight))
      qt.insert(p);
    }

    background(0);
    qt.show();

    stroke(0,255,0);
    rectMode(CENTER);
    let range = new Rectangle(random(windowWidth),random(windowHeight),250,250);
    strokeWeight(2);
    rect(range.x, range.y, range.w * 2, range.h * 2)
  
    let points = qt.query(range);
    for(let p of points){
    strokeWeight(10);
     point(p.x,p.y);
   } 

    textSize(16);
    noStroke();

    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(50,800)
  
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(50,850)

    separationSlider = createSlider(0, 2, 1, 0.1);
    separationSlider.position(50,900)

   /*  for(let i=0;i<10;i++){
      flock.push(new Boid());
    } */
    
  };


  function draw() {
    

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

