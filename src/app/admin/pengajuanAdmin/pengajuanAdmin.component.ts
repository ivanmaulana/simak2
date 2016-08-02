import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

@Component({
  selector: 'pengajuanAdmin',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuanAdmin.scss')],
  template: require('./pengajuanAdmin.html')
})
export class PengajuanAdmin implements OnInit {
  response;

  ngOnInit(){
    this.http.get('http://localhost:8000/ta/daftar')
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
      })
  }

  peopleTableData:Array<any>;

  constructor(private http: Http) {

  }

}
