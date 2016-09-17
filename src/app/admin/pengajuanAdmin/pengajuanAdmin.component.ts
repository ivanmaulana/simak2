import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';

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
  profile = false;
  private nim: string = "";
  private nama: string = "";
  private ipk: string = "";
  private topik: string = "";
  private lab: number = 0;
  private dosen_1: string = "";
  private dosen_2: string = "";
  private konsultasi_1: boolean = false;
  private konsultasi_2: boolean = false;
  private pertemuan_1: number = 0;
  private pertemuan_2: number = 0;
  private progress_1: boolean = false;
  private progress_2: boolean = false;
  private progress_3: boolean = false;
  private progress_4: boolean = false;

  foto;

  private excel = 'http://simak.apps.cs.ipb.ac.id:2016/excel/'+localStorage.getItem('id_token');


  ngOnInit(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/ta/daftar/list')
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        // console.log(data);
      })
  }

  peopleTableData:Array<any>;

  constructor(private http: Http, private authHttp: AuthHttp) {

  }

  changeLab(input) {
    if (input == 1) return 'NCC';
    else if (input == 2) return 'ACI';
    else if (input == 3) return 'SEIS';
  }

  openProfile(input){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/ta/daftar/detail/'+input)
      .map(res => res.json())
      .subscribe(data => {
        this.nim = data[0].nim;
        this.nama = data[0].nama;
        this.ipk = data[0].ipk;
        this.topik = data[0].topik;
        this.lab = data[0].lab;
        this.dosen_1 = data[0].dosen1;
        this.dosen_2 = data[0].dosen2;
        this.konsultasi_1 = data[0].konsultasi_1;
        this.konsultasi_2 = data[0].konsultasi_2;
        this.pertemuan_1 = data[0].pertemuan_1;
        this.pertemuan_2 = data[0].pertemuan_2;
        this.progress_1 = data[0].progress_1;
        this.progress_2 = data[0].progress_2;
        this.progress_3 = data[0].progress_3;
        this.progress_4 = data[0].progress_4;

        this.foto = 'http://simak.apps.cs.ipb.ac.id/upload/filePhoto/foto-'+this.nim+'-'+this.nama+'.png';
      })


  }

  downloadData(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/excel')
      .map(res => res.blob())
  }

  dataLab(input) {
    if (input == 1) return 'Net Centric Computing';
    else if (input == 2) return 'Applied Computing & Computational Intelligence';
    else if (input == 3) return 'Software Engineering & Information System';
  }

}
