import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  login,
  callback,
  myBoard,
  getBoardLists,
  getCardsInTodoList,
  getCardsInDoneList,
  updateCardList,
  createCardList,
  deleteCardFromDoneList,
} from './trelloQueries.js';
import logger from './logger.js';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

/*
/     Routes
*/
app.get('/health', (req, res) => {
  logger.info(`GET '/health' 🤠`);
  res.status(200).send({
    status: 200,
    code: 'OK',
    message: 'Todo service is UP.',
  });
});

app.get('/', (request, response, next) => {
  logger.info(`GET '/' 🤠`);
  response.send("<h1>Oh, hello there!</h1><a href='./login'>Login with OAuth!</a>");
});

app.get('/login', (request, response, next) => {
  logger.info(`GET '/login' 🤠`);
  login(request, response, next);
});

app.get('/callback', (request, response, next) => {
  logger.info(`GET '/callback' 🤠`);
  callback(request, response, next);
});

app.get('/myBoard', (request, response, next) => {
  logger.info(`GET '/myBoards' 🤠`);
  myBoard(request, response, next);
});

app.get('/getBoardLists', (request, response, next) => {
  logger.info(`GET '/getBoardLists' 🤠`);
  getBoardLists(request, response, next);
});
app.get('/getCardsInTodoList', (request, response, next) => {
  logger.info(`GET '/getCardsInTodoList' 🤠`);
  getCardsInTodoList(request, response, next);
});

app.get('/getCardsInDoneList', (request, response, next) => {
  logger.info(`GET '/getCardsInDoneList' 🤠`);
  getCardsInDoneList(request, response, next);
});
app.put('/markTaskAsDone', (request, response, next) => {
  logger.info(`PUT '/markTaskAsDone' 🤠`);
  const { cardId } = request.body;
  updateCardList(request, response, next, cardId);
});

app.post('/createNewTask', (request, response, next) => {
  logger.info(`POST '/createNewTask' 🤠`);
  createCardList(request, response, next);
});

app.delete('/deleteCard', (request, response, next) => {
  const { cardId } = request.body;
  logger.info(`POST '/deleteCard' 🤠`);
  deleteCardFromDoneList(request, response, next, cardId);
});

app.use((err, req, res, next) => {
  logger.error(err);
  if (err === 'invalid id') {
    res.status(403).send({
      message: err,
      code: err.code
    });
  } else {
    res.status(500).send({
      message: err,
      code: err.code
    });
  }
});

export const server = app.listen(3000, () => {
  logger.info('Server up and running...🏃🏃🏻');
  logger.info('Listening on port %s', server.address().port);
});
