import {Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {} from 'googlemaps';

@Component({
  selector: 'app-autocomplete',
  template: `
    <input class="input"
           type="text"
           [(ngModel)]="autocompleteInput"
           placeholder="{{ 'app.tripPlace' | translate }}"
           #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
    >
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      /*console.log(place);
      console.log(lat);
      console.log(lng);*/
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

}
