const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const maxOffsetY = 570 // Maksimum offset değeri
const stopButton = document.getElementById("stopButton");
const startButton = document.getElementById("startButton");
let offsetY = 0; // Her frame'de çizimlerin kaç birim aşağı indirileceğini belirtir
let leftArrowY = 0;
let upArrowY = 0;
let rightArrowY = 0;
let bottomArrowY = 0;
let skor = 0;
let eskiSkor = 0;

function drawCanvasUI(){
        //canvas çizgileri
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(200 , 600);
    ctx.lineTo(200 , 0);
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(400 , 600);
    ctx.lineTo(400 , 0);
    ctx.stroke();
    
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(600 , 600);
    ctx.lineTo(600 , 0);
    ctx.stroke();

    // Sabit arrowlar
    let arrowLeft = new Path2D;
    arrowLeft.moveTo(30 , 510);
    arrowLeft.lineTo(80 , 460);
    arrowLeft.lineTo(80, 570);
    arrowLeft.lineTo(30, 510);
    ctx.fillStyle = "black";
    ctx.fill(arrowLeft, "evenodd")
    ctx.fillRect(80, 490,50, 50);


    let arrowMiddle = new Path2D;
    arrowMiddle.moveTo(305 , 475);
    arrowMiddle.lineTo(255, 525);
    arrowMiddle.lineTo(355, 525);
    arrowMiddle.lineTo(305, 475);
    ctx.fill(arrowMiddle,"evenodd");
    ctx.fillRect(280, 525,50, 50);

    let arrowRight = new Path2D;
    arrowRight.moveTo(570 , 510);
    arrowRight.lineTo(520 , 460);
    arrowRight.lineTo(520, 570);
    arrowRight.lineTo(570, 510);
    ctx.fill(arrowRight, "evenodd")
    ctx.fillRect(470, 490, 50, 50);

    let arrowBottom = new Path2D;
    arrowBottom.moveTo(705 , 575);
    arrowBottom.lineTo(655 , 525);
    arrowBottom.lineTo(755, 525);
    arrowBottom.lineTo(705, 575);
    ctx.fill(arrowBottom, "evenodd")
    ctx.fillRect(680, 475, 50, 50);
}
function drawArrowLeft(x, y) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y - 50);
    ctx.lineTo(x + 50, y + 50);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeRect(x + 50, y - 25, 50, 50); // Dikdörtgeni çiz
}
function drawArrowUp(x, y) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 50, y + 50);
    ctx.lineTo(x + 50, y + 50);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeRect(x-25, y+50, 50, 50); // Dikdörtgeni çiz
}

function drawArrowRight(x, y) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 50, y - 50);
    ctx.lineTo(x - 50, y + 50);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeRect(x -100, y - 25, 50, 50); // Dikdörtgeni çiz

}
function drawArrowBottom(x, y) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y - 50);
    ctx.lineTo(x - 50, y - 50);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeRect(x-25, y-100, 50, 50); // Dikdörtgeni çiz
}

function dropLeftArrow(velocity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasUI();
    leftArrowY = -40 + offsetY;
    drawArrowLeft(30, leftArrowY);
    offsetY += velocity;
    if (offsetY < maxOffsetY) {
        requestAnimationFrame(() => dropLeftArrow(velocity));
    }
}
function dropUpArrow(velocity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasUI();
    upArrowY = -40 + offsetY;
    drawArrowUp(305, upArrowY -40);
    offsetY += velocity;
    if (offsetY < maxOffsetY) {
        requestAnimationFrame(() => dropUpArrow(velocity));
    }
}
function dropRightArrow(velocity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasUI();
    rightArrowY = -40 + offsetY;
    drawArrowRight(570, rightArrowY);
    offsetY += velocity;
    if (offsetY < maxOffsetY) {
        requestAnimationFrame(() => dropRightArrow(velocity));
    }
}
function dropBottomArrow(velocity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasUI();
    bottomArrowY =  -40 + offsetY;
    drawArrowBottom(705, bottomArrowY + 60);
    offsetY += velocity;
    if (offsetY < maxOffsetY) {
        requestAnimationFrame(() => dropBottomArrow(velocity));
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Tuşa basıldığında durumu belirle
    switch (key) {
        case 'ArrowUp':
            if (upArrowY < 520 && upArrowY >= 480) {
                console.log("orta tuşa basıldı");
                skor += 10;
                playSound();

            }
            break;
        case 'ArrowRight':
            if (rightArrowY < 520 && rightArrowY >= 480) {
                console.log("sağ tışa basıldı");
                skor += 10;
                playSound();

            }
            break;
        case 'ArrowLeft':
            if (leftArrowY < 520 && leftArrowY >= 480) {
                console.log("sol tuşa basıldı");
                skor += 10;
                playSound();

            }
            break;
        case 'ArrowDown':
            if (bottomArrowY < 520 && bottomArrowY >= 480) {
                console.log("alt tuşa basıldı");
                skor += 10;
                playSound();

            }
            break;
        default:
            break;
    }
    console.log(skor);
    document.getElementById("skor").innerHTML = "Skor:" + skor;
}
);

startButton.addEventListener("click", () => {
    startButton.style.display = "none";

    // Bitir butonunu göster
    stopButton.style.display = "inline";

    gameLoopInterval = setInterval(() => startGame(15), 800); 
});

stopButton.addEventListener("click", () => {
    // Bitir butonunu gizle
    stopButton.style.display = "none";

    // Başlat butonunu göster
    startButton.style.display = "inline";

    clearInterval(gameLoopInterval);
    
    eskiSkor = skor;
    document.getElementById("eskiSkor").innerHTML = "Önceki Skor: " + eskiSkor;
    skor = 0;
    document.getElementById("skor").innerHTML = "Skor: " + skor;

    
});

function playSound() {
    var audio = document.getElementById("sound");
    audio.play();
}

function startGame(velocity) {
    // Rastgele bir pozisyon seç
    offsetY = 0;
    leftArrowY = 0;
    upArrowY = 0;
    rightArrowY = 0;
    const position = Math.floor(Math.random() * 4) + 1; 
    // Seçilen pozisyona göre ilgili düşme fonksiyonunu çağır
    switch (position) {
        case 1:
            dropLeftArrow(velocity);
            break;
        case 2:
            dropUpArrow(velocity);
            break;
        case 3:
            dropRightArrow(velocity);
            break;
        case 4:
            dropBottomArrow(velocity);
            break;
    }
}