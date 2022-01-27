import { fileURLToPath } from 'url';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';

const pathToKey = new URL('./keys/id_rsa_priv.pem', import.meta.url).pathname;

const FileURL = fileURLToPath('file:///' + pathToKey);

const PRIV_KEY = fs.readFileSync(FileURL, 'utf8');

const issueJWT = (user) => {
  const expiresIn = 360000; // Token expiration

  const payload = {
    // Payload to store
    user: {
      id: user.id,
    },
    iat: Date.now(),
  };

  const options = {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, options);

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

export default issueJWT;
