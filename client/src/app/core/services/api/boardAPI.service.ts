import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.development";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable()
export class BoardAPIService {
    private configUrl = environment.apiUrl;
    constructor (private readonly http: HttpClient) {}

    getBoards() {
        const query = `
        query {
          getBoards {
            id
            title
            details
            createdAt
            user {
              id
              username
              avatar
            }
          }
        }`;
  
      return this.http.post(
        this.configUrl,
        JSON.stringify({ query }),
        httpOptions
      );
    }
 
    getBoard(id: number) {
        const query = `
        query {
            getBoard(id: ${id}) {
              id
              title
              details
              tasks {
                id
                title
                details
                img
                deadline
                links {
                  id
                  title
                  link
                }
                completed
                createdAt
              }
              user {
                id
                username
                avatar
              }
              createdAt
            }
          }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

    createBoard(createBoardInput: { title: string, details: string, userId: number }) {
        const query = `
        mutation {
            createBoard(newBoardData: { 
              title:"${createBoardInput.title}", 
              details:"${createBoardInput.details}", 
              userId: ${createBoardInput.userId} 
            }) {
              id
              title
              details
            }
          }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers },
        );
    }

    updateBoard(updateBoardInput: { id: number, title: string, details: string }) {
        const query = `
        mutation {
            updateBoard(updateBoardData:{ 
                id: ${updateBoardInput.id}, 
                title: "${updateBoardInput.title}", 
                details: "${updateBoardInput.details}" 
            }) {
              id
              title
              details
            }
          }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

    deleteBoard(id: number) {
        const query = `
            mutation {
                deleteBoard(id: ${id}) {
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