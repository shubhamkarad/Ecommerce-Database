const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const CryptoJS = require('crypto-js');
const fs = require('fs');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


const encryptPass=(password)=>{
  const passPhrase='1234';
  return CryptoJS.AES.encrypt(password,passPhrase).toString();
};

const decryptPass=(ciphertext)=>{
  const passPhrase='1234';
  const bytes=CryptoJS.AES.decrypt(ciphertext,passPhrase);
  const originalText=bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
 function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '1h';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}
module.exports.decryptPass = decryptPass;
module.exports.encryptPass = encryptPass;
module.exports.issueJWT = issueJWT;