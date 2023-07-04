import {ControlPoint} from "./geometry.js";
import {globalRedraw} from "../index.js";
console.log("mouse loaded");

let modes = {
  pencil: "penicl",
  pen: "pen",
  select: "select"
};

export var mouse = {
  selected: null,
  mode: modes.select,
  transformMat: null
};

document.onmousemove = (event) => {
  switch (mouse.mode) {
    case modes.select:
      if (mouse.selected == null)
        break;
      mouse.selected.move(event.clientX, event.clientY, mouse.transformMat);      
      break;
  }
  globalRedraw();
};

document.onmouseup = (event) => {
  mouse.selected = null;
}
