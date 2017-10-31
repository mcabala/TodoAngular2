import { VerizonJiraApiPage } from './app.po';

describe('verizon-jira-api App', () => {
  let page: VerizonJiraApiPage;

  beforeEach(() => {
    page = new VerizonJiraApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
