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
      rotation: toRad(-90)
    },
    {
      mirror: false,
      x: 95,
      y: -125,
      rotation: toRad(-30)
    },
    {
      mirror: true,
      x: 163,
      y: -107,
      rotation: toRad(60)
    },
    {
      mirror: false,
      x: 162,
      y: -20,
      rotation: toRad(120)
    },
    {
      mirror: true,
      x: 180,
      y: 48,
      rotation: toRad(30)
    },
    {
      mirror: false,
      x: 224,
      y: 125,
      rotation: toRad(90)
    },
    {
      mirror: false,
      x: 174,
      y: 176,
      rotation: toRad(0)
    },
    {  
      mirror: true,
      x: 99,
      y: 219,
      rotation: toRad(-60)
    },
    {  
      mirror: false,
      x: 31,
      y: 237,
      rotation: toRad(30)
    },
    {  
      mirror: true,
      x: -56,
      y: 237,
      rotation: toRad(-30)
    },
    {  
      mirror: false,
      x: -124,
      y: 219,
      rotation: toRad(60)
    },
    {  
      mirror: false,
      x: -124,
      y: 133,
      rotation: toRad(-60)
    },
    {  
      mirror: true,
      x: -75,
      y: 46,
      rotation: toRad(-60)
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
  for (let i=-50; i<50; i+=100/(numControls/2)) {
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
