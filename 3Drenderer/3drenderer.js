var canvas = document.getElementById("3drendererCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 720;
canvas.height = 720;

centerX = canvas.width / 2
centerY = canvas.height / 2

let FOV = 10
let lineWidth = 5
let scale = 180
let autoRotate = false

let rotation = 1

let rotationx = .015
let rotationy = .01

let canRotateY = true
let canRotateX = true

let shapeV = []
let shapeE = []

let movementSpeed = 2

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
    up: {pressed: false},
    down: {pressed: false},
    left: {pressed: false},
    right: {pressed: false},
}


function clear(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
clear()

function setCenter(x = 0,y = 0){
    centerX = (canvas.width + x) / 2
    centerY = (canvas.height + y) / 2
}

const verticiesCube = [
    new Point3D(-1,-1,-1), new Point3D(-1,-1,1),
    new Point3D(1,-1,-1), new Point3D(-1,1,-1),
    new Point3D(-1,1,1), new Point3D(1,-1,1),
    new Point3D(1,1,-1), new Point3D(1,1,1)
]
const edgesCube = [
    new Edge(0,1), new Edge(0,2), new Edge(0,3),
    new Edge(2,5), new Edge(3,6), new Edge(3,4),
    new Edge(4,7), new Edge(6,7), new Edge(7,5),
    new Edge(5,1), new Edge(4,1), new Edge(2,6)
]

const verticiesPyramid = [
    new Point3D(1,1,1), new Point3D(1,1,-1),
    new Point3D(-1,1,1), new Point3D(-1,1,-1),
    new Point3D(0,-1,0)
]
const edgesPyramid = [
    new Edge(0,1), new Edge(0,2), new Edge(1,3),
    new Edge(2,3), new Edge(0,4), new Edge(1,4),
    new Edge(2,4), new Edge(3,4),
]

const phi = (1 + Math.sqrt(5)) / 2;
const radius = 1
  const verticiesDodecahedron = [
        new Point3D(radius, radius, radius),
        new Point3D(radius, radius, -radius),
        new Point3D(radius, -radius, radius),
        new Point3D(radius, -radius, -radius),
        new Point3D(-radius, radius, radius),
        new Point3D(-radius, radius, -radius),
        new Point3D(-radius, -radius, radius),
        new Point3D(-radius, -radius, -radius),
        new Point3D(0, radius*phi, radius/phi),
        new Point3D(0, radius*phi, -radius/phi),
        new Point3D(0, -radius*phi, radius/phi),
        new Point3D(0, -radius*phi, -radius/phi),
        new Point3D(radius/phi, 0, radius*phi),
        new Point3D(-radius/phi, 0, radius*phi),
        new Point3D(radius/phi, 0, -radius*phi),
        new Point3D(-radius/phi, 0, -radius*phi),
        new Point3D(radius*phi, radius/phi, 0),  
        new Point3D(radius*phi, -radius/phi, 0),    
        new Point3D(-radius*phi, radius/phi, 0),   
        new Point3D(-radius*phi, -radius/phi, 0),   
    ];

    const edgesDodecahedron = [
        new Edge(0, 8), new Edge(0, 12), new Edge(0, 16),
        new Edge(1, 9), new Edge(1, 14), new Edge(1, 16),
        new Edge(2, 10), new Edge(2, 12), new Edge(2, 17),
        new Edge(3, 11), new Edge(3, 14), new Edge(3, 17),
        new Edge(4, 8), new Edge(4, 13), new Edge(4, 18),
        new Edge(5, 9), new Edge(5, 15), new Edge(5, 18),
        new Edge(6, 10), new Edge(6, 13), new Edge(6, 19),
        new Edge(7, 11), new Edge(7, 15), new Edge(7, 19),
        new Edge(12, 13), new Edge(8,9), new Edge(10,11),
        new Edge(16,17), new Edge(18,19), new Edge(14,15)
    ]

    const verticiesPentagrammicPrism = [
        new Point3D(-0, -1, 0), 
        new Point3D(0.951, -0.309, 0),
        new Point3D(0.588, 0.809, 0),
        new Point3D(-0.588, 0.809, 0),
        new Point3D(-0.951, -0.309, 0),
    
        new Point3D(0, -1, .5),
        new Point3D(0.951, -0.309, .5),
        new Point3D(0.588, 0.809, .5),
        new Point3D(-0.588, 0.809, .5),
        new Point3D(-0.951, -0.309, .5)
    ];
    const edgesPentagrammicPrism = [
        new Edge(0, 2), new Edge(2, 4), new Edge(4, 1), new Edge(1, 3), new Edge(3, 0),
    
        new Edge(5, 7), new Edge(7, 9), new Edge(9, 6), new Edge(6, 8), new Edge(8, 5),
    
        new Edge(0, 5), new Edge(1, 6), new Edge(2, 7), new Edge(3, 8), new Edge(4, 9)
    ];


function project(verticies) {
    let projected = []
    for (let i = 0; i < verticies.length; i++){
        point = verticies[i]
        j = new Point2D( (FOV * point.x) / (FOV + point.z) * scale + centerY, (FOV * point.y) / (FOV + point.z) * scale + centerX)
        projected.push(j)
    }
    return projected
}

function draw(projVert, edges) {
    ctx.beginPath();
    for (let i = 0; i < edges.length; i++) {
        const p1 = edges[i].p1;
        const p2 = edges[i].p2;
        ctx.moveTo(projVert[p1].x, projVert[p1].y);
        ctx.lineTo(projVert[p2].x, projVert[p2].y);
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function rotateX(verticies) {
    for (let i = 0; i < verticies.length; i++){
        if (canRotateX){
        let newpoint = new Point3D
        point = verticies[i]
        newpoint.x = point.x
        newpoint.y = Math.cos(rotationx) * point.y - Math.sin(rotationx) * point.z
        newpoint.z = Math.sin(rotationx) * point.y + Math.cos(rotationx) * point.z
        verticies[i] = newpoint
    }
}
}
function rotateY(verticies) {
    if (canRotateY){
    for (let i = 0; i < verticies.length; i++){
        let newpoint = new Point3D
        point = verticies[i]
        newpoint.x = Math.cos(rotationy) * point.x - Math.sin(rotationy) * point.z
        newpoint.y = point.y
        newpoint.z = Math.sin(rotationy) * point.x + Math.cos(rotationy) * point.z
        verticies[i] = newpoint
    }
}
}

function parseOBJ(data) {
    const lines = data.split("\n");
    const vertices = [];
    const edges = new Set();

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);

        if (parts[0] === "v") {
            const x = parseFloat(parts[1]);
            const y = parseFloat(parts[2]);
            const z = parseFloat(parts[3]);
            vertices.push(new Point3D(x, y, z));
        } else if (parts[0] === "f") {
            const indices = parts.slice(1).map(p => parseInt(p.split("/")[0], 10) - 1);

            for (let i = 0; i < indices.length; i++) {
                const start = indices[i];
                const end = indices[(i + 1) % indices.length];
                edges.add(JSON.stringify([Math.min(start, end), Math.max(start, end)]));
            }
        }
    }

    const edgeArray = Array.from(edges).map(e => {
        const [start, end] = JSON.parse(e);
        return new Edge(start, end);
    });

    return { vertices, edges: edgeArray };
}

async function loadOBJ(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const { vertices, edges } = parseOBJ(data);
        shapeV = vertices;
        shapeE = edges;
    } catch (error) {
        console.error("Error loading OBJ file:", error);
    }
}


