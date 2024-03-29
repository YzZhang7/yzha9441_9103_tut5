# yzha9441_9103_tut5

## Major project annotation
### **Annotation for user input animation**
1. Press 'A' or 'S' to change season.
2. Hover the apples to make them rotate.
3. Choose one apple, mouse click it and press 'Z' to pick it.
4. Quickly move the mouse to toss and roll the apple. It won't fall from the tray.

**I put code for week10 quiz code in sketch.js in root directory on week 10 before due time, and in order to keep the time record, I have to set a another new document for the Creative Coding Major project. So if just clicking on "go live", it may shows the wk10 quiz. 【Please see the "YZHA9441_Creative Coding Major Project" file!】 Thank you so much!**

## Quiz 10
### **Quiz 10 sketch code in sketch.js**
![Quiz 10 sketch](/assets/sketchwk10.mp4 "quiz10")


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