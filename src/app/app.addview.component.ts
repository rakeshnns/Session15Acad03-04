import { Component, OnInit   } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeMember } from './app.service';
import { Degreelist } from './app.select.service';
import { MyEmpDeg, Employeedet, Deg } from './app.member';
import { ValidateDep } from './app.validator';  /*Custom Validator service importing*/
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; /* to access the parameters*/
import { animate, state, style, transition, trigger } from '@angular/animations'; /*Animation supportve*/
import { AngularANIMATION, AngularANIMATIONI } from './animation/app.animation';
import { Observable } from 'rxjs/Observable'; /* observable import*/

import { Location } from '@angular/common'; /* for location */
import 'rxjs/add/operator/switchMap';   /*for switchmap */

/*login form component*/
@Component({
  selector: 'app-login',
  templateUrl: './app.login.html',
  /*template: `<h1>ADD</h1>`,*/
  styleUrls: ['./app.component.css'],
  animations: [AngularANIMATION]
})
export class AppLoginComponent {
  userName: string;
  passWord: string;
  CpassWord: string;
  userNamel: string;
  passWordl: string;
  result: string;
  resultl: string;
  stateExpression: string;       /* expresion to used as property binding to the animation trigger */

  constructor(private employeemember: EmployeeMember, private degreelist: Degreelist,
    private fb: FormBuilder, private router: Router) {}

  /*Mousenter actvating animation function*/
  mouseEnter() {
    this.activeState();
  }

  mouseLeave() {
    this.InactiveState();
  }

  /*Mousleave inactvating animation function*/
  activeState() {
    this.stateExpression = 'active';
  }

  InactiveState() {
    this.stateExpression = 'inactive';
  }
  sign(userName, passWord, CpassWord) {
    this.result = '';
    console.log('loo1');
    if (sessionStorage.getItem('USERNAME') === this.userName) {
         this.result = 'Username is already present';
         this.userName = '';
         this.passWord = '';
         this.CpassWord = '';
    } else {
    if ( passWord === CpassWord) {
      console.log(passWord);
      console.log(CpassWord);
      console.log(userName);
       if (typeof(Storage) !== 'undefined') {
      // Store
        console.log('loo2');
         sessionStorage.setItem('USERNAME', userName);
         sessionStorage.setItem('PASSWORD', CpassWord);
         alert(`User Name ${userName} Has been added.`);
         this.userName = '';
         this.passWord = '';
         this.CpassWord = '';
       } else {
      this.result = 'Sorry, your browser does not support Web Storage...';
      }
    }else {
      console.log('loo3');
      this.result = 'Password and confirm password is not matching.';
      this.passWord = '';
      this.CpassWord = '';
    }
  }
 }

 login(userNamel, passWordl) {
   console.log(this.userNamel);
   console.log(this.passWordl);
   /*let Usernamel: string = sessionStorage.getItem('USERNAME');
   let Passwordl: string = sessionStorage.getItem('USERNAME');*/
  if (sessionStorage.getItem('USERNAME') === this.userNamel && sessionStorage.getItem('PASSWORD') === this.passWordl ) {
        alert(`congrats you are successfully logged in.`);
        sessionStorage.setItem('Loginstatus', 'Y');
        sessionStorage.setItem('LoginUser', this.userNamel);
        this.userNamel = '';
        this.passWordl = '';
        this.resultl = '';
        this.router.navigate(['/add']);
  } else {
    this.resultl = 'No matching credentials found.';
  }
 }
}


@Component({
  selector: 'app-add',
  templateUrl: './app.add.html',
  /*template: `<h1>ADD</h1>`,*/
  styleUrls: ['./app.component.css'],
  animations: [AngularANIMATION, AngularANIMATIONI ] /*animation*/
})
export class AppAddComponent implements OnInit  {

  observableDeg: Observable<Deg[]>; /*Observable declaration */
  Firstname: string;
  Lastname: string;
  Department: string;
  /*Degree: MyEmpDeg[];*/
  Degree: Deg[];                   /* to access observable data*/
  EMPARRAY: FormGroup[];
  /*EMPDeg: MyEmpDeg[];*/
  EMPDeg: Deg[];                   /* to access observable data*/
  errorMessage: String;            /* to access observable errorstring data*/
  len: number;
  myForm: FormGroup;
  stateExpression: string;       /* expresion to used as property binding to the animation trigger */
  isUpdating = false;


  constructor(private employeemember: EmployeeMember, private degreelist: Degreelist,
              private fb: FormBuilder, private route: ActivatedRoute, private routerr: Router) {}

  /*Mousenter actvating animation function*/
  mouseEnter() {
    this.activeState();
  }

