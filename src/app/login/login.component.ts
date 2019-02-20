import {Component, OnInit} from '@angular/core';
import {NavbarService} from '../Services/navbar.service';
import {WebApiService} from '../Services/web-api.service';
import {CreateUserDto} from '../Models/DTO/create-user-dto';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {LoginUserDto} from '../Models/DTO/login-user-dto';

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
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.navBar.hide();

    this.http.checkAuthorisation().subscribe(r => {
      // debugger;
      this.router.navigateByUrl('/trips');
    });
  }

  toggleRegister() {
    this.viewRegister = !this.viewRegister;

  }

  switchLanguage() {
    if (this.translate.currentLang === 'fr') {
      this.translate.use('en');
    }
    else {
      this.translate.use('fr');
    }
  }

  register() {
    if (this.registerIsValid()) {
      let cud = new CreateUserDto(
        this.registerUserName,
        this.firstName,
        this.lastName,
        this.registerPassword);

      this.http.createUser(cud).subscribe(r => {
          this.http.loginUser(new LoginUserDto(this.registerUserName, this.registerPassword)).subscribe(r => {
            localStorage.setItem('Token', r.access_token);
            this.router.navigateByUrl('/trips');
          });
        },
        e => {
          if (e.status === 409) {
            this.translate.get('app.userNameAlreadyTaken').subscribe((res: string) => {
              alert(res);
            });
          }
          else {
            alert(e.status);
          }
        }
      );
    }
  }

  login() {
    if (this.loginIsValid()) {
      let lud = new LoginUserDto(
        this.loginUserName,
        this.loginPassword);

      this.http.loginUser(lud).subscribe(r => {
          localStorage.setItem('Token', r.access_token);
          this.router.navigateByUrl('/trips');
        },
        e => {
          if (e.status === 400) {
            this.translate.get('app.invalidUsernameOrPassword').subscribe((res: string) => {
              alert(res);
            });
          }
          else {
            alert(e.status);
          }
        });
    }
  }


  loginIsValid(): boolean {
    // vérifies si le nom d'utilisateur est valide avant l'envoi
    if (this.loginUsernameIsValid()) {
      this.translate.get('app.usernameLengthError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    // vérifies si le mot de passe est valide avant l'envoi
    else if (this.loginPasswordIsValid()) {
      this.translate.get('app.passwordLengthError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    else {
      return true;
    }
  }


  // si une des conditions de validation ne passe pas, retournes false
  registerIsValid(): boolean {

    // vérifies si le nom d'utilisateur est valide avant l'envoi
    if (this.usernameIsValid()) {
      this.translate.get('app.usernameLengthError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    // vérifies si le mot de passe est valide avant l'envoi
    else if (this.passwordIsValid()) {
      this.translate.get('app.passwordLengthError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    // vérifies si le mot de passe est valide avant l'envoi
    else if (!this.passwordConfirmIsValid()) {
      this.translate.get('app.passwordNotMatchingError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    // vérifies si le prénom est valide avant l'envoi
    else if (this.firstNameIsValid()) {
      this.translate.get('app.firstNameLengthError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    // vérifies si le nom de famille est valide avant l'envoi
    else if (this.lastNameIsValid()) {
      this.translate.get('app.lastNameLengthError').subscribe((res: string) => {
        alert(res);
      });
      return false;
    }
    // retourne un dto comme tout est valide
    else {
      return true;
    }
  }


  // vérifies si le nom d'utilisateur est valide avant l'envoi
  usernameIsValid(): boolean {
    this.registerUserName.trim();
    return (this.registerUserName.length > this.MAX_USERNAME_LENGTH ||
      this.registerUserName.length < this.MIN_USERNAME_LENGTH);
  }


  // vérifies si le nom d'utilisateur est valide avant l'envoi
  loginUsernameIsValid(): boolean {
    this.loginUserName.trim();
    return (this.loginUserName.length > this.MAX_USERNAME_LENGTH ||
      this.loginUserName.length < this.MIN_USERNAME_LENGTH);
  }


  // vérifies si le mot de passe est valide avant l'envoi
  passwordIsValid(): boolean {
    this.registerPassword.trim();
    return (this.registerPassword.length > this.MAX_PASSWORD_LENGTH ||
      this.registerPassword.length < this.MIN_PASSWORD_LENGTH);
  }


  // vérifies si le nom d'utilisateur est valide avant l'envoi
  loginPasswordIsValid(): boolean {
    this.loginPassword.trim();
    return (this.loginPassword.length > this.MAX_PASSWORD_LENGTH ||
      this.loginPassword.length < this.MIN_PASSWORD_LENGTH);
  }


  // vérifies si le mot de passe est le même que le mot de passe retapé
  passwordConfirmIsValid(): boolean {
    this.registerConfirm.trim();
    this.registerConfirm.trim();
    return (this.registerPassword === this.registerConfirm);
  }


  // vérifies si le prénom est valide avant l'envoi
  firstNameIsValid(): boolean {
    this.firstName.trim();
    return (this.firstName.length > this.MAX_NAME_LENGTH ||
      this.firstName.length < this.MIN_NAME_LENGTH);
  }


  // vérifies si le nom de famille est valide avant l'envoi
  lastNameIsValid(): boolean {
    this.lastName.trim();
    return (this.lastName.length > this.MAX_NAME_LENGTH ||
      this.lastName.length < this.MIN_NAME_LENGTH);
  }

}
