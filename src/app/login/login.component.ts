import {Component, OnInit} from '@angular/core';
import {NavbarService} from '../Services/navbar.service';
import {WebApiService} from '../Services/web-api.service';
import {CreateUserDto} from '../Models/DTO/create-user-dto';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  viewRegister = false;
  registerPassword = '';
  registerConfirm = '';
  firstName = '';
  lastName = '';
  registerUserName = '';
  loginUserName = '';
  loginPassword = '';

  MAX_USERNAME_LENGTH = 35;
  MIN_USERNAME_LENGTH = 5;
  MIN_PASSWORD_LENGTH = 8;
  MAX_PASSWORD_LENGTH = 35;
  MIN_NAME_LENGTH = 1;
  MAX_NAME_LENGTH = 50;


  constructor(public http: WebApiService,
              public navBar: NavbarService,
              private translate: TranslateService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.navBar.hide();
  }

  toggleRegister() {
    this.viewRegister = !this.viewRegister;

  }

  register() {
    if (this.validDto()) {

      this.http.createUser(this.validDto()).subscribe(r => {
          this.router.navigateByUrl('/trips');
        },
        e => {
          alert(e);
        }
      );
    }
  }

  login() {
          this.router.navigateByUrl('/trips');
  }


  // si une des conditions de validation ne passe pas, retournes false
  // si tout est bon, retourne un CreateUserDTO.
  // si jamais on appelle cette méthode dans un if, retournes true si l'objet
  // existe (objet qui sera créé apres àvoir tout valider.
  validDto(): any {

    console.log(this.lastName);
    this.firstName.trim();
    this.lastName.trim();
    this.registerUserName.trim();
    this.registerPassword.trim();
    console.log(this.registerUserName);
    // vérifies si le nom d'utilisateur est valide avant l'envoi
    if (this.registerUserName.length > this.MAX_USERNAME_LENGTH ||
      this.registerUserName.length < this.MIN_USERNAME_LENGTH) {
      this.translate.get('app.usernameLengthError').subscribe((res: string) => {
        alert(res);
        return false;
      });
    }

    // vérifies si le mot de passe est valide avant l'envoi
    if (this.registerPassword.length > this.MAX_PASSWORD_LENGTH ||
      this.registerPassword.length < this.MIN_PASSWORD_LENGTH) {
      this.translate.get('app.passwordLengthError').subscribe((res: string) => {
        alert(res);
        return false;
      });
    }

    // vérifies si le prénom est valide avant l'envoi
    if (this.firstName.length > this.MAX_NAME_LENGTH ||
      this.firstName.length < this.MIN_NAME_LENGTH) {
      this.translate.get('app.firstNameLengthError').subscribe((res: string) => {
        alert(res);
        return false;
      });
    }

    // vérifies si le nom de famille est valide avant l'envoi
    if (this.lastName.length > this.MAX_NAME_LENGTH ||
      this.lastName.length < this.MIN_NAME_LENGTH) {
      this.translate.get('app.lastNameLengthError').subscribe((res: string) => {
        alert(res);
        return false;
      });
    }

    // retourne un dto comme tout est valide
    return new CreateUserDto(
      this.registerUserName,
      this.firstName,
      this.lastName,
      this.registerPassword);

  }

}
