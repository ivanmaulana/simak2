import {Component, ViewEncapsulation, OnInit, NgZone } from '@angular/core';

import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {MahasiswaService} from '../service';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';
import {BaPictureUploader} from '../../theme/components';

@Component({
  selector: 'profile',
  pipes: [BaAppPicturePipe],
  providers: [MahasiswaService, ToastsManager],
  directives: [BaCard, BaPictureUploader],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html')
})

export class Profile implements OnInit{

  private nim;
  private nama;

  private no;
  private alamat;
  private email;
  private nama_ayah;
  private nama_ibu;
  private no_ortu;
  private telp_ortu;
  private alamat_ortu;

  private creds;
  private status;
  private message;
  zone: NgZone;

  response;
  progress;

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'http://simak.apps.cs.ipb.ac.id/upload/filePhoto/foto-'+this.service.nim+'-'+this.service.nama+'.png'
  };

  public uploaderOptions:any = {
    url: 'http://simak.apps.cs.ipb.ac.id/upload/photo.php',
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: '',
    filterExtensions: true,
    allowedExtensions: ['image/png', 'image/jpg'],
    calculateSpeed: true,
  };

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    });
  }

  ngOnInit() {
    this.getConnection();
    this.getProfile();

  }

  private noConn = 0;
  private statusConn = 0;
  getConnection() {
    this.noConn = 0;

    // console.log('cek koneksi');

    this.authHttp.get(this.service.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        this.statusConn = data['status'];
        // console.log(this.status);
      })

    setTimeout(() => {
      if (!this.statusConn) {
        this.statusConn = 0;
        this.noConn = 1;
        this.showNoConn();
      }
    }, 5000)
  }

  refresh() {
    this.getConnection();
    this.getProfile();
    // this.getDataPengajuan();
  }

  showNoConn() {
    this.toastr.warning("No Internet Connection", 'Error');
  }

  constructor(private authHttp: AuthHttp, private service: MahasiswaService, private toastr: ToastsManager) {
    this.nama = this.service.nama;
    this.nim = this.service.nim;

  }

  simpan() {
    let koneksi = 0;

    this.authHttp.get(this.service.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        koneksi = data['status'];

      })

    this.creds = JSON.stringify({nim: this.nim, alamat: this.alamat, hp: this.no, email: this.email, namaayah: this.nama_ayah,
    namaibu: this.nama_ibu, noortu: this.no_ortu, telportu: this.telp_ortu, alamatortu: this.alamat_ortu});

    // console.log(this.creds);

    if(!this.alamat || !this.email || !this.no || !this.nama_ayah || !this.nama_ibu || !this.no_ortu || !this.telp_ortu || !this.alamat_ortu) {
      this.showKurang();
    }
    else {
      this.authHttp.post(this.service.urlProfile, this.creds)
        .map(res => res.json())
        .subscribe(data => {
          // console.log(data);
          this.status = data['status'];
          this.message = data['message'];

          if (this.status) this.showSuccess();
          else this.showError();
        }
      )
    }

    setTimeout(() => {
      if (!koneksi) {
        this.showNoConn();
      }
    }, 2000)

  }

  getProfile() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.authHttp.get(this.service.urlProfile)
      .map(res => res.json())
        .subscribe( data => {

          this.no = data[0]['hp'];
          this.email = data[0]['email'];
          this.alamat = data[0]['alamat'];
          this.nama_ayah = data[0]['namaayah'];
          this.nama_ibu = data[0]['namaibu'];
          this.alamat_ortu = data[0]['alamatortu'];
          this.no_ortu = data[0]['noortu'];
          this.telp_ortu = data[0]['telportu'];
        })
  }

  showError() {
    this.toastr.error('Gagal Update Profile', 'Error!');
  }

  showKurang() {
    this.toastr.error('Data Belum Lengkap', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Berhasil Update Profile", 'Success !');
  }

}
