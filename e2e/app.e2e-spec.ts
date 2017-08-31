import { TtxAngularCliPage } from './app.po';

describe('ttx-angular-cli App', () => {
  let page: TtxAngularCliPage;

  beforeEach(() => {
    page = new TtxAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
