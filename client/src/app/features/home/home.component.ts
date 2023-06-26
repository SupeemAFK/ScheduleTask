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
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://steamuserimages-a.akamaihd.net/ugc/941718808791563757/E414B964DEC1CA4E3D2F8C8ADCAE5C6762199FD0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://steamuserimages-a.akamaihd.net/ugc/941718808791563757/E414B964DEC1CA4E3D2F8C8ADCAE5C6762199FD0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://pm1.aminoapps.com/5702/1e9c942a6d02be7ef70bef5c67b1eea4f6a73ede_hq.jpg",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://steamuserimages-a.akamaihd.net/ugc/941718808791563757/E414B964DEC1CA4E3D2F8C8ADCAE5C6762199FD0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://steamuserimages-a.akamaihd.net/ugc/941718808791563757/E414B964DEC1CA4E3D2F8C8ADCAE5C6762199FD0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://steamuserimages-a.akamaihd.net/ugc/941718808791563757/E414B964DEC1CA4E3D2F8C8ADCAE5C6762199FD0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://steamuserimages-a.akamaihd.net/ugc/941718808791563757/E414B964DEC1CA4E3D2F8C8ADCAE5C6762199FD0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://animatebkk-online.com/wp-content/uploads/2023/05/4534530775276-1-1-768x1086.jpg",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://animatebkk-online.com/wp-content/uploads/2023/05/4534530775276-1-1-768x1086.jpg",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://animatebkk-online.com/wp-content/uploads/2023/05/4534530775276-1-1-768x1086.jpg",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    },
    {
      id: 2,
      img: "https://animatebkk-online.com/wp-content/uploads/2023/05/4534530775276-1-1-768x1086.jpg",
      title: "Eating Habits🍲🍴",
      createdAt: new Date()
    }
  ]
}
