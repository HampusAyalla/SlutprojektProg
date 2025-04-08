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

const bullet = {
    bulletSpeed: 1,
    direction: "left",
    appear: function(){
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.arc(50,50,6,0,2*Math.PI)
        ctx.stroke()
    },
    animate: function(){
        if (this.direction == "left"){
            
        }
    }
    
}

// Movement
let playerSpeed = 7.5
let xSpeed = 0
let ySpeed = 0
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;


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

document.onmousedown = function(){
    myInterval = setInterval( function (){    
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.arc(50,50,6,0,2*Math.PI)
    ctx.stroke()
    console.log("hej")
    },fireRate*1000)

document.onmouseup = function(){clearInterval(myInterval)}}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  xPos += xSpeed
  yPos += ySpeed

  ctx.fillStyle = "red"
  ctx.fillRect(xPos, yPos, size, size)

  window.requestAnimationFrame(animate)
}

    requestAnimationFrame(animate)

    
