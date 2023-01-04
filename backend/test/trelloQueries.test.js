import {
    login,
    callback,
    myBoard,
    getBoardLists,
    getCardsInTodoList,
    getCardsInDoneList,
    updateCardList, createCardList, deleteCardFromDoneList
} from '../src/trelloQueries';

const mockRequest = (sessionData) => {
    return {
        session: { data: sessionData },
        url: 'https://url'
    };
};

const mockResponse = () => {
    const res = {};
    res.status = () => res;
    res.json = () => res;
    res.redirect = (data) => {
        console.log(data);
        expect(data).toBeTruthy();
        return data;
    }
    res.send = (data) => {
        console.log(data);
        expect(data).toBeTruthy();
        return data;
    }
    return res;
};

const mockNext = (value) => {
    expect(value).toBeTruthy();
};
jest.mock('../src/TrelloAuth', () => ({
    __esModule: true,
    default: () => ({
        oauth: ({
            get: (url, token, tokenSecret, callback) => callback({}, JSON.stringify([{
                'id': '123', 'name': 'Epilot-Todo'},
                {'id': '123', 'name': 'ToDo'},
                {'id': '123', 'name': 'Done'}
            ]), {}),
            put: (url, token, tokenSecret, body, type, callback) => callback({}, JSON.stringify([{
                'id': '123', 'name': 'Todo'}]), {}),
            post: (url, token, tokenSecret, body, type, callback) => callback({}, JSON.stringify([{
                'id': '123', 'name': 'Epilot'}]), {}),
            delete: (url, token, tokenSecret, callback) => callback({}, JSON.stringify([{
                'id': '123', 'name': 'done'}]), {})
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
global.fetch = jest.fn(() =>
    Promise.resolve({
        data: {},
    })
);
describe('trello queries test ', () => {
    it('should test login method', async() => {
        const res = await login(mockRequest(), mockResponse(), mockNext);
    });
    it('should test callback method', async() => {
        const res = await callback(mockRequest(), mockResponse(), mockNext);
        expect(fetch).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenNthCalledWith(1, 'http://localhost:3000/myBoard');
        expect(fetch).toHaveBeenNthCalledWith(2, 'http://localhost:3000/getBoardLists');
    });
    it('should test other methods', async() => {
        await myBoard(mockRequest(), mockResponse(), mockNext);
        await getBoardLists(mockRequest(), mockResponse(), mockNext);
        await getCardsInTodoList(mockRequest(), mockResponse(), mockNext);
        await getCardsInDoneList(mockRequest(), mockResponse(), mockNext);
        await updateCardList(mockRequest(), mockResponse(), '123');
        await createCardList(mockRequest(), mockResponse(), mockNext);
        await deleteCardFromDoneList(mockRequest(), mockResponse(), '123');
    });
});
