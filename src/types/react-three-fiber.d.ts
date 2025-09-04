// Extend global JSX types for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add basic Three.js elements that React Three Fiber uses
      [elemName: string]: any;
    }
  }
}

export {};
