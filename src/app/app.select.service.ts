import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Deg } from './app.member'; /* Deg from app member, structure for selection */



@Injectable()
/* Commented Service
export class Degreelist {
    Array of object
     MyEmpDeg = [{title: 'Bsc.Sc'}, {title: 'Bsc.Art'}, {title: 'Btech'}, {title: 'B.Com'}, {title: 'Masters'}];

    Function returning the array of object
     getTitle() {
        console.log('called');
        console.log(this.MyEmpDeg[0]);
        return this.MyEmpDeg;
     }

}*/

/*New service with HTTP get() */
export class Degreelist {
    url = 'http://localhost:3000/Select';
    constructor(private http: Http) { }
    /* Array of object */
   /*  MyEmpDeg = [{title: 'Bsc.Sc'}, {title: 'Bsc.Art'}, {title: 'Btech'}, {title: 'B.Com'}, {title: 'Masters'}];*/

    /* Function returning the array of object*/
 /*    getTitle() {
        return this.MyEmpDeg;
     } */
     getTitle(): Observable<Deg[]> {
        return this.http.get(this.url)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
     }
     private extractData(res: Response) {
        let body = res.json();
            console.log(body);
            return body;
        }
        private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
        }
}