document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.obj')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            const { vertices, edges } = parseOBJ(fileContent);
                scale = -64
                canRotateX = false
                shapeV = vertices;
                shapeE = edges;  
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid .obj file.');
    }
}


function setShape(shape){
    switch(shape){
        case "cube":
            setCenter()
            scale = 180
            FOV = 5
            canRotateX = true
            canRotateY = true
            shapeV = verticiesCube
            shapeE = edgesCube
            break
        case "pyramid":
            setCenter()
            scale = 180
            FOV = 5
            canRotateX = false
            canRotateY = true
            shapeV = verticiesPyramid
            shapeE = edgesPyramid
            break
        case "dodecahedron":
            setCenter()
            scale = 180
            FOV = 5
            canRotateX = true
            canRotateY = true
            shapeV = verticiesDodecahedron
            shapeE = edgesDodecahedron
            break
        case "pentagrammic":
            setCenter()
            scale = 180
            FOV = 5
            canRotateX = false
            canRotateY = true
            shapeV = verticiesPentagrammicPrism
            shapeE = edgesPentagrammicPrism
            break
        case "car":
            setCenter(500)
            lineWidth = .5
            scale = -20
            FOV = 500
            canRotateX = false
            canRotateY = true
            loadOBJ("../src/car.obj")
            break
        case "human":
            setCenter(680)
            lineWidth = .5
            canRotateX = false
            canRotateY = true
            scale = -32
            FOV = 500
            loadOBJ("../src/FinalBaseMesh.obj")
            break

        case "clear":
            shapeV = []
            shapeE = []
            break
}
}

    document.getElementById("cube").addEventListener("click", () => setShape("cube"))
    document.getElementById("pyramid").addEventListener("click", () => setShape("pyramid"))
    document.getElementById("dodecahedron").addEventListener("click", () => setShape("dodecahedron"))
    document.getElementById("pentagrammic").addEventListener("click", () => setShape("pentagrammic"))
    document.getElementById("car").addEventListener("click", () => setShape("car"))
    document.getElementById("human").addEventListener("click", () => setShape("human"))
    document.getElementById("clear").addEventListener("click", () => setShape("clear"))
    rotate = document.getElementById("autoRotate");

