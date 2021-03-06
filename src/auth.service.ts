import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    constructor(
        public http: Http
    ) { }

    login(email: string, password: string, callback: Function) {
        this.http
            .post("https://string-cheese-api.herokuapp.com/login", {
                email: email,
                password: password
            })
            .subscribe(
                result => {
                    var responseJson = result.json();

                    // store the token in local storage
                    localStorage.setItem("jwt", responseJson.token);

                    callback();
                },

                error => {
                    callback(error);
                }
            );
    }

}