  mouseLeave() {
    this.InactiveState();
  }

  /*Mousleave inactvating animation function*/
  activeState() {
    this.stateExpression = 'active';
  }

  InactiveState() {
    this.stateExpression = 'inactive';
  }

  /*Call Back */
  animationStarted(e) {
    console.log('Animation Started', e);
  }

  animationDone(e) {
    console.log('Animation Done', e);
  }

  ngOnInit() {
   /* this.Firstname = 'FName';
    this.Lastname = 'LName';
    this.Department = 'De';
    this.EMPDeg  = this.degreelist.getTitle();*/
    /*this.EMPDeg = this.degreelist.getTitle(); previously  selection dataloader */

    /* Using resolver to load Selection data
    added private route: ActivatedRoute in constrctor to use this.route.data 
    this.route.data.forEach((data: any) => {
      this.EMPDeg = data.EMPDeg;
    });*/

    /* Using resolver to load Selection data
    added private route: ActivatedRoute in constrctor to use this.route.data */
    this.route.data.forEach((data: any) => {
         /* HTTP get code to use json value */
         this.observableDeg = this.degreelist.getTitle();
         this.observableDeg.subscribe(
             EMPDeg => data.EMPDeg = EMPDeg,
             error =>  this.errorMessage = <any>error);
      this.EMPDeg = data.EMPDeg;
    });


    this.myForm = this.fb.group({
       'Firstname': ['Fname', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]*$')]],
       'Lastname': ['Lname', [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]*$')]],
       'DOB': ['0000-00-00', [Validators.required]],
       /*ValidateDep is the Custom validate class imported and parameter is RegEx for validation.*/
       'Department': ['111', [Validators.required, ValidateDep(/[1-9][0-9]{2}/)]],
       'Degree': [this.EMPDeg, Validators.required],
      });
  }

  onSubmit(myForm) {
    if (myForm.valid) {
      this.isUpdating = true;
      this.employeemember.addEmpFunction(myForm.value);
      this.routerr.navigate(['/view']);    /*After submit it will route to View page. Need to define at constructor*/
    }
 }

}

@Component({
    selector: 'app-view',
    templateUrl: './app.view.html',
    styleUrls: ['./app.component.css'],
    animations: [AngularANIMATION, AngularANIMATIONI ] /*animation*/
  })
  export class AppViewComponent implements OnInit  {
   observableDet: Observable<Employeedet[]>;
   Firstname: string;
   Lastname: string;
   Department: string;
   Degree: MyEmpDeg[];
   EMPARRAY: FormGroup[];
   EMPDETARRAY: Employeedet[];
   EMPDeg: MyEmpDeg[];
   len: number;
   lenO: number;
   myForm: FormGroup;
   errorMessage: String;

  constructor(private employeemember: EmployeeMember, private degreelist: Degreelist,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.EMPARRAY  = this.employeemember.getEmpFunction();
    this.len = this.EMPARRAY.length;

    /*Observable data which will be viewed using async pipe */
    this.observableDet = this.employeemember.getEmpWithObservable();
            this.observableDet.subscribe(
            EMPDETARRAY => this.EMPDETARRAY = EMPDETARRAY,
            error =>  this.errorMessage = <any>error);
    console.log(this.EMPDETARRAY);
  }

  /*Call Back */
  animationStarted(e) {
    console.log('Animation Started', e);
  }

  animationDone(e) {
    console.log('Animation Done', e);
  }

  EmpView(PassName) {
    console.log(PassName);
    this.router.navigate(['/Eview', PassName]);
  }

  DeleteID(IDdel) {
    console.log(IDdel);
    let x: boolean = window.confirm(`Are you sure you want to delete ID: ${IDdel}?`);

    if (x) {
        this.employeemember.IDdelete(IDdel);
    }
  }
}

@Component({
  selector: 'app-notfound',
  template: `
  <h1 style="text-align: center"> Oops Page not found</h1>
  ` ,
  styleUrls: ['./app.component.css']
})
export class AppPageNotFoundComponent  {}

@Component({
  selector: 'app-viewpass',
  template: `
  <h1 style="text-align: center"> {{ FIRSTNAME }} </h1>
  <br>
  <button (click) = "goback()"> GOBACK</button>
  ` ,
  styleUrls: ['./app.component.css']
})
export class AppViewpassComponent implements OnInit {

  FIRSTNAME: string;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    /*console.log('ethi');*/
    /* Router Params to get the parameter value */
    this.route.params.subscribe(params => {
      console.log(params.PassName);
      this.FIRSTNAME = params.PassName;
    });
  }

  /* To go back to calling link */
  goback() {
    this.location.back();
  }
}


