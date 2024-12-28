document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById("sierpinskiCanvas")
const ctx = canvas.getContext('2d')

const dpr = window.devicePixelRatio || 1;
canvas.width = 720
canvas.height = 720

counter = 0

const vertex1 = {
    x: canvas.width/2,
    y: 5
}

const vertex2 = {
    x: 5,
    y: canvas.height-5
}

const vertex3 = {
    x: canvas.width-5,
    y: canvas.height-5
}

point = getRandomPointInTriangle(vertex1,vertex2,vertex3)

function drawTriangle(){
    ctx.beginPath();
    ctx.moveTo(vertex1.x, vertex1.y);
    ctx.lineTo(vertex2.x, vertex2.y);
    ctx.lineTo(vertex3.x, vertex3.y); 
    ctx.closePath(); 

    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();

}
drawTriangle()

function getRandomVertex(){
    vertex = Math.floor(Math.random() * 3)
    if (vertex === 0) return vertex1
    if (vertex === 1) return vertex2
    if (vertex === 2) return vertex3

}

function calculateMidpoint(p1, p2){
    x = (p1.x + p2.x) / 2
    y = (p1.y + p2.y) / 2

    point = {
        x: x,
        y: y
    }
    return point
}

function getRandomPointInTriangle(p1, p2, p3) {
    let u = Math.random();
    let v = Math.random();

    if (u + v > 1) {
        u = 1 - u;
        v = 1 - v;
    }

    const x = (1 - u - v) * p1.x + u * p2.x + v * p3.x;
    const y = (1 - u - v) * p1.y + u * p2.y + v * p3.y;
    randomPoint = {
        x: x,
        y: y
    }
    return randomPoint;
}

function resetBoard(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawPoint(point){
    ctx.beginPath();
    ctx.arc(point.x, point.y, .5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function animate(){
    const size = 100;
    if (counter > 30000){
        resetBoard()
        counter = 0
        drawTriangle()
    }
    for (let i = 0; i < size; i++) {
        counter++
        vertex = getRandomVertex()
        point = calculateMidpoint(vertex, point)
        drawPoint(point)
    }
    requestAnimationFrame(animate)
}
animate()
})