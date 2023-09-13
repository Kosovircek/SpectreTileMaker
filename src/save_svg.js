

/*
document.getElementById("saveBtn").onclick = () => {
  console.log("Hello From btn");
  let ogSvg = document.getElementById("plane");
  let d = "";

  let edges = Array.from(ogSvg.getElementsByTagName("path"));
  d += edges[0].getAttribute("d");
  for(let i=1; i<edges.length; i++) {
    let edgeD = edges[i].getAttribute("d").split(" ");
//    edgeD.splice(0, 1);
//    edgeD.splice(1, 1);
//    console.log(edgeD);
//    if(i%2!=0)
//      edgeD = [edgeD[3],edgeD[2],edgeD[0],edgeD[1]];
//    else
//      edgeD = [edgeD[0],edgeD[1],edgeD[2],edgeD[3]];
    d += " " + edgeD.join(" ");
  }

  let newSvg = document.createElementNS("http://www.w3.org/2000/svg", 
                                        "svg");
  newSvg.setAttribute("width", "800");
  newSvg.setAttribute("height", "600");
  let path = document.createElementNS("http://www.w3.org/2000/svg", 
                                      "path");
  path.setAttribute("stroke", "red");
  path.setAttribute("fill", "blue");
  path.setAttribute("d", d);
  
  document.getElementById("plane").appendChild(path);
};
*/

document.getElementById("saveBtn").onclick = () => {
  //Copy svg
  const copiedSvgElement = document.getElementById("plane").cloneNode(true);
  const newId = 'newSvg_' + Date.now();
  copiedSvgElement.setAttribute('id', newId);
  document.body.appendChild(copiedSvgElement);
  
  let svgElement = document.getElementById(newId);

  //remove the buttons
  let controls = svgElement.getElementsByTagName("circle");
  Array.from(controls).forEach(c => {
    c.remove();
  });

  console.log("Hello My Jello");
  // Create a new Blob object containing the SVG data
  const svgData = new Blob([svgElement.outerHTML], { type: 'image/svg+xml;charset=utf-8' });

  // Create a temporary <a> element to trigger the download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(svgData);
  a.download = 'my_svg.svg';

  // Trigger a click event on the <a> element to initiate the download
  a.click();

  // Clean up by revoking the Blob object
  URL.revokeObjectURL(a.href);

  copiedSvgElement.remove();
};  
