import { Injectable, computed, signal } from "@angular/core";
import { TaskAPIService } from "./api/taskAPI.service";
import { Board } from "../models/board.model";
import { Task } from "../models/task.model";
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class TaskService {
    board = {} as Board;
    tasks = signal<Task[]>(this.board.tasks);
    filteredTasks = (selectedDate: Date) => {
        return computed(() => this.tasks().filter(task => moment(task.deadline).format('MMMM Do YYYY') == moment(selectedDate).format('MMMM Do YYYY')))
    }
    dateTasks = computed(() => {
        const allDates = this.tasks().map(task => task.deadline); //get all dates
        const sortedAllDates = allDates.sort((date1, date2) => date1.getTime() - date2.getTime()) //sort
        const allDatesNewFormat = sortedAllDates.map(date => moment(date).format('MMMM Do YYYY')); //convert format
        const dates = allDatesNewFormat.filter((item, index) => allDatesNewFormat.indexOf(item) === index); //remove duplicate
        const datesObj = dates.map(date => ({ deadline: date, tasks: [] as Task[] }));
    
        this.tasks().forEach((task) => {
          datesObj.forEach(dateObj => {
            if (dateObj.deadline == moment(task.deadline).format('MMMM Do YYYY')) dateObj.tasks.push(task);
          })
        })
    
        return datesObj;
    });
    constructor (private taskAPIService: TaskAPIService) {}

    createTask(createTaskData: { title: string, details: string, img: string, links: { title: string, link: string }[], deadline: Date, boardId: number }) {
        this.taskAPIService.createTask(createTaskData).subscribe((data: any) => {
            if (data?.data?.createTask) {
                const newTask: Task = {
                    ...data.data.createTask,
                    createdAt: new Date(data.data.createTask.createdAt),
                    deadline: new Date(data.data.createTask.deadline)
                };
                this.tasks.set([...this.tasks(), newTask]);
            }
        });
    }

    updateTask(updateTaskData: { id: number, title: string, details: string, img: string, links?: { title: string, link: string }[], deadline: Date, completed: boolean }) {
        this.taskAPIService.updateTask(updateTaskData).subscribe((data: any) => {
            if (data?.data?.updateTask) {
                const updatedTask: Task = { 
                    ...data.data.updateTask, 
                    createdAt: new Date(data.data.updateTask.createdAt), 
                    deadline: new Date(data.data.updateTask.deadline) 
                };
                this.tasks.set(this.tasks().map(task => task.id == updateTaskData.id ? updatedTask : task));
            }
        });
    }

    deleteTask(id: number) {
        this.taskAPIService.deleteTask(id).subscribe((data: any) => {
            if (data?.data?.deleteTask) {
                this.tasks.set(this.tasks().filter(task => task.id != id));
            }
        });
    }
}