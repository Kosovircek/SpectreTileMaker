import {Bezier, ControlPoint} from "./geometry.js";

export class ControlEdge {
  constructor(svg) {
    this.svg = svg;
    this.segments = new Array(); // of {path , controls: array} 
    this.transformMat = glMatrix.mat2d.create();
  }
  redraw() {
    this.segments.forEach(segment => {
      segment.path.redraw(this.transformMat, segment.controls);
      segment.controls.forEach(c => c.redraw(this.transformMat));
    });
  }
  rotate(angle) {
    glMatrix.mat2d.rotate(this.transformMat,
                          this.transformMat,
                          angle);
  }
  translate(dx, dy) {
    glMatrix.mat2d.translate(this.transformMat, 
                             this.transformMat, 
                             glMatrix.vec2.fromValues(dx,dy));
  }
  addBezier(points) {
    let controls = new Array();
    for(let i=0; i<points.length; i+=2) {
      let p = points[i];
      let p1 = points[i+1];
      let color = this.getRandColor();
      console.log(color);
      controls.push(new ControlPoint(this.svg, 
                                     p[0], p[1],
                                     this.transformMat,
                                     color));
      controls.push(new ControlPoint(this.svg, 
                                     p1[0], p1[1],
                                     this.transformMat,
                                     color));
    }
    this.segments.push({
      path: new Bezier(this.svg),
      controls: controls 
    });
  }
  getRandColor() {
    return Math.floor(Math.random()*16777215).toString(16);
  }
    
}

export class CopyEdge {
  constructor(svg, controlEdge) {
    this.svg = svg;
    this.controlEdge = controlEdge;
    this.path = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");
    this.transformMat = glMatrix.mat2d.create();
    this.lineSegements = new Array();
  }
  redraw() {
    this.path.remove();
    this.controlEdge.segments.forEach(s => {
      if (s.path instanceof Bezier)
        this.drawBezier(s.controls);
    });
  }
  drawBezier(controls) {
    this.path = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");
    this.path.setAttribute("stroke", "black");
    this.path.setAttribute("fill", "none");
    let attribStr = "M "  +controls[0].strCoord(this.transformMat)+
                    " C " +controls[1].strCoord(this.transformMat)+               
                    " "   +controls[2].strCoord(this.transformMat)+
                    " "   +controls[3].strCoord(this.transformMat);
    if(controls.length > 4) {
      attribStr += " S";
      for(let i=4; i<controls.length; i++) {
        let control = controls[i];
        attribStr += " "  +control.strCoord(this.transformMat);
      }
    }
    this.path.setAttribute("d", attribStr); 
    this.svg.appendChild(this.path);
  }
  rotate(angle) {
    glMatrix.mat2d.rotate(this.transformMat,
                          this.transformMat,
                          angle);
  }
  translate(dx, dy) {
    glMatrix.mat2d.translate(this.transformMat, 
                             this.transformMat, 
                             glMatrix.vec2.fromValues(dx,dy));
  }
  mirror() {
    glMatrix.mat2d.scale(this.transformMat,
                         this.transformMat,
                         glMatrix.vec2.fromValues(-1,-1));
  }
}

