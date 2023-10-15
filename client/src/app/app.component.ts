import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './core/services/userStore.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  constructor(private userService: UserStoreService) {}

  ngOnInit(): void {
    this.userService.setCurrentUser();
  }
}
