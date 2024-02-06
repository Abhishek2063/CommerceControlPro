// config.js

const config = {
  localhost: {
    appUrl: process.env.NEXT_PUBLIC_LOCAL_APP_URL || "http://localhost:3001",
  },
  production: {
    appUrl:
      process.env.NEXT_PUBLIC_PROD_APP_URL || "https://commerce-control-pro.vercel.app/",
  },
};

export const getCurrentConfig = () => {
  const nodeEnv = process.env.NEXT_PUBLIC_NODE_ENV || "localhost";
  return config[nodeEnv];
};


