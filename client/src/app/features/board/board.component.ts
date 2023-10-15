import { Component, OnInit, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, getMetadata, getBlob } from '@angular/fire/storage';
import { SidebarComponent } from 'src/app/core/layout/sidebar/sidebar.component';
import { TaskSidebarComponent } from 'src/app/core/layout/taskSidebar/taskSidebar.component';
import { CalendarComponent } from 'src/app/shared/Calendar/calendar.component';
import { TaskCardComponent } from 'src/app/shared/TaskCard/taskCard.component';
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { BoardAPIService } from 'src/app/core/services/api/boardAPI.service';
import { TaskAPIService } from 'src/app/core/services/api/taskAPI.service';
import { TaskStoreService } from 'src/app/core/services/taskStore.service';
import { UserStoreService } from 'src/app/core/services/userStore.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapDownload } from '@ng-icons/bootstrap-icons'
import { heroDocumentDuplicate, heroArrowLongDown, heroArrowLongUp, heroFolderPlus } from '@ng-icons/heroicons/outline';
import * as moment from 'moment';

@Component({
  imports: [
    CommonModule,
    NgIconComponent,
    SidebarComponent, 
    TaskSidebarComponent, 
    CalendarComponent, 
    TaskCardComponent,
  ],
  viewProviders: [provideIcons({ heroDocumentDuplicate, heroArrowLongDown, heroArrowLongUp, heroFolderPlus, bootstrapDownload })],
  selector: 'app-board-page',
  templateUrl: './board.component.html',
  standalone: true,
})
export class BoardComponent implements OnInit {
  constructor (
    private boardAPIService: BoardAPIService,
    private taskAPIService: TaskAPIService, 
    public taskService: TaskStoreService, 
    public userService: UserStoreService,
    private route: ActivatedRoute) 
  {}
  attachmentsInput: File[] = [];
  taskSidebarOpen = false;
  showAllTasks = false;
  openAddAttachments = false;
  currentDate = moment(new Date()).format('MMMM Do YYYY');
  copyBoardLoading = false;
  addBoardAttachmentsLoading = false;
  private storage: Storage = inject(Storage);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.boardAPIService.getBoard(id).subscribe(async (data: any) => {
          if (data?.data?.getBoard) {
            const board = data.data.getBoard;
            const attachments = await Promise.all(board.attachments.map(async (attachment: string) => {
              const storageRef = ref(this.storage, attachment);
              const metadata = await getMetadata(storageRef)
              return { name: metadata.name, download_url: attachment }
            }))
            const tasks = await Promise.all(board.tasks.map(async (task: any) => { 
              const attachments = await Promise.all(task.attachments.map(async (attachment: string) => {
                const storageRef = ref(this.storage, attachment);
                const metadata = await getMetadata(storageRef)
                return { name: metadata.name, download_url: attachment }
              }))
              return {
                ...task, 
                attachments,
                start: new Date(task.start),
                end: new Date(task.end),
                createdAt: new Date(task.createdAt) 
              }
            }))

            this.taskService.board = { ...board, attachments }; //Set board
            this.taskService.tasks.set(tasks); //Set task of fetched board
          }
        })
      }
    });
  }

  onChangeFile(e: any) {
    //1048576 = 1Mb
    if(Array.from(e.target.files).every((file: any) => file.size <= 1048576)){
      this.attachmentsInput = Array.from(e.target.files);
    }
    else {
      alert("File is too big! over 1 Mb");
    }  
  }

  openAddAttachmentInput() {
    this.openAddAttachments = true;
  }

  closeCreateBoardBackground(e: any): void {
    if (e.target == e.currentTarget) {
      this.openAddAttachments = false;
    }
  }

  setTaskSidebarOpen(value: boolean) {
    this.taskSidebarOpen = value;
  }

  changeShowAllTask() {
    this.showAllTasks = !this.showAllTasks;
  }

  async addAttachments() {
    if (this.taskService.board.id && this.attachmentsInput.length > 0) {
      this.addBoardAttachmentsLoading = true;
      const newAttachments = await Promise.all(this.attachmentsInput.map(async attachment => {
        const storageRef = ref(this.storage, attachment.name);
        const data = await uploadBytesResumable(storageRef, attachment);
        const download_url = await getDownloadURL(data.ref); 
        return { name: attachment.name, download_url }
      }))
      const attachments = [...this.taskService.board.attachments, ...newAttachments];

      this.boardAPIService.updateBoard({ 
        id: this.taskService.board.id,
        title: this.taskService.board.title,
        details: this.taskService.board.details,
        attachments: attachments.map(attachment => attachment.download_url)
      }).subscribe((data: any) => {
        if (data?.data?.updateBoard) this.taskService.board = { ...this.taskService.board, attachments }
        this.addBoardAttachmentsLoading = false;
      });

      this.openAddAttachments = false;
    }
  }

  async removeAttachment(index: number) {
    const update_attachments = this.taskService.board.attachments.filter((attachment, i) => index != i)
    this.boardAPIService.updateBoard({ 
      id: this.taskService.board.id,
      title: this.taskService.board.title,
      details: this.taskService.board.details,
      attachments: update_attachments.map(attachment => attachment.download_url)
    }).subscribe((data: any) => {
      if (data?.data?.updateBoard) this.taskService.board = { ...this.taskService.board, attachments: update_attachments }
    });
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

  copyBoard() {
    if (this.taskService.board.id && this.userService.currentUser) {
      this.copyBoardLoading = true;
      this.boardAPIService.createBoard({ 
        title: this.taskService.board.title, 
        details: this.taskService.board.details,
        attachments: this.taskService.board.attachments.map(attachment => attachment.download_url),
        userId: this.userService.currentUser.id
      })
      .subscribe((data: any) => {
        if (data?.data?.createBoard) {
          const board = data.data.createBoard;
          if (this.userService.currentUser?.boards) this.userService.currentUser.boards = [...this.userService.currentUser.boards, board]
          this.taskService.tasks().forEach(task => {
            this.taskAPIService.createTask({
              title: task.title,
              details: task.details,
              img: task.img,
              attachments: task.attachments.map(attachment => attachment.download_url),
              links: task.links.map(link => ({ title: link.title, link: link.link })),
              start: task.start,
              end: task.end,
              allDay: task.allDay,
              boardId: board.id
            }).subscribe(data => this.copyBoardLoading = false)
          })                
        }
      })
    }
  }
}
