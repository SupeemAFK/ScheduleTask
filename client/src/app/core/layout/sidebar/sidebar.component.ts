import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service'; 
import { Board } from '../../models/board.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';

@Component({
  imports: [CommonModule, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ heroTrash, heroPencilSquare })],
  selector: 'app-layout-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
})
export class SidebarComponent {
  createBoardInput = { title: "", details: "" };
  updateBoardInput = { id: 0, title: "", details: "" };
  sidebarOpen = true;
  isOpenCreateBoard = false;
  isOpenEditBoard = false;
  deleteBoardModal = { id: 0, open: false }

  constructor (public userService: UserService) {}

  setOpenAndClose(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openCreateBoard(): void {
    this.isOpenCreateBoard = true;
    this.isOpenEditBoard = false;
  }

  openDeleteModal(id: number): void {
    this.deleteBoardModal = { id, open: true }
  }

  editBoard(board: Board) {
    this.updateBoardInput = { id: board.id, title: board.title, details: board.details };
    this.isOpenEditBoard = true;
    this.isOpenCreateBoard = false;
  }

  closeEditAndCreateBoard(): void {
    this.isOpenCreateBoard = false;
    this.isOpenEditBoard = false;
  }

  closeDeleteModal(): void {
    this.deleteBoardModal = { id: 0, open: false }
  }

  closeCreateBoardBackground(e: any): void {
    if (e.target == e.currentTarget) {
      this.isOpenCreateBoard = false;
      this.isOpenEditBoard = false;
    }
  }

  onChangeCreateInput(e: any): void {
    this.createBoardInput = {...this.createBoardInput, [e.target.name]: e.target.value};
  }

  onChangeUpdateInput(e: any): void {
    this.updateBoardInput = {...this.updateBoardInput, [e.target.name]: e.target.value};
  }

  createBoard() {
    if (this.createBoardInput.title != "" && this.createBoardInput.details != "") {
      this.userService.createCurrentUserBoard({
        title: this.createBoardInput.title,
        details: this.createBoardInput.details,
      })
      this.createBoardInput =  { title: "", details: "" };
      this.isOpenCreateBoard = false;
    } 
  }

  updateBoard() {
    this.userService.updateCurrentUserBoard({
      id: this.updateBoardInput.id,
      title: this.updateBoardInput.title,
      details: this.updateBoardInput.details
    })
    this.updateBoardInput = { id: 0, title: "", details: "" };
    this.isOpenEditBoard = false;
  }

  deleteBoard() {
    if (this.deleteBoardModal.id != 0) this.userService.deleteCurrentUserBoard(this.deleteBoardModal.id);
  }
}
