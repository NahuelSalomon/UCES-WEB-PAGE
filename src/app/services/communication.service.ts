import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public reloadCareers: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  triggerReloadCareers() {
    this.reloadCareers.emit(true);
  }

}
