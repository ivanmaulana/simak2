import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {AuthHttp} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'praseminarAdmin',
  pipes: [BaAppPicturePipe],
  providers: [ToastsManager],
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./praseminarAdmin.scss')],
  template: require('./praseminarAdmin.html')
})

export class PraseminarAdmin implements OnInit {
  private active: boolean = false;
  private jadwal: string;
  private deadline: string;

  private profile: boolean = false;
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
  private input: string;
  private creds: string;
  private response: string;
  private status: boolean;
  private message: string;

  max : number = 100;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/jadwalPraseminar')
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_seminar'];
        this.deadline = data[0]['deadline'];
      })
  }

  peopleTableData:Array<any>;

  constructor(private http: Http, private authHttp: AuthHttp, private toastr: ToastsManager) {

  }

  openProfile(input){
    this.http.get('http://simak.apps.cs.ipb.ac.id:2016/ta/'+input)
      .map(res => res.json())
      .subscribe(data => {
        this.nim = data[0].nim;
        this.nama = data[0].nama;
        this.ipk = data[0].ipk;
        this.topik = data[0].topik;
        this.lab = data[0].lab;
        this.dosen_1 = data[0].dosen_1;
        this.dosen_2 = data[0].dosen_2;
        this.konsultasi_1 = data[0].konsultasi_1;
        this.konsultasi_2 = data[0].konsultasi_2;
        this.pertemuan_1 = data[0].pertemuan_1;
        this.pertemuan_2 = data[0].pertemuan_2;
        this.progress_1 = data[0].progress_1;
        this.progress_2 = data[0].progress_2;
        this.progress_3 = data[0].progress_3;
        this.progress_4 = data[0].progress_4;
        console.log(data);
      })
  }

  simpan(){
    this.creds = JSON.stringify({active: this.active, jadwal_seminar: this.jadwal, deadline: this.deadline});

    this.authHttp.put("http://simak.apps.cs.ipb.ac.id:2016/jadwalPraseminar", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;

        if(this.status) {
          this.showSuccess();
        }
      }
    )
  }

  activate(){
    this.active = !this.active;
  }

  showError() {
    this.toastr.error('Update Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Penentuan Praseminar Berhasil", 'Success !');
  }

}
