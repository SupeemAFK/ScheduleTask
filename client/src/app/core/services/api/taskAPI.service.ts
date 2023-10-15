import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.development";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable()
export class TaskAPIService {
    private configUrl = environment.apiUrl;
    constructor (private readonly http: HttpClient) {}

    createTask(createTaskInput: { title: string, details: string, img: string, attachments: string[], links: { title: string, link: string }[], start: Date, end: Date, allDay: boolean, boardId: number }) {
        const query = `
        mutation {
            createTask(newTodoData: { 
              title: "${createTaskInput.title}",
              img: "${createTaskInput.img}",
              details: "${createTaskInput.details}",
              links: ${JSON.stringify(createTaskInput.links).replace(/"([^"]+)":/g, '$1:')},
              attachments: ${JSON.stringify(createTaskInput.attachments)},
              start: "${createTaskInput.start}",
              end: "${createTaskInput.end}",
              allDay: ${createTaskInput.allDay},
              boardId: ${createTaskInput.boardId}
            }) {
              id
              title
              details
              img
              attachments
              start
              end
              allDay
              createdAt
              completed
              links {
                id
                title
                link
              }
            }
          }`;
        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

    updateTask(updateTaskInput: { id: number, title: string, details: string, img: string, attachments: string[], links?: { title: string, link: string }[], start: Date, end: Date, allDay: boolean, completed: boolean }) {
      let query = `
        mutation {
            updateTask(updateTodoData: {
              id: ${updateTaskInput.id}
              title: "${updateTaskInput.title}",
              img: "${updateTaskInput.img}",
              attachments: ${JSON.stringify(updateTaskInput.attachments)},
              details:"${updateTaskInput.details}",
              start: "${updateTaskInput.start}",
              end: "${updateTaskInput.end}",
              allDay: ${updateTaskInput.allDay},
              completed: ${updateTaskInput.completed}
            }) {
                id
                title
                details
                img
                attachments
                start
                end
                allDay
                createdAt
                completed
                links {
                  id
                  title
                  link
                }
              }
          }`;
      if (updateTaskInput.links) {
        query = `
        mutation {
            updateTask(updateTodoData: {
              id: ${updateTaskInput.id}
              title: "${updateTaskInput.title}",
              img: "${updateTaskInput.img}",
              details:"${updateTaskInput.details}",
              links: ${JSON.stringify(updateTaskInput.links).replace(/"([^"]+)":/g, '$1:')},
              attachments: ${JSON.stringify(updateTaskInput.attachments)},
              start: "${updateTaskInput.start}",
              end: "${updateTaskInput.end}",
              allDay: ${updateTaskInput.allDay},
              completed: ${updateTaskInput.completed}
            }) {
                id
                title
                details
                img
                attachments
                start
                end
                allDay
                createdAt
                completed
                links {
                  id
                  title
                  link
                }
            }
          }`;
      }
        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

    deleteTask(id: number) {
        const query = `
        mutation {
            deleteTask(id: ${id}) {
              id
            }
          }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }
}