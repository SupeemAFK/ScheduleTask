import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import * as moment from 'moment';

@Component({
  imports: [RouterLink],
  selector: 'app-board-card',
  templateUrl: './boardCard.component.html',
  standalone: true,
})
export class BoardCardComponent implements OnChanges {
  @Input() board!: Board;
  createdAt = "";

  ngOnChanges(): void {
    this.createdAt = moment(this.board.createdAt).fromNow();
  }
}
