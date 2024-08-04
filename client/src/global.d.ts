// src/global.d.ts

interface ImportMetaEnv {
  VITE_API_URL: string;
  DEV: boolean;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

declare var importMeta: ImportMeta;
