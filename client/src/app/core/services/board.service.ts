import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable()
export class BoardService {
    private configUrl = 'http://localhost:3000/graphql';

    constructor (private readonly http: HttpClient) {}

    getBoards() {
        const query = `
            query {
                getBoards {
                    id
                    title
                    img
                    createdAt
                    user {
                        id
                        name
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
            }
          }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers }
        );
    }

    createBoard(createBoardInput: { title: string, details: string, img: string, userId: number }) {
        const query = `
        mutation {
            createBoard(newBoardData: { 
              title:"${createBoardInput.title}", 
              details:"${createBoardInput.details}", 
              img: "${createBoardInput.img}", 
              userId: ${createBoardInput.userId} 
            }) {
              id
              title
            }
          }`;

        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers },
        );
    }

    updateBoard(updateBoardInput: { id: number, title: string, img: string }) {
        const query = `
            mutation updateBoard(updateBoardInput: ${updateBoardInput}) {
                id
                title
                img
                createdAt
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