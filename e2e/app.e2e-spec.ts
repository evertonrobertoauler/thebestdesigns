import { ThebestdesignsPage } from './app.po';

describe('thebestdesigns App', () => {
  let page: ThebestdesignsPage;

  beforeEach(() => {
    page = new ThebestdesignsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
