/* === Canvas background animation === */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let w,h;
function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
window.addEventListener('resize',resize); resize();

const nodes = Array.from({length:70},()=>(
  {x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5, r:2}
));

function animateCanvas(){
  ctx.clearRect(0,0,w,h);
  nodes.forEach(n=>{
    n.x+=n.vx; n.y+=n.vy;
    if(n.x<0||n.x>w) n.vx*=-1;
    if(n.y<0||n.y>h) n.vy*=-1;
    ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
    ctx.fillStyle="#ff6b35"; ctx.fill();
  });
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      let dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.strokeStyle="rgba(255,107,53,"+(1-dist/120)+")"; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* === Robot handshake animation === */
const leftRobot = document.querySelector('.robot.left');
const rightRobot = document.querySelector('.robot.right');
const glow = document.getElementById('glow');

let step=0;
function robotLoop(){
  const screenCenter = window.innerWidth / 2;
  const leftTarget = screenCenter - 240;
  const rightTarget = screenCenter + 20;

  step++;
  if(step===1){
    leftRobot.style.left = leftTarget + 'px';
    rightRobot.style.left = rightTarget + 'px';

    setTimeout(()=>{
      leftRobot.style.bottom = '100px';
      rightRobot.style.bottom = '100px';
      glow.style.opacity = 1;
      setTimeout(()=>{
        leftRobot.style.bottom = '80px';
        rightRobot.style.bottom = '80px';
        setTimeout(()=>{ robotLoop(); }, 1200);
      }, 600);
    }, 2000);
  } else if(step===2){
    leftRobot.style.left = '-300px';
    rightRobot.style.left = (window.innerWidth+300)+'px';
    glow.style.opacity=0;
    setTimeout(()=>{ step=0; robotLoop(); }, 1200);
  }
}
robotLoop();