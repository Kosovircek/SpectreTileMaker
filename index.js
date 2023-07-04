import {ControlEdge, CopyEdge} from "./src/edge.js";

let edges = new Array();
let svg = document.getElementById("plane");

let edge1 = new ControlEdge(svg);
edge1.addBezier([[-50,0], [-50,-10], [50,-10], [50,0]]);
edge1.translate(300, 300);
edge1.translate(0, -50);
edge1.redraw();
let copyEdge1 = new CopyEdge(svg);
copyEdge1.translate(300, 300);
copyEdge1.rotate(1.5708*2);
copyEdge1.translate(0, -50);
copyEdge1.mirror();

let edge2 = new ControlEdge(svg);
edge2.addBezier([[-50,0], [-50,-10], [50,-10], [50,0]]);
edge2.translate(300, 300);
edge2.rotate(1.5708);
edge2.translate(0, -50);
edge2.redraw();
let copyEdge2 = new CopyEdge(svg);
copyEdge2.translate(300, 300);
copyEdge2.rotate(1.5708*3);
copyEdge2.translate(0, -50);
copyEdge2.mirror();

edges.push(edge1);
edges.push(edge2);

globalRedraw();

export function globalRedraw() {
  console.log("global redraw called");
  edges.forEach(e => e.redraw());
  copyEdge1.redraw(edge1.segments);
  copyEdge2.redraw(edge2.segments);
}
