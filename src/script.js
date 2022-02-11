import './style.css'
import p5 from "p5";



const sketch = p5 => {
  const numFrames = 100;
  const rad = 150
  let theta = p5.TWO_PI

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;


  // make library globally available
  window.p5 = p5;

  // Setup function

  p5.setup = () => {
    let canvas = p5.createCanvas(canvasWidth, canvasHeight);
  };

  // Draw function

  p5.draw = () => {
    p5.background(0);

    
  var t=0.5*(p5.frameCount-1)/numFrames;
 
  p5.stroke(255);
  p5.strokeWeight(1);
    

  function x1(t){
    
    return canvasWidth/2 + rad * p5.cos(theta*t)
  }
  function y1(t){
    
    return canvasHeight/2 + rad * p5.sin(theta*t)
  }
   
    
p5.ellipse(x1(t),y1(t),10,10);
  

  };
};

new p5(sketch);

export default sketch;

p5.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    
}
