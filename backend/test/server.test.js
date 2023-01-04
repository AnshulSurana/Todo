import request from "supertest";
import dotenv from "dotenv";
import { server } from '../src/server';

dotenv.config();

jest.mock('../src/TrelloAuth', () => ({
    __esModule: true,
    default: () => ({
        oauth: ({
            get: (url, token, tokenSecret, callback) => callback({}, JSON.stringify([
                {'id': '123', 'name': 'Epilot-Todo'},
                {'id': '123', 'name': 'ToDo'},
                {'id': '123', 'name': 'Done'}
            ]), {}),
            put: (url, token, tokenSecret, body, type, callback) => callback({}, JSON.stringify([{
                'id': '123', 'name': 'Todo'}]), {}),
            post: (url, token, tokenSecret, body, type, callback) => callback({}, JSON.stringify([{
                'id': '123', 'name': 'Epilot'}]), {}),
            delete: (url, token, tokenSecret, callback) => callback({}, {'error': 'Gateway Timeout'}, {})
        }),
        getRequestToken: () => ({
            token: 'token1',
            tokenSecret: 'tokenSecret1'
        }),
        getAccessToken: () => ({
            accessToken: 'accessToken',
            accessTokenSecret: 'accessTokenSecret'
        })
    }),
}));
describe('Node-express service', () => {
    it('should initialise express server and try to login', async() => {
        console.log(server.address().port);
        expect(server.address().port).toBe(3000);
        const res = await request(server).get("/login");
        expect(res.statusCode).toBe(200);
        expect(typeof(res.text)).toBe('string');
    });
    it('should check health endpoint', async() => {
        const res = await request(server).get("/health");
        expect(res.statusCode).toBe(200);
    });
    it('should check default server endpoint', async() => {
        const res = await request(server).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe( "<h1>Oh, hello there!</h1><a href='./login'>Login with OAuth!</a>");
    });
    it('should check callback call server endpoint', async() => {
        const res = await request(server).get("/callback");
        expect(res.statusCode).toBe(302);
        expect(res.redirect).toBe(true);
    });
    it('should check default myBoard endpoint', async() => {
        const res = await request(server).get("/myBoard");
        expect(res.statusCode).toBe(200);
        expect(res.redirect).toBe(false);
    });
    it('should check default getBoardList endpoint', async() => {
        const res = await request(server).get("/getBoardLists");
        expect(res.statusCode).toBe(200);
        expect(res.redirect).toBe(false);
    });
    it('should get response getCardsInTodoList endpoint', async() => {
        const res = await request(server).get("/getCardsInTodoList");
        expect(res.statusCode).toBe(200);
    });
    it('should get response getCardsInDoneList endpoint', async() => {
        const res = await request(server).get("/getCardsInDoneList");
        expect(res.statusCode).toBe(200);

    });
    it('should test PUT request to mark task as done ', async() => {
        const res = await request(server).put("/markTaskAsDone").send({
            cardId: '63b04d1f1e63b200362b2c5'
        });
        expect(res.statusCode).toBe(200);
    });
    it('should test POST request to create new Task ', async() => {
        const res = await request(server).post("/createNewTask").send({
            name: 'new task'
        });
        expect(res.statusCode).toBe(200);
    });
    it('should test DELETE request to delete Task ', async () => {
        const res = await request(server).delete("/deleteCard").send({
            cardId: '63b04d1f1e63b200362b2c5'
        });
        expect(res.statusCode).toBe(200);
    });
    it('should test error on PUT request to delete Task ', async () => {
        const result = await request(server).delete("/deleteCard").send({
            cardId: '63b04d1f1e63b200362b278'
        });
        expect(result.text).toEqual("{\"error\":\"Gateway Timeout\"}");
    });
});
