window.playSimonSound = function (index) {
    const sounds = [
        '/res/sounds/btn1.mp3',
        '/res/sounds/btn2.mp3',
        '/res/sounds/btn3.mp3',
        '/res/sounds/btn4.mp3'
    ];
    const audio = new Audio(sounds[index]);
    audio.play();
};
