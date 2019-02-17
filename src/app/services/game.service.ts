import {Injectable} from '@angular/core';
import {GameOfLife} from '../models/game-of-life.model';
import {BehaviorSubject, Observable, Observer, Subject} from 'rxjs';
import {root} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: GameOfLife;

  dataObserver: Observer<number[][]> = {
    next: x => this.matrix$.next(x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };


  matrix$: Subject<number[][]> = new Subject<number[][]>();

  constructor() {
    console.log('init');
    console.log(this.matrix$);
    this.initGame();
  }

  private initGame(row: number = null, col: number = null) {
    this.game = new GameOfLife(row, col, this.dataObserver);

  }

  startGame(row: number, col: number) {
    this.game = new GameOfLife(row, col, this.dataObserver);
  }

  onCellClick(row: number, col: number) {
    this.game.setCellLive(row, col);
  }

  stop() {
    this.game.reset();
  }

  toggle() {
    this.game.toggle();
  }

  reset() {
    this.game.reset();
  }

}
