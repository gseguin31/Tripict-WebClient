import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CreatePostDto} from '../Models/DTO/create-post-dto';
import {CreatePictureDto} from '../Models/DTO/create-picture-dto';
import {forEach} from '@angular/router/src/utils/collection';
import {TranslateService} from '@ngx-translate/core';
import {NavbarService} from '../Services/navbar.service';

class ImgUpload {
  status = 'waiting';

  constructor(public src: string) {
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './createPost.component.html',
  styleUrls: ['./createPost.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private  route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              private ref: ChangeDetectorRef,
              public navBar: NavbarService) {
  }

  text: string;
  // pictureURLS: string[];
  pictureURLS: ImgUpload[];
  currentPicAmount: number;
  currentlyUploading: boolean;

  MAX_PIC_AMOUNT: number;
  MAX_PIC_SIZE: number;

  ngOnInit() {
    this.navBar.show();

    this.pictureURLS = [];
    this.text = '';
    this.currentPicAmount = 0;
    this.currentlyUploading = false;

    this.MAX_PIC_AMOUNT = 10;
    this.MAX_PIC_SIZE = 5242880;

    this.apiService.checkAuthorisation().subscribe(r => {
      },
      e => {
        if (e.status === 401) {
          this.router.navigateByUrl('/login');
        }
      });
  }

  // Prépare les objets de transfert de la liste et les envoie
  upload() {
    for (let i = 0; i < this.pictureURLS.length; i++) {
    }
    // Ne permet pas l'envoi si rien n'est envoyé
    if (this.pictureURLS.length === 0 && this.text === '') {
      this.translate.get('app.alertPostCreate').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    this.currentlyUploading = true; // Indique que l'appel réseau est en attente de résolution
    // Crée le post puis envoie les images dedans de manière asynchrone
    let activityId = this.route.snapshot.paramMap.get('activityId');
    let actId = activityId as unknown;
    let p: CreatePostDto = new CreatePostDto(this.text, this.currentPicAmount, actId as number);
    this.apiService.addPost(p).subscribe(r => {
        if (this.currentPicAmount === 0) { // Si le post ne contient pas d'images
          this.goToPosts();
        }
        let id = r;
        let postsSent = 0;
        for (let i = 0; i < this.pictureURLS.length; i++) {
          let base64 = this.pictureURLS[i].src;
          let picToSend = new CreatePictureDto(base64, id); // Crée une string en base 64 pour représenter la photo
          this.pictureURLS[i].status = 'sending';
          this.apiService.addPicture(picToSend).subscribe(
            (res) => {
              this.pictureURLS[i].status = 'ok';
              postsSent++;
              if (postsSent === this.currentPicAmount) { // Vrai quand toutes les images on bien été envoyées
                this.currentlyUploading = false;
                this.ref.detectChanges();
                setTimeout((e) => { // Nécessaire pour donner le temps au spinners de se mettre à jour
                  this.goToPosts();
                }, 300);
              }
            },
            (err) => { // Code 401 quand la page est atteinte directement sans être connecté
              this.pictureURLS[i].status = 'failed';
              this.currentlyUploading = false;
              if (err.status === 401) {
                this.router.navigateByUrl('/');
              }
            }
          );
        }
      },
      e => { // Code 401 quand la page est atteinte directement sans être connecté
        if (e.status === 401) {
          this.router.navigateByUrl('/');
        }
      });
  }

  // Avertis l'utilisateur du succès du post et redirige vers la liste des posts
  goToPosts() {
    this.translate.get('app.alertPostWorks').subscribe((re: string) => {
      alert(re);
      this.ref.detectChanges();
      let tripId = this.route.snapshot.paramMap.get('tripId');
      let activityId = this.route.snapshot.paramMap.get('activityId');
      this.router.navigateByUrl('trip/' + tripId + '/activity/' + activityId + '/posts');
    });
  }

  // Ajoute les images sélectionnées à la liste, vérifie tout ce qui est choisi et affiche les images dans la page
  // Déclenché lors d'un changement dans le file input
  previewImage(files) {

    // Vérifie que des fichiers on été sélectionnés
    if (files.length === 0) {
      return;
    }

    // Parcours les fichiers sélectionnés
    for (let i = 0; i < files.length; i++) {

      // Vérifie que le nombre maximum d'image n't pas été atteint
      if (this.currentPicAmount >= this.MAX_PIC_AMOUNT) {
        this.translate.get('app.alertImageAmount').subscribe((res: string) => {
          alert(res);
        });
        return;
      }

      // Vérifie que le fichier est de type image
      let mimeType = files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.translate.get('app.alertImageType').subscribe((res: string) => {
          alert(res);
        });
        // Vérifie que la taille maximum est respectée
      } else if (files[i].size > this.MAX_PIC_SIZE) {
        this.translate.get('app.alertImageSize').subscribe((res: string) => {
          alert(res);
        });
        // Ajoute les URLs des fichiers à la liste
      } else {
        let readerFor = new FileReader();
        readerFor.readAsDataURL(files[i]);
        this.currentPicAmount++;
        // La liste des URLs est lue pour les aperçus des images dans la page
        readerFor.onload = (event) => {
          let picAdd = new ImgUpload(<any>readerFor.result);
          this.pictureURLS.push(picAdd);
          // console.log(this.pictureURLS);
        };
      }
    }
  }
}
