import { PersonalWebsitePage } from './app.po';

describe('personal-website App', function() {
  let page: PersonalWebsitePage;

  beforeEach(() => {
    page = new PersonalWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
