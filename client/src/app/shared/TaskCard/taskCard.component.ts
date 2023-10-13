import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import * as moment from 'moment';
import { Task } from "src/app/core/models/task.model";
import { TaskService } from "src/app/core/services/task.service";

@Component({
    imports: [CommonModule],
    selector: 'app-task-card',
    templateUrl: './taskCard.component.html',
    standalone: true,
})
export class TaskCardComponent implements OnChanges {
    @Input() dateTask: { deadline: string, tasks: Task[] } = { } as { deadline: string, tasks: Task[] }
    currentDate = moment(new Date()).format('MMMM Do YYYY');
    deadline = moment(this.dateTask.deadline).format('MMMM Do YYYY');
    diff = moment(this.dateTask.deadline).endOf('day').fromNow(); 
    edit = false;

    constructor(private taskService: TaskService) {}

    ngOnChanges() {
        this.currentDate = moment(new Date()).format('MMMM Do YYYY');
        this.deadline = moment(this.dateTask.deadline).format('MMMM Do YYYY');
        this.diff = moment(this.dateTask.deadline).endOf('day').fromNow(); 
    }

    changeEdit() {
        console.log("Nahee")
        this.edit = !this.edit;
    }

    deleteTask() {
    }
}