declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      DATABASE_URL: string;
      PORT: number;
      JWT_SECRET: string;
      MAIL_HOST: string;
      MAIL_PORT: number;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_FROM: string;
    }
  }
}

export {};
