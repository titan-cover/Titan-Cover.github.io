document.addEventListener('DOMContentLoaded', () => {
  const ANIMATION_STEPS = 50;
  const FRAME_DURATION = 40; // milliseconds

  document.querySelectorAll('[data-target]').forEach((el) => {
    const targetValue = parseInt(el.dataset.target, 10);
    
    // Validate the target value
    if (isNaN(targetValue) || targetValue < 0) {
      console.warn('Invalid data-target on element:', el);
      return;
    }

    let currentValue = 0;
    let lastFrameTime = performance.now();
    const increment = Math.ceil(targetValue / ANIMATION_STEPS);
    let animationId = null;

    const animate = (currentTime) => {
      // Control frame rate with FRAME_DURATION
      if (currentTime - lastFrameTime >= FRAME_DURATION) {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          el.textContent = currentValue + '+';
          return; // Stop animation
        }
        
        el.textContent = currentValue + '+';
        lastFrameTime = currentTime;
      }

      // Continue animation
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup: cancel animation if element is removed from DOM
    const observer = new MutationObserver(() => {
      if (!document.contains(el)) {
        cancelAnimationFrame(animationId);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
});
