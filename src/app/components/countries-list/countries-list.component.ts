import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { MhealthService } from 'src/app/services/mhealth.service';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit, OnDestroy, AfterViewInit  {


  countries: Country[] = [];
  selectedCountries: string[] = [];
  map: any;
  currentMarkers: any[] = [];
  
  constructor(private mhealthService: MhealthService) { 
  }

  ngOnInit(): void {
   this.getCountries();
  }

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnDestroy() {
    this.map.remove();
  };


  getCountries(): void {
    this.mhealthService.getCountriesList().subscribe(
      data =>{
        this.countries = data;
        if(this.map && this.countries){
          this.removeAllMarkers();
          this.setMarkers();
        }
      }
    )
  }

  private removeAllMarkers(): void {
    this.selectedCountries = [];

    this.currentMarkers.forEach( marker => {
      this.map.removeLayer(marker);
    });
  }

  private setMarkers(): void {
    this.countries.forEach(country => {
      if(country && country.selected){
        this.selectedCountries.push(country?.name ?? '');
        this.setMarkerIfSelectedCountry(country);
      }
    });
  }

  private setMarkerIfSelectedCountry(country: Country): void {
    if(country.selected && country.latitude && country.longitude){
      let marker = L.marker([country.latitude, country.longitude]);
      this.currentMarkers.push(marker);
      marker.addTo(this.map);
    }
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

  }

}
