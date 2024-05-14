const musics = window.musics;

const audio = document.querySelector('.audio');
const pOrder = document.querySelector('.p-order');
const divImg = document.querySelector('.music-img');
const pName = document.querySelector('.music-name');
const pArtist = document.querySelector('.music-artist');
const buttonPrevious = document.querySelector('.previous')
const buttonPlayPause = document.querySelector('.play-pause')
const buttonNext = document.querySelector('.next')

const inputMusicTime = document.querySelector('.seekbar-music-time')
const pMusicCurrent = document.querySelector('.music-current')
const pMusicEnd = document.querySelector('.music-end')

const inputVolume = document.querySelector('.seekbar-volume')
const volumeImg = document.querySelector('.volume-icon')


buttonPrevious.addEventListener('click', previousMusic);

buttonNext.addEventListener('click', nextMusic);

buttonPlayPause.addEventListener('click', playMusic);

inputMusicTime.addEventListener('input', inputTimeUpdate);

inputVolume.addEventListener('input', volumeChange);

let currentIndex = 0;

const player = i => {
    const music = musics[i];
    currentIndex = i;
    audio.setAttribute('src', `${music.audioSrc}`)
    pOrder.innerHTML = `${i + 1} of 12`;
    divImg.setAttribute('src', `${music.imageSrc}`);
    pName.innerHTML = `${music.name}`;
    pArtist.innerHTML = `${music.artist}`;
    audio.onloadeddata = () => {
    inputMusicTime.max = audio.duration;
    pMusicEnd.innerHTML= `${secondsToMinutes(audio.duration)}`;
    audio.ontimeupdate = timeUpdate;
}
}



function previousMusic () {
    inputMusicTime.value ='0';
    pMusicCurrent.innerHTML = '00:00';
    inputVolume.value = '20';
    if(currentIndex === 0){
        player(11)
    }else{
    currentIndex--
    player(currentIndex);
    }
    pauseMusic()
}

function nextMusic (){
    inputMusicTime.value ='0';
    pMusicCurrent.innerHTML = '00:00';
    inputVolume.value = '20';
    if(currentIndex === musics.length - 1){
        player(0)
    }else{
    currentIndex++
    player(currentIndex);
    }
    pauseMusic()
}

function playMusic () {
    audio.play();
    buttonPlayPause.setAttribute('src', './images/pause.png');
    buttonPlayPause.removeEventListener('click', playMusic)
    buttonPlayPause.addEventListener('click', pauseMusic)

    divImg.style.animation = 'Spin 10s linear infinite';
    
};

function pauseMusic () {
    audio.pause();
    buttonPlayPause.setAttribute('src', './images/play.png');
    buttonPlayPause.removeEventListener('click', pauseMusic)
    buttonPlayPause.addEventListener('click', playMusic)

    divImg.style.animation = '' ;
};

function timeUpdate(){
    pMusicCurrent.innerHTML = secondsToMinutes(audio.currentTime);
    inputMusicTime.value = audio.currentTime;
    if(audio.currentTime === audio.duration) nextMusic();
}

function inputTimeUpdate(){
    audio.currentTime = inputMusicTime.value; 
    pMusicCurrent.innerHTML = secondsToMinutes(audio.currentTime);
}

function volumeChange() {
    audio.volume = inputVolume.value / 100;
    if (audio.volume === 0) volumeImg.setAttribute('src', './images/mute.png');
    if(audio.volume !== 0) volumeImg.setAttribute('src', './images/volume-up.png');
    
};

function secondsToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
}
player(0);
