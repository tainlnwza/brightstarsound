document.addEventListener('DOMContentLoaded', () => {

    // ค้นหาเครื่องเล่นทุกอันที่มีคลาส .audio-player
    const players = document.querySelectorAll('.audio-player');

    // วนลูปเพื่อกำหนดค่าและการทำงานให้แต่ละเครื่องเล่น
    players.forEach(player => {
        // --- ค้นหา Element ภายในกรอบของเครื่องเล่นนี้เท่านั้น ---
        const audio = player.querySelector('.audio-element');
        const titleEl = player.querySelector('.track-title');
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const loopBtn = player.querySelector('.loop-btn');
        const seekSlider = player.querySelector('.seek-slider');
        const volumeSlider = player.querySelector('.volume-slider');
        const currentTimeEl = player.querySelector('.current-time');
        const totalDurationEl = player.querySelector('.total-duration');

        // --- ตั้งค่าเริ่มต้นจาก data attributes ของ HTML ---
        audio.src = player.dataset.src;
        titleEl.textContent = player.dataset.title;

        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        };

        // --- Event Listeners สำหรับเครื่องเล่นนี้ ---

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.textContent = 'หยุด';
            } else {
                audio.pause();
                playPauseBtn.textContent = 'เล่น';
            }
        });

        loopBtn.addEventListener('click', () => {
            audio.loop = !audio.loop;
            loopBtn.classList.toggle('active');
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });

        seekSlider.addEventListener('input', () => {
            audio.currentTime = seekSlider.value;
        });

        audio.addEventListener('loadedmetadata', () => {
            totalDurationEl.textContent = formatTime(audio.duration);
            seekSlider.max = audio.duration;
        });

        audio.addEventListener('timeupdate', () => {
            currentTimeEl.textContent = formatTime(audio.currentTime);
            seekSlider.value = audio.currentTime;
        });

        audio.addEventListener('ended', () => {
            if (!audio.loop) {
                playPauseBtn.textContent = 'เล่น';
                seekSlider.value = 0;
                currentTimeEl.textContent = "0:00";
            }
        });
    });
});
