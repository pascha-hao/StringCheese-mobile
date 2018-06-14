import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    constructor(
        public http: Http
    ) { }

    login(username: string, password: string, callback: Function) {
        this.http
            .post("http://localhost:3000/login", {
                username: username,
                password: password
            })
            .subscribe(
                result => {
                    var responseJson = result.json();

                    // store the token in local storage
                    localStorage.setItem("TOKEN", responseJson.token);

                    callback();
                },

                error => {
                    callback(error);
                }
            );
    }

}
