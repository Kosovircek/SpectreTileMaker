import {ControlEdge, CopyEdge} from "./src/edge.js";
import {Tile} from "./src/tile.js";

let svg = document.getElementById("plane");

let tile = null;
makeTile([[-50,0], [-50,-10], [50,-10], [50,0]]);

function makeTile(curve) {
  tile = new Tile(svg, [
    {
      curve: curve,
      x: 0,
      y: 0,
      rotation: 0
    },
    {
      mirror: true,
      x: 50,
      y: -50,
      rotation: toRad(360-90)
    },
    {
      mirror: false,
      x: 95-1.69873046875,
      y: -125,
      rotation: toRad(360-30)
    },
    {
      mirror: true,
      x: 163-1.3974609375,
      y: -107+0.30126953125,
      rotation: toRad(60)
    },
    {
      mirror: false,
      x: 162-0.3974609375,
      y: -20-0.09619140625,
      rotation: toRad(120)
    },
    {
      mirror: true,
      x: 180-0.09619140625,
      y: 48+0.205078125,
      rotation: toRad(30)
    },
    {
      mirror: false,
      x: 224-0.794921875,
      y: 125-1.794921875,
      rotation: toRad(90)
    },
    {
      mirror: false,
      x: 174-0.794921875,
      y: 176-2.794921875,
      rotation: toRad(0)
    },
    {  
      mirror: true,
      x: 99-0.794921875,
      y: 219-2.49365234375,
      rotation: toRad(360-60)
    },
    {  
      mirror: false,
      x: 31-1.09619140625,
      y: 237-2.1923828125,
      rotation: toRad(30)
    },
    {  
      mirror: true,
      x: -56-0.69873046875,
      y: 237-2.1923828125,
      rotation: toRad(360-30)
    },
    {  
      mirror: false,
      x: -124-1,
      y: 219-2.49365234375,
      rotation: toRad(60)
    },
    {  
      mirror: false,
      x: -124-1,
      y: 133-3.09619140625,
      rotation: toRad(360-60)
    },
    {  
      mirror: true,
      x: -75,
      y: 46-2.69873046875,
      rotation: toRad(360-60)
    },
  ]);
}
function toRad(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

globalRedraw();

export function globalRedraw() {
  tile.redraw();
}

document.getElementById("resetBtn").onclick = resetTile;
function resetTile() {
  svg.innerHTML = "";
  let numControls = parseInt(document.getElementById("numControlsInput").value);
  let curve = [];
  let c = 1;
  for (let i=-50; i<50; i+=100/(numControls)) {
    if(c==1) {
      curve.push([i,0]);
      curve.push([i,-10]);
    }
    else {
      curve.push([i,-10]);
      curve.push([i,0]);
    }
    c++;
  }
  curve.push([50,-10]);
  curve.push([50,0]);
  console.log(curve);
  makeTile(curve);
  globalRedraw();
}

document.getElementById("hideControlsBtn").onclick = () => {
  let controls = document.getElementsByTagName("circle");
  Array.from(controls).forEach(c => {
    if(c.style.visibility != "hidden")
      c.style.visibility = "hidden";
    else
      c.style.visibility = "visible";
  });
};


