
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";


@Injectable()
export class ConfigService{
     constructor(
         public http:Http
     ){}

     getBaseUrl(){
        return "https://string-cheese-api.herokuapp.com"
     }
}