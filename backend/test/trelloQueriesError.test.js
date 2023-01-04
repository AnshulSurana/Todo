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
        url: 'https://url-some-mock-url'
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

const mockNext = jest.fn();
jest.mock('../src/TrelloAuth', () => ({
    __esModule: true,
    default: () => ({
        oauth: ({
            get: (url, token, tokenSecret, callback) => callback({error: 'error'}, undefined, {}),
            put: (url, token, tokenSecret, body, type, callback) => callback({error: 'error'}, {}, {}),
            post: (url, token, tokenSecret, body, type, callback) => callback({error: 'error'}, {}, {}),
            delete: (url, token, tokenSecret, callback) => callback({error: 'error'}, {}, {})
        }),
        getRequestToken: () => Promise.reject(),
        getAccessToken: () => Promise.reject()
    }),
}));
global.fetch = jest.fn(() => Promise.resolve({data: {}}));
describe('trello queries test ', () => {
    it('should test errors from  methods', async() => {
        await login(mockRequest(), mockResponse(), mockNext);
        await callback(mockRequest(), mockResponse(), mockNext);
        await myBoard(mockRequest(), mockResponse(), mockNext);
        await getBoardLists(mockRequest(), mockResponse(), mockNext);
        await getCardsInTodoList(mockRequest(), mockResponse(), mockNext);
        await getCardsInDoneList(mockRequest(), mockResponse(), mockNext);
        await updateCardList(mockRequest(), mockResponse(), mockNext,'123');
        await createCardList(mockRequest(), mockResponse(), mockNext);
        await deleteCardFromDoneList(mockRequest(), mockResponse(), mockNext, '123');
    });
});
