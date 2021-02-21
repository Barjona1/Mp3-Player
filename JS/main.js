//Variable defination

let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false, 
seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

dir="Music/";
playlist = ["bank_account", "leave_me_alone", "lemonade", "rockstar", "sicko_mode"];
title = ["Bank Account (Instrumental)", "Leave Me Alone (Instrumental)", 
"Lemonade (Instrumental)", "Rockstar (Instrumental)", "Sicko Mode (Instrumental)"];

poster = ["Image/ncs0.jpg", "Image/ncs2.jpg", "Image/ncs3.jpg", "Image/ncs4.jpg","Image/ncs5.jpg"];
artists = ["B lou", "Finesse God", "Internet Money", "Kiidplanet", "DJ Boomin"];

ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext = ".ogg";
}

//set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimeText");
playlist_status =document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

playlist_index = 0;

//Audio object
audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

//first song title and artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//add event handling
playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function(event){seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(){ seeking=false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//functions
function fetchMusicDetails(){
    //poster Image, Pause/play Image
    $("#playpausebtn img").attr("src", "Image/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("Image").attr("src", poster[playlist_index]);

    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
}

function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src", "Image/pause-red.png");
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src", "Image/play-red.png");
    }
}

function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}

function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1
    }
    fetchMusicDetails();
}

function mute(){
    if(audio.muted){
        audio.muted = false;
        $("#mutebtn img").attr("src", "Image/speaker.png");
    }else{
        audio.muted = true;
        $("#mutebtn img").attr("src", "Image/mute.png");
    }
}

function seek(event){
    if(audio.duration == 0){
        null
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seeslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

function setvolume(){
    audio.volume = volumeslider.value / 100;
}
function seektimeupdate(){
    if(audio.duration){
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0" + cursecs}
        if(dursecs < 10){ dursecs = "0" + dursecs}
        if(curmins < 10){ curmins = "0" + curmins}
        if(dursecs < 10){ dursecs = "0" + dursecs}
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML = "00"+":"+"00";
        durtimetext.innerHTML = "00"+":"+"00";
    }
}
function switchTrack(){
    if(playlist_index == (playlist.length - 1)){
        playlist_index = 0;
    }else {
        playlist_index++;
    }
    fetchMusicDetails
}

function loop(){
    if(audio.loop){
        audio.loop = false;
        $("#repeat img").attr("src", "Image/rep.png");
    }else{
        audio.loop = true;
        $("#repeat img").attr("src", "Image/rep1.png");
    }
}
