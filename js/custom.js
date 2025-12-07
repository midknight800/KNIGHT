/* =========================================
   CUSTOM SCRIPTS FOR $KNIGHT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // --- 1. MOBILE TAP FIX (Translate Tap to DoubleClick) ---
    // Detects mobile devices to allow opening icons with a single tap
    const isMobile = window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        const shortcuts = document.querySelectorAll('.shortcut');

        shortcuts.forEach(icon => {
            icon.addEventListener('click', function (e) {
                // If it's an inactive icon (tooltip), don't trigger double click
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
    // Handles the Contract Address copy button and visual feedback
    const copyBtn = document.querySelector('.copy-ca');
    const caTextElement = document.querySelector('.about__ca span:nth-child(2)');

    if (copyBtn && caTextElement) {
        copyBtn.addEventListener('click', function () {
            const textToCopy = caTextElement.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Add class to show "Copied!" message
                copyBtn.classList.add('copied');

                // Remove message after 2 seconds
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Copy error:', err);
            });
        });
    }
});