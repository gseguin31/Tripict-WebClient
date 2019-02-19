import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Cette classe est injectée dans les autres components pour indiquer si la navbar doit être affichée ou non
export class NavbarService {

  visible: boolean;

  constructor() {
    this.visible = false;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
