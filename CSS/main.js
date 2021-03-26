//Variable defination

let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false, 
seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

dir="Music/";
playlist = ["bank_account", "lemonade", "leave_me_alone", "sicko_mode", "rockstar"];
title = ["Bank Account(Instrumental)", "Lemonade(Instrumental)", "Leave Me Alone(Intstrumental)", 
"SICKO MODE(Instrumental)", "Roctstar(Instrumental)"];

artists = ["(B Lou) [NC Release]", "Internet Money [NC Release]", "Finesse God [NC Release]",
 "DJ Boomin [NC Release]", "(Kiidplanet)"];
poster = ["Image/ncs0.jpg", "Image/ncs2.jpg", "Image/ncs3.jpg", "Image/ncs4.jpg", 
"Image/ncs5.jpg"]

//used to run on every browser
ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext = ".ogg"
}

//Set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimeText");
playlist_status= document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random")

playlist_index = 0;

//Audio object
audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

//First Song Title and Artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//Add Event Handling
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown", function(event){ seeking=true; 
    seeking(event); });
seekslider.addEventListener("mousemove", function(event){ seekslider(event);});
seekslider.addEventListener("mouseup", function(){ seeking = false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click", loop);
randomSong,addEventListener("click", random);