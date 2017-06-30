import { Trip2017Page } from './app.po';

describe('trip2017 App', function() {
  let page: Trip2017Page;

  beforeEach(() => {
    page = new Trip2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
