
var curves = new Array();
var mouseState = {
  last: {x:0, y:0},
  offset: {x:0, y:0},
  selected: null
}
document.onmousemove = (event) => {
  if(mouseState.selected != null){
    mouseState.selected.x = event.clientX+mouseState.offset.x-95;
    mouseState.selected.y = event.clientY+mouseState.offset.y-95;
    mouseState.selected.redraw();
    for(let curve of curves) {
      curve.redraw();
    }
  }
  mouseState.last.x = event.clientX;
  mouseState.last.y = event.clientY;
}
document.onmousedown = (event) => {
  if(curves.lenght == 0)
    return;
  if(event.buttons != 2)
    return;
  curves[0].addControls([[300,300],[400,400]]);
}

class Bezier {
  constructor(svg, points) {
    this.curve = document.createElementNS("http://www.w3.org/2000/svg", 
                                          "path");
    this.curve.setAttribute("stroke", "black");
    this.curve.setAttribute("fill", "none");

    this.plane = svg;
    this.plane.appendChild(this.curve);
    this.controls = this.setupControls(points);
    this.redrawAll();
    curves.push(this);
  }
  setupControls(points) {
    let controls = new Array();
    for(let point of points) {
      controls.push(new ControlPoint(this.plane, point));
    }
    return controls;
  }
  addControls(points) {
    for(let point of points) {
      this.controls.insert(this.controls.length-1, 
                           new ControlPoint(this.plane, point));
    }
    console.log(this.controls);
    this.redrawAll();
  }
  hideControls() {
    for(let control of this.controls) {
      control.hide();
    }
  }
  showControls() {
    for(let control of this.controls) {
      control.show()
    }
  }
  redraw() {
    let attribStr = "M "  +this.controls[0].strCoord()+
                    " C " +this.controls[1].strCoord()+               
                    " "   +this.controls[2].strCoord()+
                    " "   +this.controls[3].strCoord();
    if(this.controls.length > 4) {
      attribStr += " S";
      for(let i=4; i<this.controls.length; i++) {
        let control = this.controls[i];
        attribStr += " "  +control.strCoord();
      }
    }
    
    this.curve.setAttribute("d", attribStr); 
  }
  redrawAll() {
    for(let control of this.controls) {
      control.redraw();
    }
    this.redraw();
  }
  clone() {
    let points = [];
    for(let control of this.controls) {
      points.push([control.x, control.y]);
    }
    return new Bezier(this.plane, points);
  }
  copyLook(bezier){
    for(let control of this.controls)
      control.circle.remove();
    this.controls = new Array();
   
    let points = new Array();
    for(let control of bezier.controls) {
      points.push([control.x, control.y]);
    }
    this.controls = this.setupControls(points);
    this.redrawAll();
  }
}

class ControlPoint {
  constructor(svg, point) {
    this.x = point[0];                          
    this.y = point[1];
    this.r = 5;

    this.circle = document.createElementNS("http://www.w3.org/2000/svg", 
                                           "circle");
    this.circle.setAttribute("cx", this.x+"");
    this.circle.setAttribute("cy", this.y+"");
    this.circle.setAttribute("r", this.r+"");
    this.circle.onmousedown = (event) => {
      mouseState.selected = this;
      mouseState.offset = {x: -this.r, y: -this.r};
    };
    this.circle.onmouseup = (event) => {
      mouseState.selected = null;
    };

    this.plane = svg;
    this.plane.appendChild(this.circle);

  }
  strCoord() {
    return this.x+","+this.y;
  }
  redraw() {
    this.circle.setAttribute("cx", this.x+"");
    this.circle.setAttribute("cy", this.y+"");
  }
  hide() {
    this.circle.style.display = "none";
  }
  show() {
    this.cicle.style.display = "block";
  }
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};



/*
 *  TILING 
*/
class Edge {
  constructor(curve) {
    this.curve = curve;
    this.transformMat = glMatrix.mat2d.create();
  }
  update() {
    console.log("updating");
    for(let control of this.curve.controls) {
      let p = glMatrix.vec2.fromValues(control.x, control.y);
      glMatrix.vec2.transformMat2d(p, p, this.transformMat);
      control.x = p[0];
      control.y = p[1];
    }
  }
  redrawAll() {
    this.curve.redrawAll();
  }
  translate(dx, dy) {  
    glMatrix.mat2d.translate(this.transformMat, 
                             this.transformMat, 
                             glMatrix.vec2.fromValues(dx,dy));
  }
  rotate(angle) {
    console.log("rotating");
    glMatrix.mat2d.rotate(this.transformMat,
                          this.transformMat,
                          angle);
  }
  hideControls() {
    this.curve.hideControls();
  }
  showControls() {
    this.curve.showControls();
  }
}

class Tile {
  constructor(curve) {
    this.transformMat = glMatrix.mat2d.create();
    this.curve = curve;
    this.edges = [new Edge(curve), 
                  new Edge(curve.clone()),
                  new Edge(curve.clone()),
                  new Edge(curve.clone())];
    this.translateAll();
    this.edges[1].hideControls();
    this.edges[2].hideControls();
    this.edges[3].hideControls();
    this.edges[1].curve.copyLook(this.edges[0].curve);
    this.edges[1].update();
    this.edges[1].redrawAll();
  }
  update() {
    for(let edge of this.edges) {
      edge.update();
      edge.redrawAll();
    }
  }
  translateAll() {
    let i = 0;
    for(let edge of this.edges) {
      edge.translate(200,200);
      edge.rotate(i);
      i += 1.5708;
    }
    this.update();
  }
}

let b2 = new Bezier(plane, [[-50,-50], [-50,-60], [50,-60], [50,-50]]);
let tile1 = new Tile(b2);



//  setInterval(()=>{
//    console.log("hello");
//    tile1.translateAll();
//  },1000);

