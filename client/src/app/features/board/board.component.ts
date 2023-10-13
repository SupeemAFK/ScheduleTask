import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/core/layout/sidebar/sidebar.component';
import { TaskSidebarComponent } from 'src/app/core/layout/taskSidebar/taskSidebar.component';
import { CalendarComponent } from 'src/app/shared/Calendar/calendar.component';
import { SidebarTaskCardComponent } from 'src/app/shared/SidebarTaskCard/sidebarTaskCard.component';
import { CommonModule } from "@angular/common";
import { Task } from 'src/app/core/models/task.model';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import { BoardAPIService } from 'src/app/core/services/api/boardAPI.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';

@Component({
  imports: [
    CommonModule,
    SidebarComponent, 
    TaskSidebarComponent, 
    CalendarComponent, 
    SidebarTaskCardComponent
  ],
  selector: 'app-board-page',
  templateUrl: './board.component.html',
  standalone: true,
})
export class BoardComponent implements OnInit {
  constructor (
    private boardAPIService: BoardAPIService, 
    public taskService: TaskService, 
    public userService: UserService,
    private route: ActivatedRoute) 
  {}
  taskSidebarOpen = false;
  dateSelectInfo: Date = new Date();
  currentDate = moment(new Date()).format('MMMM Do YYYY');

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.boardAPIService.getBoard(id).subscribe((data: any) => {
          if (data?.data?.getBoard) {
            const board: Board = data.data.getBoard;
            const tasks: Task[] = board.tasks.map(task => ({ ...task, deadline: new Date(task.deadline), createdAt: new Date(task.createdAt) }))
            this.taskService.board = board; //Set board
            this.taskService.tasks.set(tasks); //Set task of fetched board
          }
        })
      }
    });
  }

  setTaskSidebarOpen(value: boolean) {
    this.taskSidebarOpen = value;
  }

  setDateSelectInfo(selectedDate: Date) {
    this.dateSelectInfo = selectedDate;
  }
}
