import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, inject } from "@angular/core";
import * as moment from 'moment';
import { Task } from "src/app/core/models/task.model";
import { TaskStoreService } from "src/app/core/services/taskStore.service";
import { Storage, ref, uploadBytesResumable, getDownloadURL, getBlob } from '@angular/fire/storage';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencilSquare, heroFolderPlus, heroPhoto } from '@ng-icons/heroicons/outline';

@Component({
    imports: [CommonModule, NgIconComponent],
    viewProviders: [provideIcons({ heroTrash, heroPencilSquare, heroFolderPlus, heroPhoto })],
    selector: 'app-task-card',
    templateUrl: './taskCard.component.html',
    standalone: true,
})
export class TaskCardComponent implements OnChanges {
    @Input() task: Task = { } as Task;
    @Input() isOwner = false;

    currentDate = moment(new Date()).format('MMMM Do YYYY');
    start = moment(this.task.start).format('MMMM Do YYYY, h:mm: a');
    end = moment(this.task.end).format('MMMM Do YYYY, h:mm: a');
    diff = moment(this.task.end).endOf('day').fromNow(); 

    updateTaskInput: {
        id: number,
        title: string,
        details: string,
        img: { url: string, file: File },
        attachments: ({ name: string, download_url: string } | File)[]
        links: { id?: number, title: string, link: string }[],
        start: Date,
        end: Date,
        allDay: boolean,
        startFormat: string,
        endFormat: string,
        completed: boolean,
    } = { 
        id: 0, 
        title: "", 
        details: "", 
        img: { url: "", file: {} as File }, 
        attachments: [],
        links: [], 
        start: new Date(), 
        end: new Date(), 
        allDay: false,
        startFormat: '',
        endFormat: '',
        completed: false
     }
    createLinkInput: { title: string, link: string } = { title: "", link: "" }
    edit = false;
    private storage: Storage = inject(Storage);
    constructor(public taskService: TaskStoreService) {}

    ngOnChanges() {
        this.currentDate = moment(new Date()).format('MMMM Do YYYY');
        this.start = moment(this.task.start).format('MMMM Do YYYY, h:mm: a');
        this.end = moment(this.task.end).format('MMMM Do YYYY, h:mm: a');
        this.diff = moment(this.task.end).endOf('day').fromNow(); 
    }

    changeEdit() {
        this.edit = !this.edit;
        this.updateTaskInput = {
            id: this.task.id,
            title: this.task.title,
            details: this.task.details,
            img: { url: this.task.img, file: { } as File },
            attachments: this.task.attachments,
            links: this.task.links,
            start: this.task.start,
            end: this.task.end,
            allDay: this.task.allDay,
            startFormat: moment(this.task.start).format('YYYY-MM-DDThh:mm'),
            endFormat: moment(this.task.end).format('YYYY-MM-DDThh:mm'),
            completed: this.task.completed
        }
    }

    onChangeInput(e: any) {
        if (e.target.name == 'start' || e.target.name == 'end') {
            this.updateTaskInput = { ...this.updateTaskInput, [e.target.name]: new Date(e.target.value) }
        }
        else {
            this.updateTaskInput = { ...this.updateTaskInput, [e.target.name]: e.target.value }
        }
    }

    onChangeLinkInput(e: any) {
        this.createLinkInput = { ...this.createLinkInput, [e.target.name]: e.target.value }
    }

    onChangeCompleted(e: any) {
        this.updateTaskInput = { ...this.updateTaskInput, completed: e.target.checked }
    }

    onChangeFile(e: any) {
        //1048576 = 1Mb
        if(e.target.files[0].size <= 1048576){
            this.updateTaskInput = { ...this.updateTaskInput, img: { url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] } }
        }
        else {
            alert("File is too big! over 1 Mb");
        }
    }

    onChangeAttachments(e: any) {
        const newAttachments: File[] = Array.from(e.target.files);
        this.updateTaskInput = { ...this.updateTaskInput, attachments: [...this.updateTaskInput.attachments, ...newAttachments] }
    }

    changeFileToNone() {
        this.updateTaskInput = { ...this.updateTaskInput, img: { url: "", file: {} as File } }
    }

    addLink() {
        this.updateTaskInput = { ...this.updateTaskInput, links: [...this.updateTaskInput.links, this.createLinkInput] }
    }

    removeLink(index: number) {
        this.updateTaskInput = { ...this.updateTaskInput, links: this.updateTaskInput.links.filter((link, i) => i != index) }
    }

    removeAttachment(index: number) {
        this.updateTaskInput = { ...this.updateTaskInput, attachments: this.updateTaskInput.attachments.filter((attachment, i) => index != i) }
    }

    async updateTask() {     
        this.taskService.updateTaskLoading = true; //Set loading to false after update success
        
        let url = this.updateTaskInput.img.url;
        if (this.updateTaskInput.img.url != "" && this.updateTaskInput.img.url != this.task.img) {
            const storageRef = ref(this.storage, this.updateTaskInput.img.file.name);
            const data = await uploadBytesResumable(storageRef, this.updateTaskInput.img.file);
            url = await getDownloadURL(data.ref);         
        }

        let attachments = this.task.attachments.map(attachment => attachment.download_url);
        const newAttachmentsFile: File[] = []
        this.updateTaskInput.attachments.forEach(attachment => {
            const file = attachment as File
            if (file?.size) newAttachmentsFile.push(file)
        });
        if (newAttachmentsFile.length > 0) {
            const uploaded_attachment = await Promise.all(newAttachmentsFile.map(async (file: any) => {
                const storageRef = ref(this.storage, file.name);
                const data = await uploadBytesResumable(storageRef, file);
                const download_url = await getDownloadURL(data.ref); 
                return download_url;
            }))
            attachments = [...attachments, ...uploaded_attachment];
        }

        //Links is the same
        if (this.arraysEqual(this.task.links, this.updateTaskInput.links)) {
            this.taskService.updateTask({
                id: this.updateTaskInput.id,
                title: this.updateTaskInput.title,
                details: this.updateTaskInput.details,
                img: url,
                attachments: attachments,
                start: this.updateTaskInput.start,
                end: this.updateTaskInput.end,
                allDay: this.updateTaskInput.allDay,
                completed: this.updateTaskInput.completed
            }); 
        }
        else {
            this.taskService.updateTask({
                id: this.updateTaskInput.id,
                title: this.updateTaskInput.title,
                details: this.updateTaskInput.details,
                img: url,
                attachments: attachments,
                links: this.updateTaskInput.links.map(link => ({ title: link.title, link: link.link })),
                start: this.updateTaskInput.start,
                end: this.updateTaskInput.end,
                allDay: this.updateTaskInput.allDay,
                completed: this.updateTaskInput.completed
            }); 
        }
        this.edit = false;
        
    }

    deleteTask() {
        this.taskService.deleteTask(this.task.id);
    }

    async downloadAttachment(attachment: { name: string, download_url: string}) {
        const storageRef = ref(this.storage, attachment.download_url);
        const blob = await getBlob(storageRef);
    
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = attachment.name;
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
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