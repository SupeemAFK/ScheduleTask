import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarTaskCardComponent } from 'src/app/shared/SidebarTaskCard/sidebarTaskCard.component';
import { TaskStoreService } from '../../services/taskStore.service';
import { UserStoreService } from '../../services/userStore.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPhoto, heroPlus, heroFolder } from '@ng-icons/heroicons/outline';

@Component({
    imports: [SidebarTaskCardComponent, CommonModule, NgIconComponent],
    viewProviders: [provideIcons({ heroPhoto, heroPlus, heroFolder })],
    selector: 'app-layout-task-sidebar',
    templateUrl: './taskSidebar.component.html',
    standalone: true,
})
export class TaskSidebarComponent {
    @Input() taskSidebarOpen = false;
    @Output() taskSidebarOpenEvent = new EventEmitter<boolean>();

    private storage: Storage = inject(Storage);
    constructor(public taskService: TaskStoreService, public userService: UserStoreService) {}

    createTaskInput: {
        title: string
        details: string
        img: { url: string; file: File }
        attachments: File[]
        start: Date | null
        end: Date | null
        allDay: boolean
    } = { 
        title: "", 
        details: "", 
        img: { url: "", file: { } as File  }, 
        attachments: [] as File[], 
        start: null, 
        end: null,
        allDay: false
    }
    createLinkInput = { title: "", link: "" }
    links: { title: string, link: string }[] = []
    isOpenCreateTask = false;

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
        if (this.taskService.selectedDate() && this.createTaskInput.title != '' && this.createTaskInput.details != '' &&this.createTaskInput.start && this.createTaskInput.end) {  
            this.taskService.createTaskLoading = true; //Set loading to false after create success

            let imgUrl = ""
            let attachments: string[] = []

            if (this.createTaskInput.img.url) {
                const storageRef = ref(this.storage, this.createTaskInput.img.file.name);
                const data = await uploadBytesResumable(storageRef, this.createTaskInput.img.file);
                imgUrl = await getDownloadURL(data.ref); 
            }
            if (this.createTaskInput.attachments.length > 0) {
                const uploaded_attachments = await Promise.all(this.createTaskInput.attachments.map(async attachment => {
                    const storageRef = ref(this.storage, attachment.name);
                    const data = await uploadBytesResumable(storageRef, attachment);
                    const downlaod_url = await getDownloadURL(data.ref);
                    return downlaod_url;
                }))
                attachments = uploaded_attachments
            }

            this.taskService.createTask({ 
                title: this.createTaskInput.title,
                details: this.createTaskInput.details,
                img: imgUrl,
                attachments: attachments,
                links: this.links, 
                start: this.createTaskInput.start,
                end: this.createTaskInput.end,
                allDay: this.createTaskInput.allDay,
                boardId: this.taskService.board.id,
            })

            this.createTaskInput = { title: "", details: "", img: { url: "", file: { } as File  }, attachments: [] as File[], start: new Date(), end: new Date(), allDay: false }
            this.createLinkInput = { title: "", link: "" }
        }
    }

    onChangeInput(e: any) {
        if (e.target.name == "start" || e.target.name == "end") {
            if (this.createTaskInput.allDay) {
                this.createTaskInput = { ...this.createTaskInput, [e.target.name]: new Date(new Date(e.target.value).setHours(0,0,0,0)) }
            }
            else {
                this.createTaskInput = { ...this.createTaskInput, [e.target.name]: new Date(e.target.value) }
            }
        }
        else if (e.target.name == "allDay") {
            this.createTaskInput = { ...this.createTaskInput, [e.target.name]: e.target.checked }
            this.createTaskInput = { ...this.createTaskInput, start: null, end: null}
        }
        else {
            this.createTaskInput = { ...this.createTaskInput, [e.target.name]: e.target.value }
        }
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

    onChangeAttachments(e: any) {
         //1048576 = 1Mb
         if(Array.from(e.target.files).every((file: any) => file.size <= 1048576)){
            this.createTaskInput = { ...this.createTaskInput, attachments: Array.from(e.target.files) }
        }
        else {
            alert("File is too big! over 1 Mb");
        }
    }   

    changeFileToNone() {
        this.createTaskInput = { ...this.createTaskInput, img: { url: '', file: {} as File } }
    }

    closeCreateTaskBackground(e: any) {
        if (e.target == e.currentTarget) this.isOpenCreateTask = false;
    }

    closeCreateTask() {
        this.isOpenCreateTask = false;
    }

    openCreateTask() {
        this.isOpenCreateTask = true;
        this.createTaskInput = { ...this.createTaskInput, start: this.taskService.selectedDate() }
    }
}