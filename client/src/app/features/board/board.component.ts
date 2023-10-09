import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/core/layout/sidebar/sidebar.component';
import { TaskSidebarComponent } from 'src/app/core/layout/taskSidebar/taskSidebar.component';
import { CalendarComponent } from 'src/app/shared/Calendar/calendar.component';
import { BoardService } from 'src/app/core/services/board.service';
import { TaskCardComponent } from 'src/app/shared/TaskCard/taskCard.component';
import { SidebarTaskCardComponent } from 'src/app/shared/SidebarTaskCard/sidebarTaskCard.component';
import { CommonModule } from "@angular/common";
import { DateSelectArg } from '@fullcalendar/core';
import { Task } from 'src/app/core/models/task.model';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import * as moment from 'moment';

@Component({
  imports: [
    CommonModule,
    SidebarComponent, 
    TaskSidebarComponent, 
    CalendarComponent, 
    TaskCardComponent,
    SidebarTaskCardComponent
  ],
  providers: [BoardService],
  selector: 'app-board-page',
  templateUrl: './board.component.html',
  standalone: true,
})
export class BoardComponent implements OnInit {
  constructor (private boardService: BoardService, private route: ActivatedRoute) {}
  boardId: number = 0;
  tasks: Task[] = []
  filterTasks: Task[] = []
  dateTasks: { deadline: string, tasks: Task[] }[] = []
  taskSidebarOpen = false;
  dateSelectInfo: DateSelectArg = {  } as DateSelectArg;
  currentDate = moment(new Date()).format('MMMM Do YYYY');

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.boardId = id;

      if (id) {
        this.boardService.getBoard(id).subscribe((data: any) => {
          if (data?.data?.getBoard) {
            const board: Board = data.data.getBoard;
            const tasks: Task[] = board.tasks.map(task => ({ ...task, deadline: new Date(task.deadline), createdAt: new Date(task.createdAt) }))
            const allDates = tasks.map(task => task.deadline); //get all dates
            const sortedAllDates = allDates.sort((date1, date2) => date1.getTime() - date2.getTime()) //sort
            const allDatesNewFormat = sortedAllDates.map(date => moment(date).format('MMMM Do YYYY')); //convert format
            const dates = allDatesNewFormat.filter((item, index) => allDatesNewFormat.indexOf(item) === index); //remove duplicate
            const datesObj = dates.map(date => ({ deadline: date, tasks: [] as Task[] }));
  
            tasks.forEach((task) => {
              datesObj.forEach(dateObj => {
                if (dateObj.deadline == moment(task.deadline).format('MMMM Do YYYY')) dateObj.tasks.push(task);
              })
            })
  
            this.tasks = tasks;
            this.dateTasks = datesObj;
          }
        })
      }
    });
  }

  setTaskSidebarOpen(value: boolean) {
    this.taskSidebarOpen = value;
  }

  setDateSelectInfo(selectInfo: DateSelectArg) {
    this.dateSelectInfo = selectInfo;
    const filter = this.tasks.filter(task => moment(task.deadline).format('MMMM Do YYYY') == moment(selectInfo.start).format('MMMM Do YYYY'))
    this.filterTasks = filter;
  }

  setTaskAfterAdd(task: Task) {
    const tasks = [...this.tasks, task]
    const allDates = tasks.map(task => task.deadline); //get all dates
    const sortedAllDates = allDates.sort((date1, date2) => date1.getTime() - date2.getTime()) //sort
    const allDatesNewFormat = sortedAllDates.map(date => moment(date).format('MMMM Do YYYY')); //convert format
    const dates = allDatesNewFormat.filter((item, index) => allDatesNewFormat.indexOf(item) === index); //remove duplicate
    const datesObj = dates.map(date => ({ deadline: date, tasks: [] as Task[] }));

    tasks.forEach((task) => {
      datesObj.forEach(dateObj => {
        if (dateObj.deadline == moment(task.deadline).format('MMMM Do YYYY')) dateObj.tasks.push(task);
      })
    })

    this.tasks = tasks;
    this.dateTasks = datesObj;
    this.filterTasks = tasks.filter(task => moment(task.deadline).format('MMMM Do YYYY') == moment(this.dateSelectInfo.start).format('MMMM Do YYYY'));
  }
}
