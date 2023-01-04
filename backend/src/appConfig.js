const config = {
  appName: 'Todo-epilot',
  boardName: 'Epilot-Todo',
  appkey: '88e7c19debde9ad17d2353d1d1114ee8',
  appSecret: 'acc180cc152fad720e19e19f60dcbbfe9795d98e87b601b834f2681fb92c1c9b',
  callbackUrl: 'http://localhost:8080/home',
  loginCallbackUrl: 'http://localhost:3000/callback',
  requestURL: 'https://trello.com/1/OAuthGetRequestToken',
  accessURL: 'https://trello.com/1/OAuthGetAccessToken',
  authorizeURL:'https://trello.com/1/OAuthAuthorizeToken',
  scope: 'read,write',
  expiration: 'never'
};

export default config;
