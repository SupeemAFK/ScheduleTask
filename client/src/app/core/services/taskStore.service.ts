import { Injectable, computed, inject, signal } from "@angular/core";
import { TaskAPIService } from "./api/taskAPI.service";
import { Board } from "../models/board.model";
import { Task } from "../models/task.model";
import { Storage, getMetadata, ref } from '@angular/fire/storage';
import * as moment from 'moment';


@Injectable({ providedIn: 'root' })
export class TaskStoreService {
    selectedDate = signal(new Date(new Date().setHours(0,0,0,0)));
    selectedDateFormat = computed(() => moment(this.selectedDate()).format('MMMM Do YYYY'));
    selectedDateFormatDateTimeLocal = computed(() => moment(this.selectedDate()).format('YYYY-MM-DDThh:mm'));
    isSelectedDateToday = computed(() => moment(this.selectedDate()).format('DD/MM/YYYY') == moment(new Date()).format('DD/MM/YYYY'));

    board = {} as Board;
    tasks = signal<Task[]>(this.board.tasks);
    filteredTasks = computed(() => this.tasks().filter(task => this.selectedDate().getTime() >= task.start.getTime() && this.selectedDate().getTime() <= task.end.getTime()))
    sortedTasksByStart = computed(() => this.tasks().sort((a, b) => a.start.getTime() - b.start.getTime()))

    createTaskLoading = false;
    updateTaskLoading = false;

    constructor (private taskAPIService: TaskAPIService) {}
    private storage: Storage = inject(Storage);
    
    createTask(createTaskData: { title: string, details: string, img: string, attachments: string[], links: { title: string, link: string }[], start: Date, end: Date, allDay: boolean, boardId: number }) {
        this.taskAPIService.createTask(createTaskData).subscribe(async (data: any) => {
            if (data?.data?.createTask) {
                const attachments = await Promise.all(data.data.createTask.attachments.map(async (attachment: string) => {
                    const storageRef = ref(this.storage, attachment);
                    const metadata = await getMetadata(storageRef)
                    return { name: metadata.name, download_url: attachment }
                }))  
                const newTask: Task = {
                    ...data.data.createTask,
                    attachments,
                    createdAt: new Date(data.data.createTask.createdAt),
                    start: new Date(data.data.createTask.start),
                    end: new Date(data.data.createTask.end)
                };
                this.tasks.set([...this.tasks(), newTask]);
                this.createTaskLoading = false;
            }
        });
    }

    updateTask(updateTaskData: { id: number, title: string, details: string, img: string, attachments: string[], links?: { title: string, link: string }[], start: Date, end: Date, allDay: boolean, completed: boolean }) {
        this.taskAPIService.updateTask(updateTaskData).subscribe(async (data: any) => {
            if (data?.data?.updateTask) {
                const attachments = await Promise.all(data.data.updateTask.attachments.map(async (attachment: string) => {
                    const storageRef = ref(this.storage, attachment);
                    const metadata = await getMetadata(storageRef)
                    return { name: metadata.name, download_url: attachment }
                })) 
                const updatedTask: Task = { 
                    ...data.data.updateTask, 
                    attachments,
                    createdAt: new Date(data.data.updateTask.createdAt), 
                    start: new Date(data.data.updateTask.start),
                    end: new Date(data.data.updateTask.end)
                };
                this.tasks.set(this.tasks().map(task => task.id == updateTaskData.id ? updatedTask : task));
                this.updateTaskLoading = false;
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