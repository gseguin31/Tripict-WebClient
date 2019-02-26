import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebApiService} from './web-api.service';

@Injectable({
  providedIn: 'root'
})

// Cette classe est injectée dans les autres components pour indiquer si la navbar doit être affichée ou non
export class NavbarService {

  visible: boolean;
  public firstName;
  public lastName;

  constructor(public apiService: WebApiService) {
    this.visible = false;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  getUserInfo(){
    this.apiService.getCurrentUserInfo().subscribe( r => {
      this.firstName = r.firstName;
      this.lastName = r.lastName;
    });
  }
}
