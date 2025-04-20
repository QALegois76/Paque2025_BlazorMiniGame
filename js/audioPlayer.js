window.audioPlayer = {
    play: function (id) {
        const audio = document.getElementById(id);
        if (audio) {
            audio.play();
        }
    },
    pause: function (id) {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
        }
    }
};
