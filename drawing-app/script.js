const canvas = document.getElementById('canvas');
const incBtn = document.getElementById('inc');
const decBtn = document.getElementById('dec');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');


const ctx = canvas.getContext('2d');

let size = 20;
let isAllowDrawLine = false;
let color = 'black';
let x, y;

// control when to draw
canvas.addEventListener('mousedown', (e) => {
	isAllowDrawLine = true;
	x = e.offsetX;
	y = e.offsetY;
});
canvas.addEventListener('mousemove', (e) => {
	// console.log(e);
	if (isAllowDrawLine) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;
		drawCircle(x2, y2);
		drawLine(x, y, x2, y2);
		x = x2;
		y = y2;
	}
});
canvas.addEventListener('mouseup', () => {
	isAllowDrawLine = false;
	x = undefined;
	y = undefined;
});

// control the size of the pen
incBtn.addEventListener('click', (e) => {
	size += 5;
	if (size > 50) {
		size = 50;
	}
	updatePenSize();
});
decBtn.addEventListener('click', (e) => {
	size -= 5;
	if (size < 5) {
		size = 5;
	}
	updatePenSize();
});

// control color
colorEl.addEventListener('change', (e) => {
	color = e.target.value;
  console.log('color', e.target.value);
});

// clear the convas
clearEl.addEventListener('click', ()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
  ctx.lineWidth = size*2;
	ctx.strokeStyle = color;
	ctx.stroke();
}

function updatePenSize() {
	sizeEl.innerText = size;
}


