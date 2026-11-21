const audio = new Audio();
let activePlayer = null;

//
function formatTime(seconds) {
   if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
   const mins = Math.floor(seconds / 60);
   const secs = Math.floor(seconds % 60);

   return mins + ":" + String(secs).padStart(2, '0');
}

function resetPlayerUI(element) {
   if (!element) return;

   element.querySelector('.play-button').textContent = '▶';
   element.querySelector('.progress-fill').style.width = '0%';
   element.querySelector('.time-display').textContent = '0:00';
}

//
document.querySelectorAll('.mini-player').forEach((element) => {
   const playButton = element.querySelector('.play-button');
   const progressTrack = element.querySelector('.progress-track');
   const progressFill = element.querySelector('.progress-fill');
   const timeDisplay = element.querySelector('.time-display');
   const src = element.dataset.src;

   playButton.addEventListener('click', () => {
      const isSameTrack = activePlayer === element;
      
      if (isSameTrack && !audio.paused) {
         audio.pause();
         playButton.textContent = '▶';

         return;
      }

      if (activePlayer && !isSameTrack) {
         audio.pause();
         resetPlayerUI(activePlayer);
      }

      if (!isSameTrack || audio.src !== new URL(src, window.location.href).href) {
         audio.src = src;
      }

      activePlayer = element;
      audio.play();
      playButton.textContent = '❚❚';
   });

   progressTrack.addEventListener('click', (e) => {
      if (activePlayer !== element || !audio.duration) return;

      const rect = progressTrack.getBoundingClientRect();
      const clickRatio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      audio.currentTime = clickRatio * audio.duration;
   });

   audio.addEventListener('timeupdate', () => {
      if (activePlayer !== element || !audio.duration) return;

      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + "%";
      timeDisplay.textContent = formatTime(audio.currentTime);
   });

   audio.addEventListener('ended', () => {
      if (activePlayer === element) {
         resetPlayerUI(element);
         activePlayer = null;
      }
   });
});