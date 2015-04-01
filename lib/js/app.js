// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var para = document.createElement("section");
var node = document.createTextNode("This is new.");
para.appendChild(node);
var element = document.getElementsByTagName("div")[0];
element.appendChild(para);