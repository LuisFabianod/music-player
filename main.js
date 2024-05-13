const musics = window.musics;

const audio = document.querySelector('.audio');
const pOrder = document.querySelector('.p-order');
const divImg = document.querySelector('.music-img');
const pName = document.querySelector('.music-name');
const pArtist = document.querySelector('.music-artist');
const buttonPrevious = document.querySelector('.previous')
const buttonPlayPause = document.querySelector('.play-pause')
const buttonNext = document.querySelector('.next')

buttonPrevious.addEventListener('click', previousMusic);

buttonNext.addEventListener('click', nextMusic);

buttonPlayPause.addEventListener('click', playMusic)

let currentIndex = 0;

const player = i => {
    const music = musics[i];
    currentIndex = i;
    audio.setAttribute('src', `${music.audioSrc}`)
    pOrder.innerHTML = `${i + 1} of 12`;
    divImg.setAttribute('src', `${music.imageSrc}`);
    pName.innerHTML = `${music.name}`;
    pArtist.innerHTML = `${music.artist}`;
    
}



function previousMusic () {
    if(currentIndex === 0){
        player(11)
    }else{
    currentIndex--
    player(currentIndex);
    }
    pauseMusic()
}

function nextMusic (){
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

player(0);
