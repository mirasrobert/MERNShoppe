/**
 * This module will generate a public and private keypair and save to config folder directory
 *
 * Make sure to save the private key elsewhere after generated!
 * THIS MODULE ONLY WORKS ON COMMON JS
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
  });

  // Create the public key file on config folder
  fs.writeFileSync(
    path.join(__dirname, 'keys', 'id_rsa_pub.pem'),
    keyPair.publicKey
  );

  // Create the private key file on config folder
  fs.writeFileSync(
    path.join(__dirname, 'keys', 'id_rsa_priv.pem'),
    keyPair.privateKey
  );
}

// Generate the keypair -- run <node generatekeypair.js>
genKeyPair();
