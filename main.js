video="";
status="";
objects=[];

function preload() {
video=createVideo('stang.mp4');
video.hide();
}

function setup() {
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw() {
    image(video,0,0,480,380);
    if(status!="") {
        objectdetector.detect(video,gotresult);
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="status:Objects have been detected";
            document.getElementById("number_of_objects").innerHTML="The number of objects detected are:"+objects.length;

            fill("#204C99");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " +percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#204C99");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}

function start() {
objectdetector=ml5.objectDetector('cocosssd',modelLoaded);
document.getElementById("status").innerHTML="status:Detecting Objects";
}

function modelLoaded() {
    console.log("Model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);

}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects=results;

}
