import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from './services/game.service';
import {Subscription} from 'rxjs';
import {CellState} from './models/cell-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'kata-game-of-life';
  matrix: number [][];
  subscription: Subscription;
  rowCount: number;
  columnCount: number;

  cellState = CellState;

  constructor(private gameService: GameService) {
    this.rowCount = 30;
    this.columnCount = 30;
  }

  ngOnInit(): void {

    this.subscription = this.gameService.matrix$.subscribe(
      (data) => {
        console.log('receved');
        this.matrix = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggle() {
    this.gameService.toggle();
  }

  stop() {
    this.gameService.stop();
  }


  start() {
    this.gameService.startGame(this.rowCount, this.columnCount);
  }

  onCellClick(row: number, col: number) {
    this.gameService.onCellClick(row, col);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
