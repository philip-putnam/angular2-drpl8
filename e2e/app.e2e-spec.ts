import { Angular2Drpl8Page } from './app.po';

describe('angular2-drpl8 App', () => {
  let page: Angular2Drpl8Page;

  beforeEach(() => {
    page = new Angular2Drpl8Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
