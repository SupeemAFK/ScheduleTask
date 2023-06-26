import { Component } from '@angular/core';
import { SidebarComponent } from 'src/app/core/layout/sidebar/sidebar.component';

@Component({
  imports: [SidebarComponent],
  selector: 'app-board-page',
  templateUrl: './board.component.html',
  standalone: true,
})
export class BoardComponent {

}
