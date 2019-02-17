import {Observer} from 'rxjs';
import {CellState} from './cell-state';

export class GameOfLife {

  static readonly DEFAULT_ROW_NUMBER = 30;
  static readonly DEFAULT_COLUMN_NUMBER = 30;
  private static DEFAULT_RUNNING_SPEED = 500;


  private timerId: number;
  private isRunning: boolean;
  private readonly matrix: number [][];

  observer: Observer<number[][]>;

  constructor(private rowCount: number = GameOfLife.DEFAULT_ROW_NUMBER,
              private colCount: number = GameOfLife.DEFAULT_COLUMN_NUMBER,
              observer: Observer<number[][]>) {
    if (rowCount <= 0 || colCount <= 0) {
      console.log('Rows and Cols must be superior to zero');
      return;
    }

    this.matrix = new Array<Array<number>>();
    this.observer = observer;
    this.initialize();
    this.isRunning = false;
  }


  /**
   * set running speed
   */
  static setRunningSpeed(speed: number) {
    GameOfLife.DEFAULT_RUNNING_SPEED = speed;
  }

  /**
   * notify data updated
   */
  onDataUpdated() {

    if (this.observer) {
      this.observer.next(this.matrix);
      console.log('updated');
    }
    //   this.display();
  }

  /**
   * set all cells in dead state
   */
  private initialize() {

    for (let row = 0; row < this.rowCount; row++) {
      this.matrix[row] = [];
      for (let col = 0; col < this.colCount; col++) {
        this.matrix[row][col] = CellState.DEAD;
      }
    }
    console.log(this.rowCount + ' ' + this.colCount);
    this.onDataUpdated();
  }

  /**
   * set cell(row,col) in live state
   */
  setCellLive(row: number, col: number): boolean {
    console.log(`set cell live : ${row} : ${col}`);
    if (this.isCellInTheGrid(row, col)) {
      this.matrix[row][col] = CellState.LIVE;
      this.onDataUpdated();
      return true;
    }
    return false;
  }

  /**
   * set cell(row,col) in live state
   */
  setCellState(row: number, col: number, state: CellState): boolean {
    console.log(`set cell live : ${row} : ${col}`);
    if (this.isCellInTheGrid(row, col)) {
      this.matrix[row][col] = state;
      this.onDataUpdated();
      return true;
    }
    return false;
  }


  /**
   * start running
   */
  private start() {
    if (this.isRunning) {
      return;
    }
    this.timerId = setInterval(() => this.nextStep(), GameOfLife.DEFAULT_RUNNING_SPEED);
    this.isRunning = true;
  }

  /**
   * pause running
   */
  private pause() {
    if (!this.isRunning) {
      return;
    }

    clearInterval(this.timerId);
    this.isRunning = false;

  }

  /**
   * toggle running
   */
  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }


  /**
   * re initialize grid
   */
  reset() {
    if (this.observer) {
      this.observer.complete();
    }
    this.pause();
    this.initialize();
  }

  /**
   * running step
   */
  private nextStep() {
    console.log('NEXT');

    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {

        //   1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        //    2. Any live cell with more than three live neighbours dies, as if by overcrowding.
        //    3. Any live cell with two or three live neighbours lives on to the next generation.
        const lNeighbours = this.cellLivingNeighbours(row, col);
        if (this.isLiveCell(row, col) && (lNeighbours < 2 || lNeighbours > 3)) {
          this.setCellState(row, col, CellState.DEAD);
        }

        //    4. Any dead cell with exactly three live neighbours becomes a live cell.
        if (this.isDeadCell(row, col) && lNeighbours === 3) {
          this.setCellState(row, col, CellState.LIVE);
        }
      }
    }

    //  TODO



    this.onDataUpdated();
  }

  /**
   * Number of living neighbours cells
   */
  cellLivingNeighbours(row: number, col: number): number {
    let living = 0;

    const cellsToCkecks: [number, number][] = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col + 1],
      [row + 1, col + 1],
      [row + 1, col],
      [row + 1, col - 1],
      [row, col - 1],
    ];

    for (const cell of cellsToCkecks) {
      if (this.isCellInTheGrid(cell[0], cell[1]) && this.isLiveCell(cell[0], cell[1])) {
        living++;
      }
    }


    return living;
  }

  /**
   * check if cell (row, col) is in the grid
   */
  private isCellInTheGrid(row: number, col: number): boolean {
    return row <= this.rowCount && col <= this.colCount;
  }

  /**
   * check if game is running
   */
  get isGameRunning(): boolean {
    return this.isRunning;
  }


  private isDeadCell(row: number, col: number) {
    return this.matrix[row][col] === CellState.DEAD;
  }

  private isLiveCell(row: number, col: number) {
    return this.matrix[row][col] === CellState.LIVE;
  }

}
