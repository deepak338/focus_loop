/* eslint-disable no-restricted-globals */
// Web Worker for accurate timing
// Handles the interval logic off the main thread to prevent throttling

let timerId: number | null = null;
let interval = 1000; // Default 1s

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'START':
      if (timerId) clearInterval(timerId);
      if (payload?.interval) interval = payload.interval;
      
      timerId = self.setInterval(() => {
        self.postMessage({ type: 'TICK' });
      }, interval);
      break;

    case 'STOP':
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      break;
      
    case 'RESET':
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      break;
  }
};

export {};
