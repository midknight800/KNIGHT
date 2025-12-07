/* =========================================
   CUSTOM SCRIPTS FOR $KNIGHT
   ========================================= */

(function () {
    function initCustomScripts() {
        console.log("Custom scripts loaded...");

        // --- 1. MOBILE TAP FIX ---
        const isMobile = window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            const shortcuts = document.querySelectorAll('.shortcut');
            shortcuts.forEach(icon => {
                icon.addEventListener('click', function (e) {
                    if (this.classList.contains('inactive')) return;
                    e.preventDefault();
                    const fakeDoubleClick = new MouseEvent('dblclick', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    this.dispatchEvent(fakeDoubleClick);
                });
            });
        }

        // --- 2. COPY TO CLIPBOARD LOGIC ---
        const copyBtn = document.querySelector('.copy-ca');
        const caTextElement = document.querySelector('.about__ca span:nth-child(2)');

        if (copyBtn && caTextElement) {
            copyBtn.addEventListener('click', function () {
                const textToCopy = caTextElement.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Copy error:', err);
                });
            });
        }

        // --- 3. BACKGROUND AUDIO CONTROL (UPDATED) ---
        const volumeBtn = document.querySelector('.right-navigation__volume');
        const bgVideos = document.querySelectorAll('.page__bg video');

        if (volumeBtn && bgVideos.length > 0) {
            // Ensure visual interaction cues
            volumeBtn.style.cursor = 'pointer';
            volumeBtn.style.zIndex = '9999';

            volumeBtn.addEventListener('click', function (e) {
                // Prevent default behavior and bubbling
                e.preventDefault();
                e.stopPropagation();

                // Check state based on the CSS class we defined
                const isSoundActive = this.classList.contains('sound-active');

                if (!isSoundActive) {
                    // --- UNMUTE SEQUENCE ---

                    // 1. Update UI (CSS handles the image swap)
                    this.classList.add('sound-active');

                    // 2. Unmute and force play (to prevent browser pause)
                    bgVideos.forEach(video => {
                        video.muted = false;
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.log("Browser prevented audio playback:", error);
                            });
                        }
                    });
                    console.log('Sound Unmuted');

                } else {
                    // --- MUTE SEQUENCE ---

                    // 1. Update UI
                    this.classList.remove('sound-active');

                    // 2. Mute videos
                    bgVideos.forEach(video => {
                        video.muted = true;
                    });
                    console.log('Sound Muted');
                }
            });
        }
    }

    // Initialize scripts when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initCustomScripts, 1);
    } else {
        document.addEventListener("DOMContentLoaded", initCustomScripts);
    }
})();