function run(verticies,edges){
    if (keys.w.pressed) centerX -= movementSpeed
        if (keys.s.pressed) centerX += movementSpeed
        if (keys.a.pressed) centerY -= movementSpeed
        if (keys.d.pressed) centerY += movementSpeed
    if (rotate.checked){
        autoRotate = true
    }else{
        autoRotate = false
        canRotateX = false
        canRotateY = true
    }
    if (autoRotate){
        rotateX(verticies)
        rotateY(verticies)
    }else{
        rotationx = .015
        rotationy = .01 
        if (keys.down.pressed){
            rotationx *= -1
            rotateX(verticies)
        }if (keys.up.pressed){
            rotateX(verticies)
        }if (keys.right.pressed){
            rotationy *= -1
            rotateY(verticies)
        }if (keys.left.pressed){
            rotateY(verticies)
        }
    }
    draw(project(verticies),edges)
}

function animate(){
    clear()
    updateDisplay()
    run(shapeV,shapeE)
    requestAnimationFrame(animate)
}
animate()

function updateDisplay() {
    document.getElementById("lineValue").textContent = "Line Width: " + lineWidth;
    document.getElementById("scaleValue").textContent = "Scale: " + scale;
}
document.getElementById("lineMinus").addEventListener("click", () => {
    if (lineWidth > .5){ 
        lineWidth -= .5
    }
    updateDisplay();
});

document.getElementById("linePlus").addEventListener("click", () => {
    lineWidth += .5;
    updateDisplay();
});

document.getElementById("scaleMinus").addEventListener("click", () => {
    scale /= 2
    updateDisplay();
});

document.getElementById("scalePlus").addEventListener("click", () => {
    scale *= 2;
    updateDisplay();
});

window.addEventListener('keydown', (button) => {

    switch (button.key){
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 'ArrowUp':
            keys.up.pressed = true
            break
        case 'ArrowDown':
            keys.down.pressed = true
            break
        case 'ArrowLeft':
            keys.left.pressed = true
            break
        case 'ArrowRight':
            keys.right.pressed = true
            break
    }
})

window.addEventListener('keyup', (button) => {
    switch (button.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'ArrowUp':
            keys.up.pressed = false
            break
        case 'ArrowDown':
            keys.down.pressed = false
            break
        case 'ArrowLeft':
            keys.left.pressed = false
            break
        case 'ArrowRight':
            keys.right.pressed = false
            break
    }
})


document.addEventListener("keydown", function(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
});
