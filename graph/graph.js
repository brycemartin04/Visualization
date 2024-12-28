document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 1280 * dpr;
    canvas.height = 1280 * dpr;
    canvas.style.width = "720px";
    canvas.style.height = "720px";
    ctx.scale(dpr, dpr);

    neg = true

    let equation = 0
    step = .01
    const phi = (1 + Math.sqrt(5)) / 2;

    const origin = {
        x: canvas.width / (2 * dpr),
        y: canvas.height / (2 * dpr)
    };
    const scale = 100;

    let positiveT = 0; 
    let negativeT = 0; 

    function xEquation(t) {
        switch(equation){
            case 1:
                neg = true
                step = .00005
                return Math.sin(7*Math.PI*t) * 6
            case 2:
                neg = true
                step = .0005
               return Math.sin(t) * 6
            case 3:
                neg = true
                step = .004
                const R = 5, r = 1.02;
                return ((R + r) * Math.cos(t) - r * Math.cos((R + r) / r * t))/1.2
            case 4:
                neg = false
                step = .005
                const a = 0, b = 2;
                return (a + b * t) * Math.cos(t) /20
            case 5:
                neg = false
                step = .01
                return Math.pow(phi,t)*Math.cos(t) /3.5
        }
    }
    function yEquation(t) {
        switch(equation){
            case 1:
                return Math.cos(5*Math.PI*t) * 6
            case 2:
                return Math.tan(t)  *6
            case 3:
                const R = 5, r = 1.02;
                return ((R + r) * Math.sin(t) - r * Math.sin((R + r) / r * t))/1.2
            case 4:
                const a = 0, b = 2;
                return (a + b * t) * Math.sin(t) /20
            case 5:
                return Math.pow(phi,t)*Math.sin(t) /3.5
        }
    }

    function setEquations(num){
        positiveT = 0
        negativeT = 0
        equation = num
        animate()
    }

    function clearBoard(){
        equation = 0
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,canvas.height,canvas.width)
        for (i = 1; i < canvas.width; i++){
            drawGrid(i*scale,i*scale)
        }
        drawAxes()
        positiveT = 0
        negativeT = 0
    }

    document.getElementById("sinCosEquation").addEventListener("click", () => setEquations(1));
    document.getElementById("sinTanEquation").addEventListener("click", () => setEquations(2));
    document.getElementById("xSquaredEquation").addEventListener("click", () => setEquations(3))
    document.getElementById("astroid").addEventListener("click", () => setEquations(4))
    document.getElementById("pi").addEventListener("click", () => setEquations(5))
    document.getElementById("clear").addEventListener("click", () => clearBoard());

    function drawPoint(x, y) {
        ctx.beginPath();
        ctx.arc(origin.x + x * scale, origin.y - y * scale, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    function drawAxes() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(canvas.width / dpr, origin.y);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, canvas.height / dpr);
        ctx.stroke();
    }

    function drawGrid() {
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 0.5;

        for (let x = origin.x % scale; x <= canvas.width / dpr; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height / dpr);
            ctx.stroke();
        }

        for (let y = origin.y % scale; y <= canvas.height / dpr; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width / dpr, y);
            ctx.stroke();
        }
    }
    for (i = 1; i < canvas.width; i++){
        drawGrid(i*scale,i*scale)
    }
    drawAxes()
    
    function animate() {
        const points = [];
        const numPoints = 50;

        for (let i = 0; i < numPoints; i++) {
            const t = positiveT + i * step;
            const point = {
                x: xEquation(t),
                y: yEquation(t)
            };
            if (neg){
            const secondPoint = {
                x: xEquation(-1*t),
                y: yEquation(t)
            }
            points.push(secondPoint)
        }
            points.push(point);
        }
    

        points.forEach(point => {
            drawPoint(point.x, point.y);
        });

        positiveT += numPoints * step;

        if (Math.abs(points[points.length - 1].x) * scale < canvas.width / 2) {
            requestAnimationFrame(animate);
        }
    }
    animate();
});
