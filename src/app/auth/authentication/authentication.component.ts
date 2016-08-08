import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';


import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'authentication',
  encapsulation: ViewEncapsulation.None
})

export class Authentication implements OnInit {

  ngOnInit(){

  }

  constructor(private router: Router) {

  }

}
