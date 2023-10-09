import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { UserService } from '../../services/user.service'; 

@Component({
  imports: [CommonModule, RouterLink],
  providers: [BoardService],
  selector: 'app-layout-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
})
export class SidebarComponent {
  createBoardInput = { title: "", details: "", img: "" };
  sidebarOpen = true;
  isOpenCreateBoard = false;

  constructor (private board: BoardService, public userService: UserService) {}

  setOpenAndClose(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openCreateBoard(): void {
    this.isOpenCreateBoard = true;
  }

  closeCreateBoard(): void {
    this.isOpenCreateBoard = false;
  }

  closeCreateBoardBackground(e: any): void {
    if (e.target == e.currentTarget) this.isOpenCreateBoard = false;
  }

  onChangeInput(e: any): void {
    this.createBoardInput = {...this.createBoardInput, [e.target.name]: e.target.value};
  }

  onChangeFile(e: any): void {
    this.createBoardInput = { ...this.createBoardInput, img: URL.createObjectURL(e.target.files[0]) }
  }

  createBoard() {
    if (this.userService.currentUser != null && this.createBoardInput.title != "" && this.createBoardInput.details != "") {
      this.board.createBoard({ 
        title: this.createBoardInput.title,
        details: this.createBoardInput.details,
        img: this.createBoardInput.img,
        userId: this.userService.currentUser.id
      })
      .subscribe((data: any) => {
        if (data?.data?.createBoard && this.userService.currentUser?.boards) {
          this.userService.currentUser.boards = [...this.userService.currentUser.boards, data.data.createBoard]
        }
      })
      this.isOpenCreateBoard = false;
    } 
  }
}
