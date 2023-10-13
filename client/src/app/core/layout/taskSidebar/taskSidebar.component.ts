import { Component, EventEmitter, Output, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarTaskCardComponent } from 'src/app/shared/SidebarTaskCard/sidebarTaskCard.component';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroFolderPlus, heroPlus } from '@ng-icons/heroicons/outline';
import * as moment from 'moment';

@Component({
    imports: [SidebarTaskCardComponent, CommonModule, NgIconComponent],
    viewProviders: [provideIcons({ heroFolderPlus, heroPlus })],
    selector: 'app-layout-task-sidebar',
    templateUrl: './taskSidebar.component.html',
    standalone: true,
})
export class TaskSidebarComponent implements OnChanges {
    private storage: Storage = inject(Storage);
    constructor(public taskService: TaskService, public userService: UserService) {}

    createTaskInput = { title: "", details: "", img: { url: "", file: { } as File  } }
    createLinkInput = { title: "", link: "" }
    links: { title: string, link: string }[] = []
    isOpenCreateTask = false;
    @Input() taskSidebarOpen = false;
    @Input() selectedDate: Date = new Date();
    @Output() taskSidebarOpenEvent = new EventEmitter<boolean>();
    deadline = moment(this.selectedDate).format('MMMM Do YYYY');
    isToday = moment(this.selectedDate).format('DD/MM/YYYY') == moment(new Date()).format('DD/MM/YYYY');

    ngOnChanges() {
        if (this.selectedDate) {
            this.deadline = moment(this.selectedDate).format('MMMM Do YYYY');
            this.isToday = moment(this.selectedDate).format('DD/MM/YYYY') == moment(new Date()).format('DD/MM/YYYY');
        }
    }

    setOpenAndClose() {
        this.taskSidebarOpenEvent.emit(!this.taskSidebarOpen);
    }

    createLink() {
        this.links = [...this.links, this.createLinkInput]
        this.createLinkInput = { title: "", link: "" }
    }

    removeLink(index: number) {
        this.links = this.links.filter((link, i) => i != index);
    }

    async createTask() {
        if (this.selectedDate) {
            let url = ""
            if (this.createTaskInput.img.url) {
                const storageRef = ref(this.storage, this.createTaskInput.img.file.name);
                const data = await uploadBytesResumable(storageRef, this.createTaskInput.img.file);
                url = await getDownloadURL(data.ref); 
            }

            this.taskService.createTask({ 
                title: this.createTaskInput.title,
                details: this.createTaskInput.details,
                img: url,
                links: this.links, 
                deadline: this.selectedDate, 
                boardId: this.taskService.board.id,
            })

            this.createTaskInput = { title: "", details: "", img: { url: "", file: { } as File  } }
            this.createLinkInput = { title: "", link: "" }
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