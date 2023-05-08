var speed = 0;
var rotation = 0;
var xVelocity = 0;
var yVelocity = 0;
var object = document.querySelector('#object');
var xPosition = 70;
var yPosition = 70;
var repeatLoop;
var updaterate = 1000.0 / 50;
var resultxup;
var resultxdown;
var resultydown;
var resultyup;
var resultx;
var resulty;
var max = 50;

function down(event) {
 clearInterval(repeatLoop);
 let x = event.clientX;
 let y = event.clientY;
 resultxdown = x;
 resultydown = y;
}

function up(event) {
 let x = event.clientX;
 let y = event.clientY;
 resultxup = x;
 resultyup = y;
 resultx = resultxup - resultxdown;
 resulty = resultyup - resultydown;
 if (Math.abs(resultx) <= max) {
  xPosition += resultx;
 } else {
  xPosition -= max;
 }
 if (Math.abs(resulty) <= max) {
  yPosition -= resulty;
 } else {
  yPosition -= max;
 }
 update()
 if (Math.abs(resultx) >= Math.abs(resulty)) {
  speed = Math.abs(resultx);
 } else {
  speed = Math.abs(resulty);
 }
 if (speed > max) {
  speed = max
 }
 deltaX = resultxdown - resultxup;
 deltaY = resultyup - resultydown;
 rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
 repeatLoop = setInterval(loop, updaterate);
 xVelocity = ((speed / 2)) * (1 - (rotation / 90));
 yVelocity = ((speed / 2) * (rotation / 90));
 document.getElementById('cursormovement').innerHTML = resultx + ' px' + ', ' + resulty + ' px';
 document.getElementById('speed').innerHTML = speed / 2;
 document.getElementById('rotation').innerHTML = rotation + ' degrees';
 document.getElementById('velocities').innerHTML = xVelocity + ' px' + ', ' + yVelocity + ' px';
}

function update() {
 object.style.bottom = yPosition + 'px';
 object.style.left = xPosition + 'px';
}

function loop() {
 yVelocity -= 0.2;
 yPosition += yVelocity;
 xPosition += xVelocity;
 update()
}

addEventListener("keydown", function (e) {
 if (e.keyCode === 32) {
  yPosition = 65;
  xPosition = 65;
  clearInterval(repeatLoop);
  update()
 }
});