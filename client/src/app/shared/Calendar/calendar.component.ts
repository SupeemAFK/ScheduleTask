import { Component, EventEmitter, Output, Input, OnChanges, ViewChild } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { Task } from 'src/app/core/models/task.model';
import { TaskStoreService } from '../../core/services/taskStore.service'

@Component({
  imports: [FullCalendarModule],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
})
export class CalendarComponent implements OnChanges {
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    initialView: 'dayGridMonth',
    eventStartEditable: false,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];
  @Input() tasks: Task[] = []
  @Input() taskSidebarOpen = false;
  @Output() taskSidebarOpenEvent = new EventEmitter<boolean>();
  @ViewChild('calendar') calendarComponent: FullCalendarComponent = {} as FullCalendarComponent;
  constructor (private taskStore: TaskStoreService) {}

  ngOnChanges() {
    this.calendarOptions.events = this.tasks.map(task => ({ 
      id: String(task.id), 
      title: task.title, 
      start: new Date(task.start).setHours(task.start.getHours() + 1), 
      end: new Date(task.end).setHours(task.end.getHours() + 1), 
    }))
    if (this.taskSidebarOpen || !this.taskSidebarOpen) {
      setTimeout(() => {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.updateSize()
      }, 300)
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.taskStore.selectedDate.set(selectInfo.start);
    this.taskSidebarOpenEvent.emit(true);
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (clickInfo.event.start) {
      this.taskStore.selectedDate.set(new Date(clickInfo.event.start.setHours(0, 0, 0, 0)));
      this.taskSidebarOpenEvent.emit(true);
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
