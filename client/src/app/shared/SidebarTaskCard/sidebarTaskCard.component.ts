import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import * as moment from 'moment';
import { Task } from "src/app/core/models/task.model";

@Component({
    imports: [CommonModule],
    selector: 'app-sidebar-task-card',
    templateUrl: './sidebarTaskCard.component.html',
    standalone: true,
})
export class SidebarTaskCardComponent implements OnChanges {
    @Input() task: Task = { } as Task

    currentDate = moment(new Date()).format('MMMM Do YYYY');
    deadline = moment(this.task.deadline).format('MMMM Do YYYY');
    diff = moment(this.task.deadline).endOf('day').fromNow(); 

    ngOnChanges() {
        this.currentDate = moment(new Date()).format('MMMM Do YYYY');
        this.deadline = moment(this.task.deadline).format('MMMM Do YYYY');
        this.diff = moment(this.task.deadline).endOf('day').fromNow(); 
    }
}