// src/setupTests.ts
import "@testing-library/jest-dom";

// Mock `import.meta` to avoid errors
(globalThis as any).import = {
  meta: {
    env: {
      VITE_API_URL: "http://localhost:3000",
      DEV: false,
    },
  },
};
