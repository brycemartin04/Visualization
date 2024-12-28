
var canvas = document.getElementById("treeCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 720
canvas.height = 720


var angle = 45
var width = 100
var recursion = 1
var max = 13

function draw(){
    ctx.translate((canvas.width / 2) - width / 2, (canvas.height / 2) + 200);
    drawTree(recursion, width, angle);
    
}

function drawTree(j, width, angle){
    if(j <= 0) return;

    ctx.strokeStyle = "rgba(0, 77, 0, .2)"
    if (j > 12) ctx.strokeStyle = "rgba(204, 255, 204, 1)";
    else if (j > 11) ctx.strokeStyle = "rgba(187, 255, 187, 1)";
    else if (j > 10) ctx.strokeStyle = "rgba(170, 255, 170, 1)";
    else if (j > 9) ctx.strokeStyle = "rgba(153, 255, 153, 1)";
    else if (j > 8) ctx.strokeStyle = "rgba(136, 255, 136, 1)";
    else if (j > 7) ctx.strokeStyle = "rgba(119, 240, 119, 1)";
    else if (j > 6) ctx.strokeStyle = "rgba(102, 230, 102, 1)";
    else if (j > 5) ctx.strokeStyle = "rgba(85, 204, 85, 1)";
    else if (j > 4) ctx.strokeStyle = "rgba(68, 178, 68, 1)";
    else if (j > 3) ctx.strokeStyle = "rgba(51, 153, 51, 1)";
    else if (j > 2) ctx.strokeStyle = "rgba(34, 125, 34, 1)";
    else if (j > 1) ctx.strokeStyle = "rgba(17, 102, 17, 1)";
    else if (j > 0) ctx.strokeStyle = "rgba(0, 77, 0, 1)";

    ctx.fillStyle = "rgba(255, 255, 255, .02)"
    ctx.beginPath();
    ctx.rect(0, 0, width, -width);
    ctx.stroke()
    ctx.fill()
    
    var alpha = angle;
    var beta = 90 - angle;
    var w1 = Math.cos(alpha * (Math.PI / 180)) * width;
    var w2 = Math.cos(beta * (Math.PI / 180)) * width;
    var h = Math.sin(beta * (Math.PI / 180)) * w2;
    var x = Math.sqrt(Math.pow(w1,2)-Math.pow(h,2));
    var b = (Math.asin(h/w2) / Math.PI) * 180;

    ctx.save();
    ctx.translate(0,-width);
    ctx.rotate(-angle * (Math.PI / 180));
    drawTree(j - 1, w1, angle);
    ctx.restore();

    ctx.save();
    ctx.translate(x,-width -h);
    ctx.rotate(b * (Math.PI / 180));
    drawTree(j - 1, w2, angle);
    ctx.restore();
    
}

function clear(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkParams(){
    angle = document.getElementById("angle").value;
    max = document.getElementById("max").value;
}

function animate() {
    recursion += .03
    if (recursion > max){
        clear()

        recursion = 0
    }
    clear();
    checkParams()
    draw();
    window.requestAnimationFrame(animate)
}
animate()

// Get the sliders and value elements
const angleSlider = document.getElementById("angle");
const angleValue = document.getElementById("angleValue");

const maxSlider = document.getElementById("max");
const maxValue = document.getElementById("maxValue");

// Update the value display when the slider changes
angleSlider.addEventListener("input", function() {
    angleValue.textContent = angleSlider.value;
});

maxSlider.addEventListener("input", function() {
    maxValue.textContent = maxSlider.value;
});

