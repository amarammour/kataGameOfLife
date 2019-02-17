import {GameOfLife} from './game-of-life.model';
import {CellState} from './cell-state';


describe('GameOfLifeModel', () => {

  let game: GameOfLife;

  beforeEach(() => {
    game = new GameOfLife(30, 30, null);
  });

  it('should be not toggling', () => {
    expect(game.isGameRunning).toBeFalsy();
  });

  it('should toggling', () => {
    game.toggle();
    expect(game.isGameRunning).toBeTruthy();
    game.toggle();
    expect(game.isGameRunning).toBeFalsy();
  });

  it('cell should be in the grid', () => {
    expect(game.isCellInTheGrid(2, 2)).toBeTruthy();
  });

  it('cell should be out of the grid', () => {
    expect(game.isCellInTheGrid(31, 2)).toBeFalsy();
  });

  it('cell should be live', () => {
    game.setCellState(2, 2, CellState.LIVE);
    expect(game.isLiveCell(2, 2)).toBeTruthy();
  });

  it('cell should be dead', () => {
    game.setCellState(2, 2, CellState.DEAD);
    expect(game.isDeadCell(2, 2)).toBeTruthy();
  });


  afterEach(
    () => {
      game = null;
    });

});
