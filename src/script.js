import './style.css'
import p5 from "p5";
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise('seed');

const sketch = p5 => {

    //variables
    let numFrames = 100;
    let m = 1000;
    let delayFactor = 1.0;
    let motion_radius = 1.0;
    const TWO_PI = 6.28318530717958647693;


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
    const seed = 1337;
    return 0.25* p5.width + 150 * simplex.noise2D(seed + motion_radius*p5.cos(TWO_PI*t),motion_radius*p5.sin(TWO_PI*t));
  }
  function y1(t){
    const seed = 1515;
    return 0.5* p5.height + 150 * simplex.noise2D(seed + motion_radius*p5.cos(TWO_PI*t),motion_radius*p5.sin(TWO_PI*t));
  }
   
  function x2(t){
    const seed = 1621;
    return 0.75* p5.width + 150 * simplex.noise2D(seed + motion_radius*p5.cos(TWO_PI*t),motion_radius*p5.sin(TWO_PI*t));
  }
  function y2(t){
    const seed = 1313;
    return 0.5* p5.height + 150 * simplex.noise2D(seed + motion_radius*p5.cos(TWO_PI*t),motion_radius*p5.sin(TWO_PI*t));
  }
    
  p5.ellipse(x1(t),y1(t),10,10);
  p5.ellipse(x2(t),y2(t),10,10);

  for(var i=0;i<=m;i++){
    var tt = 1.0*i/m;
   
    var x = p5.lerp(x1(t-delayFactor*tt),x2(t-delayFactor*(1-tt)),tt);
    var y = p5.lerp(y1(t-delayFactor*tt),y2(t-delayFactor*(1-tt)),tt);
   
    p5.point(x,y);
  }



  };
};

new p5(sketch);

export default sketch;

p5.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    
}
