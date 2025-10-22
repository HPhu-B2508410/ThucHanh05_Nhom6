// Interactions: lightbox for infographic + keyboard-friendly video controls enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const img = document.getElementById('infographicImg');
  const openLbBtn = document.getElementById('openLightbox');
  const lightbox = document.getElementById('lightbox');
  const lbBackdrop = document.getElementById('lbBackdrop');
  const lbClose = document.getElementById('lbClose');
  const lbImage = document.getElementById('lbImage');
  const lbDownload = document.getElementById('lbDownload');

  const video = document.getElementById('heroVideo');
  const togglePlay = document.getElementById('togglePlay');

  // Safety: ensure sources exist
  if (img && openLbBtn && lightbox) {
    function openLightbox() {
      lbImage.src = img.src;
      lbImage.alt = img.alt || 'Infographic';
      lbDownload.href = img.src;
      lightbox.setAttribute('aria-hidden', 'false');
      lbClose.focus();
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      openLbBtn.focus();
    }

    openLbBtn.addEventListener('click', openLightbox);
    img.addEventListener('click', openLightbox);

    lbBackdrop.addEventListener('click', closeLightbox);
    lbClose.addEventListener('click', closeLightbox);

    // keyboard
    document.addEventListener('keydown', (e) => {
      if (lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') closeLightbox();
      }
    });
  }

  // Video controls: small enhancements for accessibility
  if (video) {
    // Toggle play/pause via the custom button
    if (togglePlay) {
      togglePlay.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
      });
    }

    // Reflect playing state in button label (simple)
    function updateToggle() {
      if (!togglePlay) return;
      togglePlay.textContent = video.paused ? '▶' : '❚❚';
      togglePlay.setAttribute('aria-pressed', String(!video.paused));
    }
    video.addEventListener('play', updateToggle);
    video.addEventListener('pause', updateToggle);
    updateToggle();

    // Keyboard shortcuts when video focused
    video.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (video.paused) video.play(); else video.pause();
      }
      if (e.key === 'ArrowRight') {
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
      }
      if (e.key === 'ArrowLeft') {
        video.currentTime = Math.max(0, video.currentTime - 5);
      }
    });

    // Provide a visual focus ring for keyboard users
    video.addEventListener('focus', () => video.style.outline = '3px solid rgba(0,209,255,0.22)');
    video.addEventListener('blur', () => video.style.outline = '');

    // If network error on video, log and show hint
    video.addEventListener('error', () => {
      console.warn('Không thể tải video. Kiểm tra docs/assets/video.mp4 hoặc định dạng file.');
    });
  }
});