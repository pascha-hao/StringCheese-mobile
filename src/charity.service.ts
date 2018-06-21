import { Injectable } from '@angular/core';
import { Charity } from './models/charityProfile';
import { Observable } from 'rxjs/Observable';
// import { ArrayObservable } from 'rxjs/observable/ArrayObservable'
import { Storage } from '@ionic/storage';
import { Http } from "@angular/http";
import { ConfigService } from '../src/config.service';
import 'rxjs/add/observable/of';

@Injectable()
export class CharityServiceProvider {

  private charities: Array<Charity> = []; 

  constructor(
      public http:Http,
      public configService: ConfigService  
  ) {
    this.http
    .get(this.configService.getBaseUrl() + "/charities")
    .subscribe(
      result => {
        let i = 0;
        while (i < result.json().length) {
          this.charities.push(result.json()[i]);
          i++;
        }   
      },
      error => {
        console.log(error);
      }
    ); 
  }

  filterCharities(searchText){
    return this.charities.filter((charity) => {
        return charity.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });    

}

//   getFilteredCharites(searchText: string): Observable<Charity[]> {
//     return Observable.create( observable => {
//         this.getCharities().subscribe(allCharities => {
//             if(searchText && searchText.length > 0) {
//                 let filteredCharities = allCharities
//                     .filter(j => j.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
//                     observable.next(filteredCharities);
//             }
//             else {
//                 observable.next(allCharities);
//             }
//             observable.complete();
//             });
//         });
//     }

//   getCharities() :Observable<Charity[]> {
//     // return Observable.of(this.charities);
//     return this.charities;
//   }

}