import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../models/country';
import { DimensionOption, Fact, GHOOption, SourceData } from '../models/source_data';
import { geographicData } from 'src/assets/data/latitudes_longitudes';

@Injectable({
  providedIn: 'root'
})
export class MhealthService {

  mhealthData: SourceData = {};
  countriesList: BehaviorSubject<Country[]>;
  optionsList: BehaviorSubject<GHOOption[]>;


  constructor(private httpClient: HttpClient) { 
    this.countriesList = new BehaviorSubject<Country[]>([]);
    this.optionsList = new BehaviorSubject<GHOOption[]>([]);

    this.httpClient.get("assets/data/data.json").subscribe(data =>{
      this.mhealthData = data;
      this.processData();
    })
  }

  processData(): void {
    let countriesInData: Country[] = [];
    let ghoInData: GHOOption[] = [];
    if(this.mhealthData && this.mhealthData.fact){
      this.mhealthData.fact.forEach(fact=> {
        countriesInData = this.processFactCountry(fact, countriesInData);
        ghoInData = this.processGHO(fact, ghoInData);
      });
    }
    
    this.countriesList.next(countriesInData);
    this.optionsList.next(ghoInData);
  }

  processFactCountry(fact: Fact, countriesInData: Country[]): Country[] {
    if(fact && fact.dim && fact.dim.COUNTRY && fact.dim.COUNTRY.length > 0){
      const repeatedObject = countriesInData.filter(x=>x.name?.toLowerCase() === fact.dim?.COUNTRY?.toLowerCase());
      const countryGeographicalData = geographicData.filter(x => x.name?.toLowerCase() === fact.dim?.COUNTRY?.toLowerCase())[0];
      
      if((!repeatedObject || repeatedObject.length === 0) && countryGeographicalData){
        const currentCountry = {
          name: fact.dim.COUNTRY,
          latitude: countryGeographicalData.latitude,
          longitude: countryGeographicalData.longitude,
          selected: false,
          optionsSelected: []
        }
  
        countriesInData.push(currentCountry);
      }
    }

    return countriesInData;
  }

  processGHO(fact: Fact, ghoInData: GHOOption[]): GHOOption[] {
    if(fact && fact.dim && fact.dim.GHO && fact.dim.GHO.length > 0){
      const repeatedObject = ghoInData.filter(x=>x.display?.toLowerCase() === fact.dim?.GHO?.toLowerCase());
      const currentGHO= {
        label: 'options.' + fact.dim.GHO.toLowerCase().replaceAll(' ','_'),
        display: fact.dim.GHO,
        checked: false
      }

      if(!repeatedObject || repeatedObject.length === 0){
        ghoInData.push(currentGHO);
      }
    }

    return ghoInData;
  }

  getCountriesList(): Observable<Country[]>{
    return this.countriesList.asObservable();
  }

  getOptionsList(): Observable<DimensionOption[]>{
    return this.optionsList;
  }

  setOptionsSelected(optionsSelected: GHOOption[]): void {

    let countriesList = this.countriesList.getValue();
    countriesList.forEach(country => {
      country.optionsSelected = [];
    })
    const optionsToTest = optionsSelected.map(option => option.display ?? '');

    if(countriesList && countriesList.length > 0){
      this.mhealthData.fact?.filter(fact => {
        const currentGHO = fact.dim?.GHO ?? '';
        const isYesValue = fact.Value?.toUpperCase() === "YES";
        const ghoAsOptionIndex = optionsToTest.indexOf(currentGHO);
        const currentCountry= countriesList.filter(country => country.name?.toLocaleLowerCase() === fact.dim?.COUNTRY?.toLocaleLowerCase());

        if(currentCountry && currentCountry.length > 0 && ghoAsOptionIndex > -1) { //país está en la lista de seleccionados y este dato es del ghoAsOptionIndex
          const currentCountryIndex = countriesList.indexOf(currentCountry[0]);

          if(countriesList[currentCountryIndex].optionsSelected){
            countriesList[currentCountryIndex].optionsSelected?.push(isYesValue);
          } else {
            countriesList[currentCountryIndex].optionsSelected= [isYesValue];
          }
          
        }
      });

      countriesList.forEach(country => {
        country.selected = country.optionsSelected?.every( selected=> selected);
      });
    }

    this.countriesList.next(countriesList);
  }
}
