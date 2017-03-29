import { MyFirstChatAppPage } from './app.po';

describe('my-first-chat-app App', () => {
  let page: MyFirstChatAppPage;

  beforeEach(() => {
    page = new MyFirstChatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
