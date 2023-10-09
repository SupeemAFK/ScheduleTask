import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable()
export class TaskService {
    private configUrl = 'http://localhost:3000/graphql';

    constructor (private readonly http: HttpClient) {}

    getTasks() {
        const query = `
            query {
                getTodos {
                    id
                    content
                    isDone
                    createdAt
                }
            }`;
  
      return this.http.post(
        this.configUrl,
        JSON.stringify({ query }),
        { withCredentials: true, headers: httpOptions.headers }
      );
    }

    getTask(id: number) {
        const query = `
            query {
                getTodo(id: ${id}) {
                    id
                    content
                    isDone
                    createdAt
                }
            }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

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

    updateTask(updateTodoInput: { id: number, content: string }) {
        const query = `
            mutation {
                updateTodo(updateTodoInput: ${updateTodoInput}) {
                    id
                    title
                    img
                    createdAt
                }
            }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

    deleteTask(id: number) {
        const query = `
            mutation {
                deleteTodo(id: ${id}) {
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