(globalThis as any).importMeta = {
  env: {
    VITE_API_URL: "http://localhost", // Provide the API URL you want to use during tests
    DEV: true, // Set this to true if you want to simulate the development environment
  },
};
