import { Component, EventEmitter, Output, Input, OnChanges, ViewChild } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { Task } from 'src/app/core/models/task.model';

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
  @Output() dateSelectInfoOutput = new EventEmitter<Date>();
  @ViewChild('calendar') calendarComponent: FullCalendarComponent = {} as FullCalendarComponent;

  ngOnChanges() {
    this.calendarOptions.events = this.tasks.map(task => ({ id: String(task.id), title: task.title, start: task.deadline }))
    if (this.taskSidebarOpen || !this.taskSidebarOpen) {
      setTimeout(() => {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.updateSize()
      }, 300)
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.taskSidebarOpenEvent.emit(true);
    this.dateSelectInfoOutput.emit(selectInfo.start);
  }

  handleEventClick(clickInfo: EventClickArg) {
    /*
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }*/
    if (clickInfo.event.start) {
      this.dateSelectInfoOutput.emit(clickInfo.event.start);
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
