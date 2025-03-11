declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      DATABASE_URL: string;
      PORT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
