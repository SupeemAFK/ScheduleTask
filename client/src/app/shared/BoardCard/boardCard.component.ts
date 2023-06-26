import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';

@Component({
  imports: [RouterLink],
  selector: 'app-board-card',
  templateUrl: './boardCard.component.html',
  standalone: true,
})
export class BoardCardComponent {
  @Input() board!: Board;
}
