# yzha9441_9103_tut5


## Quiz 10
let song
let barWidth=3

function preload() {
    song = loadSound("assets/sample-visualisation.mp3");
}

function setup() {
    cnv=createCanvas(800, 800) 
    fft=new p5.FFT(0.8,64) //set smoothing and number of bins
    song.connect(fft);
    angleMode(DEGREES)
    colorMode(HSB,360,100,100)
}

function draw() {
    background(0);
    let spectrum=fft.analyze()   //Request fresh data from the FFT analysis


    for (let i=0; i<spectrum.length; i++) {

        push()

        //move to the center of canvas
        translate(width/2, height/2)

        //i[0,spectrumlength] angle from 360-0
        rotate(180+map(i, 0, spectrum.length, 360, 0))

        //set ranges
        let wid = map(spectrum[i],0,255, 10,250) 
       
        //set the rainbow colour HSB O to 360
        let col = map(i,0,spectrum.length, 0,360) 
        fill(col,100,100)
        noStroke()

        //draw inner rectangles
        rect(width*0.05,-barWidth/2, wid,barWidth)

        //draw outside circles
        ellipse(width*0.05+barWidth+wid,0, barWidth,barWidth)
       
        pop()
    }


  //add texts
    textAlign(CENTER,CENTER)
    fill(360)
    textSize(20)
    text("Click to play or pause", 400,150);

}

//mousepress to play or stop
function mousePressed() {
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play()
    }
}

### **Part 1. Imaging Technique Inspiration**
As the following reference images, I utilized gradient stripes of varying densities to compose and differentiate between different planar graphics within the frame, achieving a distinction of shapes as well as foreground shapes and background. I take the following elements as reference into my project: gradient Stripes, the density of the stripes, and the arrangement of line segments tails on the curve.
![Reference images 2 ](/assets/refima1.jpg "refima1")
## Quiz 8

### **Part 1. Imaging Technique Inspiration**
As the following reference images, I utilized gradient stripes of varying densities to compose and differentiate between different planar graphics within the frame, achieving a distinction of shapes as well as foreground shapes and background. I take the following elements as reference into my project: gradient Stripes, the density of the stripes, and the arrangement of line segments tails on the curve.
![Reference images 2 ](/assets/refima1.jpg "refima1")

I believe that this approach can enhance the layering and distinction between foreground and background in 2D planar artistic work. Adding a wave animation effect to some of the stripes can enhance the interactivity of the frame. The final effect is roughly as shown in the image below.
![Reference images 2 ](/assets/refima2.jpg "refima2")


### **Part 2. Coding Technique Exploration**
The main coding techniques are referenced from these two links: \
Reference Link 1: https://openprocessing.org/sketch/1914365 \
Reference Link 2: https://openprocessing.org/sketch/1532031  

How they help to achieve the desired effect:
1.	blendMode(), use 'add' blend mode to achieve the effect of line superposition.
2.	The noise function to generate Perlin Noise and draw a pulse wave.
3.	Using 'plus+' to change the position of the waveform line, creating an animated effect.
4.	drawingContext.createLinearGradient() creates a linear gradient effect for the line, and shadowColor and shadowOffset are used to add shadow and offset effects to the line segments.  

Here are the images of the two example codes:\
![Reference images 2 ](/assets/code1.jpg "code1")\
![Reference images 2 ](/assets/code2.jpg "code2")