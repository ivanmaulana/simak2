import {Component, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {BaCard} from '../../theme/components';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'taAdmin',
  host: {'(document:click)': 'handleClick($event)',},
  directives: [BaCard],
  providers: [ToastsManager],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./taAdmin.scss')],
  template: require('./taAdmin.html')
})
export class TaAdmin implements OnInit {

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
  private dataDosen: string;
  private status: boolean;
  private message: string;

  private count;
  private dosen = [];
  private query;
  private query2;
  private filteredList = [];
  private filteredList2 = [];
  private c : boolean = true;
  private c2 : boolean = true;
  private elementRef;

  private dataMahasiswa;
  private query3;
  private mahasiswa = [];
  private filteredListMahasiswa = [];

  foto;

  ngOnInit(){
    this.getDataTA();
  }

  peopleTableData:Array<any>;

  constructor(private http: Http, private myElement: ElementRef, private authHttp: AuthHttp, private toastr: ToastsManager) {
    this.elementRef = myElement;
    this.getDataDosen();
  }

  getDataDosen(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/dosen')
      .map(res => res.json())
        .subscribe( data => {
          this.count = data[0]['id'];
          this.dataDosen = data;
          for (var i = 0; i < this.count; i++){
            this.dosen.push(data[i]['nama']);
          }

          // console.log(this.dosen);
        })
  }

  getIdDosen(item){
    let id;
    for (var i = 0; i < this.count; i++){
      if (item === this.dataDosen[i]['nama'])
      id =  this.dataDosen[i]['id'];
    }
    return id;
  }

  getDataTA(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/ta/daftar/list')
      .map(res => res.json())
      .subscribe(data => {
        this.dataMahasiswa = data;
        // console.log(data);

        for( var i = 0; i < data.length; i++) {
          this.mahasiswa.push(data[i]['nama']);
        }

        // console.log(this.mahasiswa);
      })
  }

  openProfile(input){
    // console.log(this.query3);

    let creds = JSON.stringify({nama: this.query3});

    this.authHttp.post('http://simak.apps.cs.ipb.ac.id:2016/ta/penentuan', creds)
      .map(res => res.json())
      .subscribe(data => {
        this.nim = data[0]['nim'];
        this.nama = data[0]['nama'];
        this.topik = data[0]['topik'];
        this.lab = data[0]['lab'];
        this.dosen_1 = data[0]['dosen_1'];
        this.dosen_2 = data[0]['dosen_2'];
        this.query = data[0]['dosen1'];
        this.query2 = data[0]['dosen2'];

        if (this.query) this.c = false;
        if (this.query2) this.c2 = false;

        this.foto = 'http://simak.apps.cs.ipb.ac.id/upload/filePhoto/foto-'+this.nim+'-'+this.nama+'.png';
      })
  }

  simpan(){
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2});

    this.authHttp.put("http://simak.apps.cs.ipb.ac.id:2016/ta/edit/", this.creds)
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


  filterNama() {
    if (this.query3 !== "" && this.query3.length > 2){
        this.filteredListMahasiswa = this.mahasiswa.filter(function(el){
            return el.toLowerCase().indexOf(this.query3.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredListMahasiswa = [];
    }
  }

  selectNama(item){
      this.query3 = item;
      this.filteredListMahasiswa = [];
      // this.c = !this.c;
  }

  resetNama(){
    this.c = true;
    this.query = "";
    this.dosen_1 = "0";
  }

  filter() {
    if (this.query !== "" && this.query.length > 2){
        this.filteredList = this.dosen.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }

  select(item){
      this.query = item;
      this.filteredList = [];
      this.c = !this.c;

      this.dosen_1 = this.getIdDosen(this.query);
  }

  reset(){
    this.c = true;
    this.query = "";
    this.dosen_1 = "0";
  }

  filter2() {
    if (this.query2 !== "" && this.query2.length > 2){
        this.filteredList2 = this.dosen.filter(function(el){
            return el.toLowerCase().indexOf(this.query2.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList2 = [];
    }
  }

  select2(item){
      this.query2 = item;
      this.filteredList2 = [];
      this.c2 = !this.c2;

      this.dosen_2 = this.getIdDosen(this.query2);
  }

  reset2(){
    this.c2 = true;
    this.query2 = "";
    this.dosen_2 = "0";
  }

  handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
  }

  showError() {
    this.toastr.error('Update Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Penentuan TA Berhasil", 'Success !');
  }


}
