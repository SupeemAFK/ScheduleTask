import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',    
    }),
};

@Injectable({
    providedIn: "root"
})
export class UserService {
    currentUser: User | null = null;
    private configUrl = 'http://localhost:3000/graphql';
    constructor (private readonly http: HttpClient) {}

    getUserByEmail(email: string) {
        const query = `
        query {
            getUserByEmail (email: "${email}") {
              id
              username
              email
              avatar
              boards {
                id
                title
              }
            }
        }`;
        return this.http.post(
            this.configUrl,
            JSON.stringify({ query }),
            { withCredentials: true, headers: httpOptions.headers },
        );
    }

    createUserOAUTH (createUserData: { username: string, email: string, avatar: string }) {
        const query = `
            mutation {
                createUser(createUserData: { 
                    username: "${createUserData.username}", 
                    email: "${createUserData.email}", 
                    avatar: "${createUserData.avatar}" 
                }) {
                    username
                    email
                    avatar
                }
          }`;

    return this.http.post(
        this.configUrl,
        JSON.stringify({ query }),
        { withCredentials: true, headers: httpOptions.headers },
      );
    }
}