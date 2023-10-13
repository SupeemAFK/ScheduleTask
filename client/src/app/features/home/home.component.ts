import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardCardComponent } from 'src/app/shared/BoardCard/boardCard.component';
import { Board } from '../../core/models/board.model'
import { BoardAPIService } from 'src/app/core/services/api/boardAPI.service';

@Component({
  imports: [CommonModule, BoardCardComponent],
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];
  constructor (private boardAPIService: BoardAPIService) {}

  ngOnInit() {
    this.boardAPIService.getBoards().subscribe((data: any) => {
      if (data?.data?.getBoards) this.boards = data.data.getBoards 
    })
  }
}
