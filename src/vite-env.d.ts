/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYLOAD_URL?: string;
  readonly VITE_CMS_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
