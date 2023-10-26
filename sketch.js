let song;
let barWidth=3;

function preload() {
    song = loadSound("audio/sample-visualisation.mp3");
}

function setup() {
    cnv=createCanvas(800, 800) ;
    fft=new p5.FFT(0.8,64); //set smoothing and number of bins
    song.connect(fft);
    angleMode(DEGREES);
    colorMode(HSB,360,100,100);
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
    textAlign(CENTER,CENTER);
    fill(360);
    textSize(20);
    text("Click to play or pause", 400,150);

}

//mousepress to play or stop
function mousePressed() {
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play();
    }
}