export type DeviceTier = 'full' | 'reduced' | 'fallback';

export const getDeviceTier = (): DeviceTier => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'full';
  }

  // Very narrow viewport -> lower requirement, but likely weak mobile gpu
  const isMobile = window.innerWidth < 768;

  // Use Device Memory API if available (Chrome/Edge)
  const deviceMemory = (navigator as any).deviceMemory; // in GB
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  if (deviceMemory) {
    if (deviceMemory < 4 || (isMobile && deviceMemory <= 4)) {
      return 'fallback';
    }
    if (deviceMemory < 8 || hardwareConcurrency <= 4) {
      return 'reduced';
    }
  } else {
    // Safari/Firefox fallback heuristic: assume mobile is 'reduced', older mobile is 'fallback'
    // We can check if it's iOS via userAgent
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && isMobile) {
      return 'reduced'; // iPhones are generally powerful enough for reduced
    }
    if (isMobile) {
      return 'reduced'; // assume average android
    }
  }

  return 'full';
};
