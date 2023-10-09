import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './core/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      //If it has user
      if (user?.name && user?.email && user?.picture) {
        //Get user from DB and set currentUser
        this.userService.getUserByEmail(user.email).subscribe((data: any) => {
          const userData = data?.data?.getUserByEmail;
          if (userData) {
            this.userService.currentUser = { 
              id: userData.id,
              username: userData.username,
              email: userData.email,
              avatar: userData.avatar,
              boards: userData.boards
            }
          }
          else if (user?.name && user?.email && user?.picture) {
            //Create user in database backend will if it already exists or not
            const observe = this.userService.createUserOAUTH({ 
              username: user.name, 
              email: user.email, 
              avatar: user.picture 
            });
            observe.subscribe((data: any) => {
              const userData = data?.data?.createUser;
              if (userData) {
                this.userService.currentUser = { 
                  id: userData.id,
                  username: userData.username,
                  email: userData.email,
                  avatar: userData.avatar,
                  boards: userData.boards
                }
              }
            });
          }
        })
      }
    })
  }
}
