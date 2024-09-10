
export {};

declare global {
  interface Window {
    google: any;
    initMap: () => void; // Add initMap if you're using the callback method
  }
}
