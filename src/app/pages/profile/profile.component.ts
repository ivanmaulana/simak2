import {Component, ViewEncapsulation, OnInit} from '@angular/core';

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
  private alamat_ortu;

  private creds;
  private status;
  private message;

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };

  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };

  ngOnInit() {
    this.authHttp.get(this.service.urlProfile)
      .map(res => res.json())
        .subscribe( data => {
          this.no = data[0]['no_hp'];
          this.email = data[0]['email'];
          this.alamat = data[0]['alamat'];
          this.nama_ayah = data[0]['nama_ayah'];
          this.nama_ibu = data[0]['nama_ibu'];
          this.alamat_ortu = data[0]['alamat_ortu'];
          this.no_ortu = data[0]['no_ortu'];
        })
  }

  constructor(private authHttp: AuthHttp, private service: MahasiswaService, private toastr: ToastsManager) {
    this.nama = this.service.nama;
    this.nim = this.service.nim;

  }

  simpan() {
    this.creds = JSON.stringify({nim: this.nim, alamat: this.alamat, no_hp: this.no, email: this.email, nama_ayah: this.nama_ayah,
    nama_ibu: this.nama_ibu, no_ortu: this.no_ortu, alamat_ortu: this.alamat_ortu});

    this.authHttp.post(this.service.urlProfile, this.creds)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.status = data['status'];
        this.message = data['message'];

        if (this.status) this.showSuccess();
        else this.showError();
      }
    )
  }

  showError() {
    this.toastr.error('Gagal Update Profile', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Berhasil Update Profile", 'Success !');
  }

}
