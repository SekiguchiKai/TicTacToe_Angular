import { TicTacToeAngularPage } from './app.po';

describe('tic-tac-toe-angular App', () => {
  let page: TicTacToeAngularPage;

  beforeEach(() => {
    page = new TicTacToeAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
