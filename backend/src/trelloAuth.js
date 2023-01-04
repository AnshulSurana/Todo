import { OAuth } from 'oauth';
import config from './appConfig.js';

/**
 * Authorize Module used for getting Request and Access Token from Trello for interaction
 * @returns {{getRequestToken: (function(): Promise<unknown>), oauth: exports.OAuth, getAccessToken: (function(*=, *=, *=): Promise<unknown>)}}
 * @constructor
 */
const Authorize = () => {
  const oauth = new OAuth(config.requestURL, config.accessURL, config.appkey, config.appSecret, '1.0A', config.loginCallbackUrl, 'HMAC-SHA1');
  const getAccessToken = (token, tokenSecret, verifier) => {
    const OAuthAccessTokenPromise = new Promise((resolve, reject) => {
      oauth.getOAuthAccessToken(
        token,
        tokenSecret,
        verifier,
        (error, accessToken, accessTokenSecret, results) => {
          if (!error) {
            resolve({
              reqTokenSecret: tokenSecret,
              accessToken,
              accessTokenSecret,
            });
          } else {
            reject({ msg: 'error while fetching Access Token', error });
          }
        },
      );
    });

    return OAuthAccessTokenPromise;
  };
  const getRequestToken = () => {
    const OAuthRequestTokenPromise = new Promise((resolve, reject) => {
      oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
        if (!error) {
          resolve({
            token,
            tokenSecret,
          });
        } else {
          reject({ msg: 'error while fetching Request Token', error });
        }
      });
    });
    return OAuthRequestTokenPromise;
  };
  return {
    oauth,
    getRequestToken,
    getAccessToken,
  };
};

export default Authorize;
