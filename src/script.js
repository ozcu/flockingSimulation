let flock = [];
let boid = null;


  function setup(){
    
    let width = windowWidth - 250
    let height = windowHeight - 250 //room for sliders

    createCanvas(width, height);

    //INITIATE FLOCK

     for(let i=0;i<50;i++){
      flock.push(new Boid());
    }  
    
   //SLIDERS

    textSize(24);
    noStroke();

    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(50,975)
  
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(50,1025)

    separationSlider = createSlider(0, 2, 1, 0.1);
    separationSlider.position(50,1075) 
    
  };


  function draw() {
    background(51)
    
    //DRAW SLIDERS
    text("Align", alignSlider.x * 2 + alignSlider.width, 975);
    
    text("Cohere", cohesionSlider.x * 2 + cohesionSlider.width,1025);
    
    text("Separate", separationSlider.x * 2 + separationSlider.width, 1075);
     

    //CONSTRUCT BOUNDARY & QUADTREE
    let boundary = new Rectangle(width / 2  ,height / 2 ,width / 2 , height / 2  );
    let qt = new Quadtree(boundary, 3);
    

    let localBoids = []

    for(let boid of flock){
      let point = new Point(boid.position.x,boid.position.y, boid); //referencing boid data
      qt.insert(point);
      qt.show()

      
      //debug range
      
/*       stroke(0,255,0)
      rectMode(CENTER)
      strokeWeight(1)
      rect(range.x,range.y,range.w *2 ,range.h * 2) */ 
      
      let range = new Rectangle(boid.position.x,boid.position.y,25,25); //find optimal range later
      let points = qt.query(range);
      
      //QUERY RESULT
      for(let p of points){

        let resultBoid = p.userData;
   
        localBoids.push(resultBoid)
      }
      //console.log(localBoids)

      boid.handleEdges();
      boid.moveFlock(localBoids);  //localBoids
      boid.show();
      boid.update();
     
    }

    
    
  };

