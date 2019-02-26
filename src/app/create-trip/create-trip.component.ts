import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebApiService} from '../Services/web-api.service';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogData} from '../interfaces/dialog-data';
import {TranslateService} from '@ngx-translate/core';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';
import {CreateTripDto} from '../Models/DTO/create-trip-dto';
import {DisplayTripDto} from '../Models/DTO/display-trip-dto';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<CreateTripComponent>,
              private router: Router,
              public zone: NgZone,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  name: string;
  latitude: number;
  longitude: number;

  address: Object;

  formattedAddress: string;

  phone: string;

  ngOnInit() {
    this.navBar.show();
    this.name = '';
    this.latitude = 0.0;
    this.longitude = 0.0;
  }

  upload() {
    const trimmedName = this.name.trim();
    if (trimmedName.length <= 0 || trimmedName.length > 35) { // Validation de longueur du nom du voyage
      this.translate.get('app.alertTripLength').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    let dto = new CreateTripDto(trimmedName, this.latitude, this.longitude);
    this.apiService.addTrip(dto).subscribe((r) => {
        this.translate.get('app.alertTripCreate').subscribe((res: string) => {
          alert(res);
          this.dialogRef.close();
        });
      },
      (e) => {
        if (e.status === 401) { // Code 401 si la page est atteinte directement sans être connecté
          this.router.navigateByUrl('/login');
          this.dialogRef.close();
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  getAddress(place: any) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }
}
