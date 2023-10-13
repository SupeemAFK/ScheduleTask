import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.setCurrentUser();
  }
}
