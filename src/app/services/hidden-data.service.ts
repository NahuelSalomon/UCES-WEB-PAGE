import { Injectable } from '@angular/core';
import { HiddenData } from '../models/hidden-data';

@Injectable({
  providedIn: 'root'
})
export class HiddenDataService {

  private hiddenData: HiddenData;

  constructor() { }

  receiveData(hiddenData: HiddenData)
  {  
    this.hiddenData = hiddenData; 
  }

  getData()
  {
    return this.hiddenData;
  }

  clearData()
  {
    this.hiddenData = null;
  }
}
