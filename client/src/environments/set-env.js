const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = './src/environments/environment.ts';
  require('dotenv').config({
    path: 'src/environments/.env'
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    apiUrl: '${process.env.API_URL}',
    auth0_domain: '${process.env.AUTH0_DOMAIN}',
    auth0_clientId: '${process.env.AUTH0_CLIENT_ID}',
    apiKey: '${process.env.API_KEY}',
    authDomain: '${process.env.AUTH_DOMAIN}',
    projectId: '${process.env.PROJECT_ID}',
    storageBucket: '${process.env.STORAGE_BUCKET}',
    messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
    appId: '${process.env.APP_ID}',
    measurementId: '${process.env.MEASUREMENT_ID}'
    production: true,
  };
  `;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
}

setEnv();