import { Strategy as JwtStrategy } from 'passport-jwt'; // Type of passport strategy
import { ExtractJwt } from 'passport-jwt'; // Extract the jwt from http header

import fs from 'fs';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

/* Get the key for JWT Secret key
 * If key is not present then, run the generatekeypair.js on utils folder
 * PUB_KEY is for verification and PRIV_KEY is for JWT issuing.
 */

const pathToKey = new URL('../utils/keys/id_rsa_pub.pem', import.meta.url)
  .pathname;

const FileURL = fileURLToPath('file:///' + pathToKey);

const PUB_KEY = fs.readFileSync(FileURL, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.user.id }).select(
      '-password'
    );

    // if there is no user
    // No Errors but no user
    if (!user) {
      return done(null, false);
    }

    // No errors and have user
    done(null, user);
  } catch (error) {
    console.error(error.message);

    done(error, null); // Error
  }
});

const passportConfig = (passport) => {
  passport.use(strategy);
};

export default passportConfig;
