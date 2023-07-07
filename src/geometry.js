import {globalRedraw} from "../index.js";
import {mouse} from "./mouse.js";

export class Bezier {
  constructor(svg) {
    this.path = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");
    this.path.setAttribute("stroke", "black");
    this.path.setAttribute("fill", "none");
    svg.appendChild(this.path);
  }
  redraw(transformMat, controls) {
    let attribStr = "M "  +controls[0].strCoord(transformMat)+
                    " C " +controls[1].strCoord(transformMat)+               
                    " "   +controls[2].strCoord(transformMat)+
                    " "   +controls[3].strCoord(transformMat);
    if(controls.length > 4) {
      attribStr += " S";
      for(let i=4; i<controls.length; i++) {
        let control = controls[i];
        attribStr += " "  +control.strCoord(transformMat);
      }
    }
    this.path.setAttribute("d", attribStr); 
  }
}

export class ControlPoint {
  constructor(svg, x, y, transformMat, fillColor) {
    this.x = x;
    this.y = y;
    this.circle = document.createElementNS("http://www.w3.org/2000/svg", 
                                           "circle");
    this.circle.setAttribute("r", "5");
    this.circle.setAttribute("fill", "#"+fillColor);
    svg.appendChild(this.circle);
    this.circle.onmousedown = (event) => {
      mouse.selected = this;
      mouse.transformMat = transformMat;
    };
  }
  redraw(transformMat) {
    let p = glMatrix.vec2.fromValues(this.x, this.y);
    glMatrix.vec2.transformMat2d(p, p ,transformMat);
    this.circle.setAttribute("cx", p[0]+"");
    this.circle.setAttribute("cy", p[1]+"");
  }
  strCoord(transformMat) {
    let p = glMatrix.vec2.fromValues(this.x, this.y);
    glMatrix.vec2.transformMat2d(p, p ,transformMat);
    return p[0]+","+p[1];
  }
  move(dx, dy, transformMat) {
    let inverseMat = glMatrix.mat2d.create();
    glMatrix.mat2d.invert(inverseMat, transformMat);
    let p = glMatrix.vec2.fromValues(dx, dy);
    glMatrix.vec2.transformMat2d(p, p , inverseMat);
    this.x = p[0];
    this.y = p[1];
  }
}
