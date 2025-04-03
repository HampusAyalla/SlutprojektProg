const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let bulletSpeed = 1
let fireRate = 1

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.strokeStyle = "red"
ctx.beginPath()
ctx.arc(50,50,6,0,2*Math.PI)
ctx.stroke()


// Movement
let playerSpeed = 7.5
let xSpeed = 0
let ySpeed = 0
let xPos = 0
let yPos = 0

const size = 30

document.onkeydown = function (e){
    const key = e.key
    switch(key){
        case "w": 
            ySpeed = -playerSpeed
            break
        case "a":
            xSpeed = -playerSpeed
            break
        case "s":
            ySpeed = playerSpeed
            break
        case "d":
            xSpeed = playerSpeed
            break
        case " ":
            break
    }
}

document.onkeyup = function (e){
    const key = e.key
    switch (key) {
        case "w":
            ySpeed = 0
            break
        case "a":
            xSpeed = 0
            break
        case "s":
            ySpeed = 0
            break
        case "d":
            xSpeed = 0
            break
    }
}

document.onmousedown = function (t){
    
}

function animate() {
    ctx.clearRect(xPos,yPos, 40, 65)
    xPos += xSpeed
    yPos += ySpeed

    ctx.fillStyle = "black"
    ctx.fillRect(xPos, yPos, 40, 65)
    window.requestAnimationFrame(animate)
}
window.requestAnimationFrame(animate)
    