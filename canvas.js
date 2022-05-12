let canvas = document.querySelector('canvas')
    
canvas.height = window.innerHeight
canvas.width = window.innerWidth

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    init()
})

let c = canvas.getContext('2d')

// Rectangle
// c.fillStyle = 'rgba(255,0,0,0.5)'
// c.fillRect(100, 100, 100, 100)
// --------------------------------------

// // Line
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.lineTo(50, 400)
// c.closePath()
// c.strokeStyle = "blue"
// c.stroke()
// ---------------------------------------

// Arc
// c.beginPath()
// c.arc(300, 300, 50, 0, Math.PI *2, true)
// c.strokeStyle = "blue"
// c.stroke()
// ---------------------------------------

// Circles
// for(let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth
//     let y = Math.random() * window.innerHeight
//     let colors = ["red", "green", "blue", "yellow"]
//     c.beginPath()
//     c.arc(x, y, 30,  0, Math.PI *2, true)
//     c.strokeStyle = colors[Math.floor(Math.random() * 4)] 
//     c.stroke()
// }
// ----------------------------------------

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})

let maxRadius = 50

let colorArray = [
    '#7FDBFF',
    '#39CCCC',
    '#0074D9',
    '#F012BE',
    // '#85144b',
    '#B10DC9'
    // '#FF4136',
    // '#001f3f',
    // '#FF851B',
    // '#FFDC00',
    // '#3D9970',
    // '#2ECC40',
    // '#01FF70'
]



class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x 
        this.y = y 
        this.dx = dx
        this.dy = dy
        this.radius = radius 
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)] 
        this.minRadius = radius
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, true)
        c.strokeStyle = this.color
        c.fillStyle = this.color
        c.stroke()
        c.fill()
    }

    update() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
        {
            this.dx = -this.dx
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
        {
            this.dy = -this.dy
        }
        
        this.x += this.dx
        this.y += this.dy  

        if((Math.abs(mouse.x - this.x) < 50) && (Math.abs(mouse.y - this.y) < 50) && (this.radius < maxRadius))
        {
            this.radius += 1
        } else if(this.radius > this.minRadius) {
            this.radius -= 1
        }
        
        this.draw()
    }
}




let circleArray = []

function init() {

    circleArray = []
    for(let i = 0; i < 1000 ; i++)
    {
        let radius = (Math.random() * 3) + 1
        let x = Math.random() * (innerWidth - radius*2) + radius
        let y = Math.random() * (innerHeight - radius*2) + radius
        let dx = (Math.random() - 0.5) 
        let dy = (Math.random() - 0.5) 
    
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

const animate = () => {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for(let i = 0; i < circleArray.length; i++)
    {
        circleArray[i].update()
    }
}

init()
animate()