window.addEventListener('keypress', (e) => {
    playAudio(e);
});


document.addEventListener("DOMContentLoaded", () => {
    attachTransformEvent();
});

function attachTransformEvent() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', (e) => {
        transformKeyElement(e, key);
    }));
    keys.forEach(key => key.addEventListener('click', (e) => {
        playSoundOnClick(e);
    }))
}

function playSoundOnClick(e) {
    if(e.type != 'click') return;
    var targetElement = e.target || e.srcElement;
    if(targetElement.tagName != 'DIV'){
        targetElement = targetElement.parentElement;
    }
    playAudio(targetElement.dataset.key);
}

function transformKeyElement(e, key){
    if(e.propertyName != 'transform') return;
    key.classList.remove('playing');
}

function playAudio(e) {
    let audioElement, keyElement;
    if(e instanceof Event){
        audioElement = document.querySelector(`audio[data-key="${e.keyCode}"]`) || document.querySelector(`audio[data-key="${e.keyCode - 32}"]`);
        keyElement = document.querySelector(`div[data-key="${e.keyCode}"]`) || document.querySelector(`div[data-key="${e.keyCode - 32}"]`);
    } else if(typeof(e) === 'string') {
        audioElement = document.querySelector(`audio[data-key="${e}"]`);
        keyElement = document.querySelector(`div[data-key="${e}"]`);
    }
    keyElement.classList.add('playing');
    if(!audioElement) return;
    if (audioElement.paused) {
        audioElement.play();
    }else{
        audioElement.currentTime = 0
    }
}
