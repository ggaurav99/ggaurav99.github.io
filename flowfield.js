const canvas = document.getElementById("flow-canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);

const particles = [];

for (let i = 0; i < 3000; i++) {

    particles.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height

    });

}

let t = 0;

function field(x, y) {

    // Convert pixels to mathematical coordinates
    const X = (x - canvas.width / 2) / 220;
    const Y = (y - canvas.height / 2) / 220;

    return {

        dx:
            Math.sin(Y * 2.0 + t)
            - 0.7 * Math.cos(X * 1.3),

        dy:
            Math.cos(X * 2.0 - t)
            + 0.7 * Math.sin(Y * 1.3)

    };

}

function animate() {

    t += 0.003;

    ctx.fillStyle = "rgba(10,11,16,0.2)";
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    


    particles.forEach(p => {

        const v = field(p.x, p.y);

        p.x += v.dx;
        p.y += v.dy;

        if (
            p.x < 0 || p.x > canvas.width ||
            p.y < 0 || p.y > canvas.height
        ) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
        }

        const len = 6;

        const mag = Math.hypot(v.dx, v.dy) + 1e-6;

        const ux = v.dx / mag;
        const uy = v.dy / mag;

        ctx.beginPath();

        ctx.moveTo(
        p.x - ux * len / 2,
        p.y - uy * len / 2
      );

        ctx.lineTo(
        p.x + ux * len / 2,
        p.y + uy * len / 2
      );

        ctx.strokeStyle = "rgba(169,159,250,0.2)";
        ctx.lineWidth = 1.1;
        ctx.stroke();

    });
      
    requestAnimationFrame(animate);

}

animate();
