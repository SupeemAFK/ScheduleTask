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
            attachments
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
              attachments
              tasks {
                id
                title
                details
                img
                attachments
                links {
                  id
                  title
                  link
                }
                start
                end
                allDay
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

    createBoard(createBoardInput: { title: string, details: string, attachments: string[], userId: number }) {
        const query = `
        mutation {
            createBoard(newBoardData: { 
              title:"${createBoardInput.title}", 
              details:"${createBoardInput.details}", 
              attachments: ${JSON.stringify(createBoardInput.attachments)},
              userId: ${createBoardInput.userId} 
            }) {
              id
              title
              details
              attachments
            }
          }`;
          
        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers },
        );
    }

    updateBoard(updateBoardInput: { id: number, title: string, attachments: string[], details: string }) {
        const query = `
        mutation {
            updateBoard(updateBoardData:{ 
                id: ${updateBoardInput.id}, 
                title: "${updateBoardInput.title}", 
                details: "${updateBoardInput.details}" ,
                attachments: ${JSON.stringify(updateBoardInput.attachments)},
            }) {
              id
              title
              details
              attachments
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