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

    createTask(createTaskInput: { title: string, details: string, img: string, links: { title: string, link: string }[], deadline: Date, boardId: number }) {
        const query = `
        mutation {
            createTask(newTodoData: { 
              title: "${createTaskInput.title}",
              img: "${createTaskInput.img}",
              details: "${createTaskInput.details}",
              links: ${JSON.stringify(createTaskInput.links).replace(/"([^"]+)":/g, '$1:')},
              deadline: "${createTaskInput.deadline}",
              boardId: ${createTaskInput.boardId}
            }) {
              id
              title
              details
              img
              deadline
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

    updateTask(updateTodoInput: { id: number, title: string, details: string, img: string, links?: { title: string, link: string }[], deadline: Date, completed: boolean }) {
      let query = `
        mutation {
            updateTask(updateTodoData: {
              id: ${updateTodoInput.id}
              title: "${updateTodoInput.title}",
              img: "${updateTodoInput.img}",
              details:"${updateTodoInput.details}",
              deadline: "${updateTodoInput.deadline}",
              completed: ${updateTodoInput.completed}
            }) {
                id
                title
                details
                img
                deadline
                createdAt
                completed
                links {
                  id
                  title
                  link
                }
              }
          }`;
      if (updateTodoInput.links) {
        query = `
        mutation {
            updateTask(updateTodoData: {
              id: ${updateTodoInput.id}
              title: "${updateTodoInput.title}",
              img: "${updateTodoInput.img}",
              details:"${updateTodoInput.details}",
              links: ${JSON.stringify(updateTodoInput.links).replace(/"([^"]+)":/g, '$1:')},
              deadline: "${updateTodoInput.deadline}",
              completed: ${updateTodoInput.completed}
            }) {
                id
                title
                details
                img
                deadline
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