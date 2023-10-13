import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, inject } from "@angular/core";
import * as moment from 'moment';
import { Task } from "src/app/core/models/task.model";
import { TaskService } from "src/app/core/services/task.service";
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';

@Component({
    imports: [CommonModule, NgIconComponent],
    viewProviders: [provideIcons({ heroTrash, heroPencilSquare })],
    selector: 'app-sidebar-task-card',
    templateUrl: './sidebarTaskCard.component.html',
    standalone: true,
})
export class SidebarTaskCardComponent implements OnChanges {
    @Input() task: Task = { } as Task;
    @Input() isOwner = false;
    currentDate = moment(new Date()).format('MMMM Do YYYY');
    deadline = moment(this.task.deadline).format('MMMM Do YYYY');
    diff = moment(this.task.deadline).endOf('day').fromNow(); 
    updateTaskInput: {
        id: number,
        title: string,
        details: string,
        img: { url: string, file: File },
        links: { id?: number, title: string, link: string }[],
        deadline: Date,
        completed: boolean,
    } = { id: 0, title: "", details: "", img: { url: "", file: {} as File }, links: [], deadline: new Date(), completed: false }
    createLinkInput: { title: string, link: string } = { title: "", link: "" }
    edit = false;
    private storage: Storage = inject(Storage);
    constructor(private taskService: TaskService) {}

    ngOnChanges() {
        this.currentDate = moment(new Date()).format('MMMM Do YYYY');
        this.deadline = moment(this.task.deadline).format('MMMM Do YYYY');
        this.diff = moment(this.task.deadline).endOf('day').fromNow(); 
    }

    changeEdit() {
        this.edit = !this.edit;
        this.updateTaskInput = {
            id: this.task.id,
            title: this.task.title,
            details: this.task.details,
            img: { url: this.task.img, file: { } as File },
            links: this.task.links,
            deadline: this.task.deadline,
            completed: this.task.completed
        }
    }

    onChangeInput(e: any) {
        this.updateTaskInput = { ...this.updateTaskInput, [e.target.name]: e.target.value }
    }

    onChangeLinkInput(e: any) {
        this.createLinkInput = { ...this.createLinkInput, [e.target.name]: e.target.value }
    }

    onChangeCompleted(e: any) {
        this.updateTaskInput = { ...this.updateTaskInput, completed: e.target.checked }
    }

    onChangeFile(e: any) {
        if(e.target.files[0].size <= 1048576){
            this.updateTaskInput = { ...this.updateTaskInput, img: { url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] } }
        }
        else {
            alert("File is too big! over 1 Mb");
        }
    }

    addLink() {
        this.updateTaskInput = { ...this.updateTaskInput, links: [...this.updateTaskInput.links, this.createLinkInput] }
    }

    removeLink(index: number) {
        this.updateTaskInput = { ...this.updateTaskInput, links: this.updateTaskInput.links.filter((link, i) => i != index) }
    }

    async updateTask() {        
        let url = this.updateTaskInput.img.url;
        if (this.updateTaskInput.img.url != "" && this.updateTaskInput.img.url != this.task.img) {
            const storageRef = ref(this.storage, this.updateTaskInput.img.file.name);
            const data = await uploadBytesResumable(storageRef, this.updateTaskInput.img.file);
            url = await getDownloadURL(data.ref);         
        }

        //Links is the same
        if (this.arraysEqual(this.task.links, this.updateTaskInput.links)) {
            this.taskService.updateTask({
                id: this.updateTaskInput.id,
                title: this.updateTaskInput.title,
                details: this.updateTaskInput.details,
                img: url,
                deadline: this.updateTaskInput.deadline,
                completed: this.updateTaskInput.completed
            }); 
        }
        else {
            this.taskService.updateTask({
                id: this.updateTaskInput.id,
                title: this.updateTaskInput.title,
                details: this.updateTaskInput.details,
                img: url,
                links: this.updateTaskInput.links.map(link => ({ title: link.title, link: link.link })),
                deadline: this.updateTaskInput.deadline,
                completed: this.updateTaskInput.completed
            }); 
        }
        
    }

    deleteTask() {
        this.taskService.deleteTask(this.task.id);
    }

    arraysEqual(taskLinks: { id?: number; title: string, link: string; }[], inputLinks: { id?: number; title: string, link: string; }[]) {
        if (taskLinks === inputLinks) return true;
        if (taskLinks == null || inputLinks == null) return false;
        if (taskLinks.length !== inputLinks.length) return false;
      
        for (var i = 0; i < taskLinks.length; ++i) {
          if (taskLinks[i].id !== inputLinks[i]?.id) return false;
        }
        return true;
    }
}