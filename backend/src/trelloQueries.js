import { parse } from 'url';
import Authorize from './trelloAuth.js';
import config from './appConfig.js';
import logger from "./logger.js";

const isEmpty = (data) => (data && data.length > 0) || (data && Object.keys(data).length > 0);
const { oauth, getRequestToken, getAccessToken } = Authorize();

/**
 * Currently to keep it simple keeping access token and secret in node memory, best practice is to use a db
 */
let tokenS; let tokenSecretS; let tokenVerifierS; let boardId; let todoListID; let doneListID;

/**
 * Login to Trello, this method extracts request token and then redirects user to trello page for login
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
export const login = async (request, response, next) => {
  try {
    const { token } = await getRequestToken();
    logger.info(`Login call authorize URL ${config.authorizeURL}`);
    response.send({
      url: `${config.authorizeURL}?oauth_token=${token}&name=${config.appName}&scope=${config.scope}&expiration=${config.expiration}`,
      token,
    });
  } catch (error) {
    logger.error(`Error ${error}`);
    next(error);
  }
};

/**
 * Callback method is called after successful login this method then fetches Access token for further calls.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const callback = async (req, res, next) => {
  logger.info(`Callback from Login  🤠`);
  const { query } = parse(req.url, true);
  const verifier = query.oauth_verifier;
  tokenVerifierS = verifier;
  try {
    const { token, tokenSecret } = await getRequestToken();
    const result = await getAccessToken(token, tokenSecret, verifier);
    const { accessToken, accessTokenSecret } = result;
    tokenS = accessToken;
    tokenSecretS = accessTokenSecret;
    await fetch('http://localhost:3000/myBoard');
    await fetch('http://localhost:3000/getBoardLists');
    res.redirect(config.callbackUrl);
  } catch (error) {
    logger.error(`Error ${error}`);
    next(error);
  }
};

/**
 * Method to fetch Boards associated to user
 * @param req
 * @param res
 * @param next
 */
export const myBoard = (req, res, next) => {
  oauth.get('https://api.trello.com/1/members/me/boards?fields=id,name,url', tokenS, tokenSecretS, (error, data, response) => {
    if (isEmpty(data)) {
      const parsedData = JSON.parse(data);
      boardId = parsedData.find((entry) => entry.name === config.boardName).id;
      logger.info(`Board Id ${boardId}`);
      res.send(boardId);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};

/**
 * Method to Fetch Board Lists, example Todo, Done
 * @param req
 * @param res
 * @param next
 */
export const getBoardLists = (req, res, next) => {
  oauth.get(`https://api.trello.com/1/boards/${boardId}/lists`, tokenS, tokenSecretS, (error, data, response) => {
    if (isEmpty(data)) {
      const parsedData = JSON.parse(data);
      todoListID = parsedData.find((entry) => entry.name === 'ToDo').id;
      logger.info(`Todo Id ${todoListID}`);
      doneListID = parsedData.find((entry) => entry.name === 'Done').id;
      logger.info(`Done Id ${doneListID}`);
      res.send(data);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};

/**
 * Method to Fetch Cards in Todo List
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const getCardsInTodoList = async (req, res, next) => {
  oauth.get(`https://api.trello.com/1/lists/${todoListID}/cards?fields=id,name`, tokenS, tokenSecretS, (error, data, response) => {
    if (data === 'invalid id') {
      next(data);
    } else if (isEmpty(data)) {
      res.send(data);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};

/**
 * Method to Fetch cards in Done List
 * @param req
 * @param res
 * @param next
 */
export const getCardsInDoneList = (req, res, next) => {
  oauth.get(`https://api.trello.com/1/lists/${doneListID}/cards?fields=id,name`, tokenS, tokenSecretS, (error, data, response) => {
    if (data === 'invalid id') {
      next(data);
    } else if (isEmpty(data)) {
      res.send(data);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};

/**
 * Method to Update card to move it to Done List on checked
 * @param req
 * @param res
 * @param next
 * @param cardId
 * @returns {Promise<void>}
 * @HTTPMethod PUT
 */
export const updateCardList = async (req, res, next, cardId) => {
  oauth.put(`https://api.trello.com/1/cards/${cardId}?idBoard=${boardId}&idList=${doneListID}`, tokenS, tokenSecretS, {}, 'application/json', (error, data, response) => {
    if (isEmpty(data)) {
      res.send(data);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};

/**
 * Method to Create a new Task card
 * @param req
 * @param res
 * @param next
 * @HTTPMethod POST
 */
export const createCardList = (req, res, next) => {
  oauth.post(`https://api.trello.com/1/cards?idList=${todoListID}`, tokenS, tokenSecretS, req.body, 'application/json', (error, data, response) => {
    if (isEmpty(data)) {
      res.send(data);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};

/**
 * Method To Delete Card from Done List
 * @param req
 * @param res
 * @param next
 * @param id
 * @HTTPMethod DELETE
 */
export const deleteCardFromDoneList = (req, res, next, id) => {
  oauth.delete(`https://api.trello.com/1/cards/${id}`, tokenS, tokenSecretS, (error, data, response) => {
    if (isEmpty(data)) {
      res.send(data);
    } else if (error) {
      logger.error(`Error ${error}`);
      next(error);
    }
  });
};
