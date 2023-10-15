import { Injectable } from "@angular/core";
import { User } from '../models/user.model'
import { AuthService } from '@auth0/auth0-angular';
import { UserAPIService } from "./api/userAPI.service";
import { BoardAPIService } from "./api/boardAPI.service";

@Injectable({
    providedIn: "root"
})
export class UserStoreService {
    currentUser: User | null = null;
    constructor(public auth: AuthService, private userAPIService: UserAPIService, private boardAPIService: BoardAPIService) {}

    setCurrentUser() {
        this.auth.user$.subscribe(user => {
            //If it has user
            if (user?.name && user?.email && user?.picture) {
              //Get user from DB and set currentUser
              this.userAPIService.getUserByEmail(user.email).subscribe((data: any) => {
                const userData = data?.data?.getUserByEmail;
                if (userData) {
                  this.currentUser = { 
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                    avatar: userData.avatar,
                    boards: userData.boards
                  }
                }
                else if (user?.name && user?.email && user?.picture) {
                  //Create user in database backend will if it already exists or not
                  const observe = this.userAPIService.createUserOAUTH({ 
                    username: user.name.substring(0, 14), 
                    email: user.email, 
                    avatar: user.picture 
                  });
                  observe.subscribe((data: any) => {
                    const userData = data?.data?.createUser;
                    if (userData) {
                      this.currentUser = { 
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

    createCurrentUserBoard(createBoardData: { title: string, details: string, attachments: string[] }) {
      if (this.currentUser) {
        this.boardAPIService.createBoard({ 
          title: createBoardData.title,
          details: createBoardData.details,
          attachments: createBoardData.attachments,
          userId: this.currentUser.id
        })
        .subscribe((data: any) => {
          if (data?.data?.createBoard && this.currentUser?.boards) {
            this.currentUser.boards = [...this.currentUser.boards, data.data.createBoard]
          }
        })
      }
    }

    updateCurrentUserBoard(updateBoardData: { id: number, title: string, details: string, attachments: string[] }) {
      if (this.currentUser) {
        this.boardAPIService.updateBoard({ 
          id: updateBoardData.id,
          title: updateBoardData.title,
          details: updateBoardData.details,
          attachments: updateBoardData.attachments
        })
        .subscribe((data: any) => {
          if (data?.data?.updateBoard && this.currentUser?.boards) {
            this.currentUser.boards = this.currentUser.boards.map(board => board.id == updateBoardData.id ? data.data.updateBoard : board);
          }
        })
      }
    }

    deleteCurrentUserBoard(id: number) {
      if (this.currentUser) {
        this.boardAPIService.deleteBoard(id)
        .subscribe((data: any) => {
          if (data?.data?.deleteBoard && this.currentUser?.boards) {
            this.currentUser.boards = this.currentUser.boards.filter(board => board.id != id);
          }
        })
      }
    }
}