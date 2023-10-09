import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardCardComponent } from 'src/app/shared/BoardCard/boardCard.component';
import { Board } from '../../core/models/board.model'

@Component({
  imports: [CommonModule, BoardCardComponent],
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent {
  boards: Board[] = [
    {
      id: 1,
      img: "https://imgix.ranker.com/list_img_v2/12319/2752319/original/hardest-anime-training-sessions",
      title: "Exercise workout🎽🔥",
      createdAt: new Date(),
      user: {
        id: 1,
        username: "Miho",
        avatar: "https://64.media.tumblr.com/250fcdeec7efd7a1cd2536a9828c11cd/tumblr_p4vxt7vAcM1sr16b3o2_r1_1280.jpg",
      },
      tasks: []
    },
    {
      id: 1,
      img: "https://imgix.ranker.com/list_img_v2/12319/2752319/original/hardest-anime-training-sessions",
      title: "Exercise workout🎽🔥",
      createdAt: new Date(),
      user: {
        id: 1,
        username: "Miho",
        avatar: "https://64.media.tumblr.com/250fcdeec7efd7a1cd2536a9828c11cd/tumblr_p4vxt7vAcM1sr16b3o2_r1_1280.jpg",
      },
      tasks: []
    },
  ]
}
