// import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
// declare var google;

// @Component({
// 	selector: 'app-map',
// 	templateUrl: './map.page.html',
// 	styleUrls: ['./map.page.scss']
// })
// export class MapPage implements OnInit {
// 	map;
// 	@ViewChild('mapElement') mapElement;
// 	constructor() {}
// 	ngOnInit(): void {}
// 	ngAfterContentInit(): void {
// 		this.map = new google.maps.Map(this.mapElement.nativeElement, {
// 			center: {lat: -34.397, lng: 150.644},
// 			zoom: 8
// 		});
// 	}
// }
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var google;
@Component({
	selector: 'app-map',
	templateUrl: './map.page.html',
	styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createDirectionForm();
  }

  ngOnInit() {
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    this.directionsDisplay.setMap(map);
  }

  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: formValues.source,
      destination: formValues.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}