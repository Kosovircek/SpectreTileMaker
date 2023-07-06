import {ControlPoint, Bezier} from "./geometry.js";
import {ControlEdge, CopyEdge} from "./edge.js";

export class Tile {
  constructor(svg, edgesData) {
    this.transformMat = glMatrix.mat2d.create();
    this.edges = new Array();
    for (let i=0; i<edgesData.length; i++) { // first edge is Control all other are Copy
      let edgeData = edgesData[i];
      let edge = null;
      if (i==0) {
        edge = new ControlEdge(svg);
        edge.addBezier(edgeData.curve);
      }
      else
        edge = new CopyEdge(svg, this.edges[0]);
      edge.translate(300, 200);
      edge.translate(edgeData.x, edgeData.y);
      edge.rotate(edgeData.rotation);
      if (edgeData.mirror) 
        edge.mirror();
      this.edges.push(edge);
    }
  }
  redraw() {
    for(let edge of this.edges) {
      edge.redraw();
    }
  }
}
