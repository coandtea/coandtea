/**
 * Composable for Sound & Haptic Feedback
 * Memberikan feedback audio dan getaran untuk UX yang lebih baik
 */

// Audio context singleton
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function useFeedback() {
  /**
   * Play success beep sound
   */
  function playSuccessSound() {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Success sound - two ascending tones
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }

  /**
   * Play error beep sound
   */
  function playErrorSound() {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Error sound - low buzz
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }

  /**
   * Play scan beep sound
   */
  function playScanSound() {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Quick beep for scan
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }

  /**
   * Trigger haptic vibration (if supported)
   * @param {string} type - 'light', 'medium', 'heavy', 'success', 'error'
   */
  function vibrate(type = 'light') {
    if (!navigator.vibrate) return;

    const patterns = {
      light: [50],
      medium: [100],
      heavy: [200],
      success: [50, 50, 100],
      error: [100, 50, 100, 50, 100],
      scan: [30],
    };

    try {
      navigator.vibrate(patterns[type] || patterns.light);
    } catch (error) {
      console.warn('Vibration not supported:', error);
    }
  }

  /**
   * Combined feedback for scan success
   */
  function scanSuccessFeedback() {
    playScanSound();
    vibrate('scan');
  }

  /**
   * Combined feedback for verification success
   */
  function verifySuccessFeedback() {
    playSuccessSound();
    vibrate('success');
  }

  /**
   * Combined feedback for error
   */
  function errorFeedback() {
    playErrorSound();
    vibrate('error');
  }

  return {
    playSuccessSound,
    playErrorSound,
    playScanSound,
    vibrate,
    scanSuccessFeedback,
    verifySuccessFeedback,
    errorFeedback,
  };
}
