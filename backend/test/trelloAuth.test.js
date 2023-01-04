import Authorize from '../src/trelloAuth';

jest.mock('oauth', () => ({
    ...(jest.requireActual('oauth')),
    getOAuthAccessToken: (token, tokenSecret='tokenSecret', verifier, callback) => callback({},'AccessToken','AccessTokenSecret', {}),
    getOAuthRequestToken: (callback) => callback({},'AccessToken','AccessTokenSecret', {})
}))

describe('trello authorization test ', () => {
    it('should have correct instance types from a module export', async() => {
        const res = Authorize();
        console.log(res);
        expect(res.oauth).toBeInstanceOf(Object);
        expect(res.getRequestToken).toBeInstanceOf(Function);
        expect(res.getAccessToken).toBeInstanceOf(Function);
    });
    it('should resolve access token value', async() => {
        const res = Authorize();
        console.log(res);
        try {
            await res.getAccessToken();
        } catch(e) {
            console.log(e);
            expect(e.msg).toBe('error while fetching Access Token');
        }
    });
    it('should resolve request token value', async() => {
        const res = Authorize();
        console.log(res);
        try {
            await res.getRequestToken();
        } catch(e) {
            console.log(e);
            expect(e.msg).toBe('error while fetching Request Token');
        }
    });
});
