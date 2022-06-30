img=""
objects = []
status1=""
song=""

function preload(){
    song = loadSound("suga_boom_boom.mp3")
}

function setup(){
    canvas= createCanvas(380 , 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380 , 380)
    video.hide()
    objectDetector = ml5.objectDetector( "cocossd" , modelLoaded)
    document.getElementById("status").innerHTML= "Status = Detecting Object"

   
}

function modelLoaded(){
    console.log("Model is initialized")
    status1 = true
    
}
function gotResults(error , results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects = results
    }
}
function draw(){
    r = random(255)
    g = random(255)
    b= random(255)
    image(video , 0 , 0 , 380 ,380)
 
    if(status1 != ""){
        objectDetector.detect(video , gotResults)
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML= "Status = Object Detected "
           
            fill(r , g , b)
            percent = Math.floor(objects[i].confidence*100 )
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15)
            noFill()
            stroke(r , g , b)
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)

            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML= "Baby Found!"
                song.stop()
            }
            else{
                document.getElementById("baby_status").innerHTML= "Baby Not Found!"
                song.play()
            }
        }
    }

}