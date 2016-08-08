import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http, Headers} from '@angular/http';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'login',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html')
})
export class Login implements OnInit {

  public form:ControlGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;


  ngOnInit(){

  }

  peopleTableData:Array<any>;

  constructor(fb:FormBuilder, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  pindah(){
    this.router.navigate(['Pages']);

  }

}
