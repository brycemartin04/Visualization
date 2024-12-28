var canvas = document.getElementById("fourierCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;


const centerX = canvas.width / 4;
const centerY = canvas.height / 2;
const startCurve = canvas.width / 2 + canvas.width /10;
let time = 0;
let curve = [];
var iterations = 5
buffer = 10


function drawCircle(x, y, r, color = "white") {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawPoint(x, y, r, color = "white") {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color = "black") {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function animate() {
    iterations = document.getElementById("iterations").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222222"
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    let x = centerX;
    let y = centerY;


    for (let i = 0; i < iterations; i++) {
        let prevX = x;
        let prevY = y;

        let n = i * 2 + 1
        let radius = 160 *(4/(n*Math.PI))
        x += radius * Math.cos(n*time)
        y += radius * Math.sin(n*time)

        drawCircle(prevX, prevY, radius, "white");
        drawLine(prevX, prevY, x, y, "white");
    }

    drawPoint(x, y, 3, "red");

    drawLine(x,y,startCurve,y, "white")

    curve.unshift(y);

    ctx.beginPath();
    ctx.moveTo(startCurve, curve[0]); 

    for (let i = 1; i < curve.length; i++) {
        ctx.lineTo(i + startCurve, curve[Math.floor(i)]); 
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();


    if (curve.length > canvas.width / 2) {
        curve.pop();
    }

    time += .03;

    requestAnimationFrame(animate);
}

animate();

const iterationsSlider = document.getElementById("iterations");
const iterationsValue = document.getElementById("iterationsValue");

iterationsSlider.addEventListener("input", function() {
    iterationsValue.textContent = iterationsSlider.value;
});