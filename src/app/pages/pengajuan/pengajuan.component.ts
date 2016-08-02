import {Component, ViewEncapsulation} from '@angular/core';
import {BaCard} from '../../theme/components';
import {PengajuanService} from './pengajuan.service';
import {Http, Response, HTTP_PROVIDERS, Headers} from '@angular/http';

@Component({
  selector: 'pengajuan',
  pipes: [],
  directives: [BaCard],
  providers: [PengajuanService, HTTP_PROVIDERS],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuan.scss')],
  template: require('./pengajuan.html')
})

export class Pengajuan {
  private nim: string = "G64130076";
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
  private creds: string = "";
  status;
  message;

  constructor(private http: Http, private pengajuanService: PengajuanService) {
  }

  onSubmit(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2, konsultasi_1: this.konsultasi_1, konsultasi_2: this.konsultasi_2,
    pertemuan_1: this.pertemuan_1, pertemuan_2: this.pertemuan_2, progress_1: this.progress_1, progress_2: this.progress_2, progress_3: this.progress_3, progress_4: this.progress_4});

    this.http.post("http://localhost:8000/ta/daftar", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )
  }

  radioLab(input){
    this.lab = input;
  }

  radio1(input){
    this.konsultasi_1 = input;
  }

  radio2(input){
    this.konsultasi_2 = input;
  }

  checkbox(input){
    if (input == 1){
      this.progress_1 = !this.progress_1;
    }

    if (input == 2){
      this.progress_2 = !this.progress_2;
    }

    if (input == 3){
      this.progress_3 = !this.progress_3;
    }

    if (input == 4){
      this.progress_4 = !this.progress_4;
    }
  }

}
