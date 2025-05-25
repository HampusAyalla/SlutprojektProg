const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 526

const gravity = 0.25

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const platformImage = createImage('./img/platform.png')
const backgroundImage = createImage('./img/background.png')
const hillsImage = createImage('./img/hills.png')

platformImage.onload = () => {
    const player = new Player()

    const platforms = [
        new Platform({ x: -1, y: 410, image: platformImage }),
        new Platform({ x: platformImage.width - 3, y: 410, image: platformImage })
    ]

    const genericObject = [
        new GenericObject({
            x: -1,
            y: -1,
            image: backgroundImage
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: hillsImage
        })
    ]


    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
        up: {
            pressed: false
        },
        down: {
            pressed: false
        }
    }

    let scrollOffset = 0

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        genericObject.forEach(genericObject => {
            genericObject.draw()
        })

        platforms.forEach(platform => {
            platform.draw()
        })

        player.update()

        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = 5
        } else if (keys.left.pressed && player.position.x > 100) {
            player.velocity.x = -5
        } else {
            player.velocity.x = 0
            if (keys.right.pressed) {
                scrollOffset += 5
                platforms.forEach(platform => {
                    platform.position.x -= 5
                })
                genericObject.forEach(genericObject => {
                    genericObject.position.x -= 3
                })
            } else if (keys.left.pressed) {
                scrollOffset -= 5
                platforms.forEach(platform => {
                    platform.position.x += 5
                })
                genericObject.forEach(genericObject => {
                    genericObject.position.x += 3
                })
            }
        }

        platforms.forEach(platform => {
            if (
                player.position.y + player.height <= platform.position.y &&
                player.position.y + player.height + player.velocity.y >= platform.position.y &&
                player.position.x + player.width >= platform.position.x &&
                player.position.x <= platform.position.x + platform.width
            ) {
                player.velocity.y = 0
            }
        })

        if (scrollOffset > 2000)
            console.log("You Win")
    }

    animate()

    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                keys.left.pressed = true
                break
            case 68:
                keys.right.pressed = true
                break
            case 87:
                player.velocity.y -= 7.5
                keys.up.pressed = true
                break
            case 83:
                player.height = 20
                keys.down.pressed = true
                break
        }
    })

    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                keys.left.pressed = false
                break
            case 68:
                keys.right.pressed = false
                break
            case 87:
                player.velocity.y -= 1
                keys.up.pressed = false
                break
            case 83:
                player.height = 30
                player.position.y += 10
                keys.down.pressed = false
                break
        }
    })
}
