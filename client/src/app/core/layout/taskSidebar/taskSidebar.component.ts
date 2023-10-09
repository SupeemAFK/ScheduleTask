import { Component, EventEmitter, Output, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarTaskCardComponent } from 'src/app/shared/SidebarTaskCard/sidebarTaskCard.component';
import { DateSelectArg } from '@fullcalendar/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import * as moment from 'moment';

@Component({
    imports: [SidebarTaskCardComponent, CommonModule],
    providers: [TaskService],
    selector: 'app-layout-task-sidebar',
    templateUrl: './taskSidebar.component.html',
    standalone: true,
})
export class TaskSidebarComponent implements OnChanges {
    createTaskInput = { title: "", details: "", img: { url: "", file: { } as File  } }
    createLinkInput = { title: "", link: "" }
    links: { title: string, link: string }[] = []
    isOpenCreateTask = false;
    @Input() boardId: number = 0;
    @Input() tasks: Task[] = []
    @Input() taskSidebarOpen = false;
    @Input() dateSelectInfodateSelectInfo: DateSelectArg = { } as DateSelectArg;
    @Output() taskSidebarOpenEvent = new EventEmitter<boolean>();
    @Output() addTaskEvent = new EventEmitter<Task>();
    deadline = moment(this.dateSelectInfodateSelectInfo.start).format('MMMM Do YYYY');
    
    private storage: Storage = inject(Storage);
    constructor(private tasksService: TaskService) {}

    ngOnChanges() {
        this.deadline = moment(this.dateSelectInfodateSelectInfo.start).format('MMMM Do YYYY');
    }

    setOpenAndClose() {
        this.taskSidebarOpenEvent.emit(!this.taskSidebarOpen);
    }

    createLink() {
        this.links = [...this.links, this.createLinkInput]
        this.createLinkInput = { title: "", link: "" }
    }

    async createTask() {
        if (this.dateSelectInfodateSelectInfo.start) {
            let url = ""
            if (this.createTaskInput.img.url) {
                const storageRef = ref(this.storage, this.createTaskInput.img.file.name);
                const data = await uploadBytesResumable(storageRef, this.createTaskInput.img.file);
                url = await getDownloadURL(data.ref); 
            }

            const createTask = { 
                title: this.createTaskInput.title,
                details: this.createTaskInput.details,
                img: url,
                links: this.links, 
                deadline: this.dateSelectInfodateSelectInfo.start, 
                boardId: this.boardId,
            }
            
            this.tasksService.createTask(createTask).subscribe((data: any) => {
                const task: Task = data.data.createTask;
                const calendarApi = this.dateSelectInfodateSelectInfo.view.calendar;
                calendarApi.addEvent({
                    title: this.createTaskInput.title,
                    start: this.dateSelectInfodateSelectInfo.startStr,
                })
                this.addTaskEvent.emit({ ...task, deadline: new Date(task.deadline), createdAt: new Date(task.createdAt) })
                this.createTaskInput = { title: "", details: "", img: { url: "", file: { } as File  } }
                this.createLinkInput = { title: "", link: "" }
                this.links = []
            })
        }
    }

    onChangeInput(e: any) {
        this.createTaskInput = { ...this.createTaskInput, [e.target.name]: e.target.value }
    }

    onChangeInputLink(e: any) {
        this.createLinkInput = { ...this.createLinkInput, [e.target.name]: e.target.value}
    }

    onChangeFile(e: any) {
        //1048576 = 1Mb
        if(e.target.files[0].size <= 1048576){
            this.createTaskInput = { ...this.createTaskInput, img: { url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] } }
        }
        else {
            alert("File is too big! over 1 Mb");
        }
    }

    closeCreateTaskBackground(e: any) {
        if (e.target == e.currentTarget) this.isOpenCreateTask = false;
    }

    closeCreateTask() {
        this.isOpenCreateTask = false;
    }

    openCreateTask() {
        this.isOpenCreateTask = true;
    }
}