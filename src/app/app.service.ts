import { Injectable } from '@angular/core';
import { Employeedet } from './app.member';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*import { Member } from './app.member';*/
/*import { MEMBERS } from './app.member.data';*/
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Injectable()
/*Service*/
export class EmployeeMember {
     url = 'http://localhost:3000/SubmitData';
     MyEmpMembers: FormGroup[] = [];
     MyEmpMembers1: Employeedet[] = [];
     IdDel: number;
     DelFlag: string ;

     constructor(private http: Http) { }
     /* get function*/
     getEmpFunction(): FormGroup[] {
         return this.MyEmpMembers;
     }
     /* Get employee details from APIs */
     getEmpWithObservable(): Observable<Employeedet[]> {
        return this.http.get(this.url)
          .map(this.extractData)
          .catch(this.handleErrorObservable);
    }
     /* add function */
     addEmpFunction(MyEmpMempass: FormGroup) {
      /*  adding elements using unshift */
      this.MyEmpMembers.unshift(MyEmpMempass);
                /*Post satement - Note without subscribe post was not happening successfully */
                let headers = new Headers({ 'Content-Type': 'application/json' });
                headers.append('Accept', 'application/json');
                let options = new RequestOptions({ headers: headers });
                console.log(this.url);
                console.log(JSON.stringify(MyEmpMempass));
                return this.http.post(this.url, JSON.stringify(MyEmpMempass), options).catch(this.handleErrorObservable)
                 .map(this.extractData).subscribe();


     }

     /* Http Delete*/
     IDdelete(IDdel) {
         this.IdDel = IDdel;
         this.DelFlag = 'Y';
         console.log(this.DelFlag);
        return this.http.delete(`${this.url}/${IDdel}`, ).catch(this.handleErrorObservable)
        .map(this.extractData).subscribe();
     }

        private extractData(res: Response) {
        let body = res.json();
            console.log(body);
            return body || {};
        }

        private handleErrorObservable (error: Response | any) {
        console.error(error);
        return Observable.throw(error);
        }
}
