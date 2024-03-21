import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Career } from 'src/app/models/career';
import { Toast } from 'src/app/models/toast';
import { CareerService } from 'src/app/services/career.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {

  careerSelectedToDelete: Career;
  careersList: Array<Career>;
  toasts: Array<Toast> = new Array<Toast>();

  constructor(private careerService: CareerService, private modalService: NgbModal, private communicationService: CommunicationService, private authService : AuthService) { }

  ngOnInit(): void {

    this.careerService.getAll()
    .then(response =>{
      this.careersList = response;
    })
    .catch(err=>console.log(err));
  }

  setCareerToDelete(carrer: Career, content) {
    this.careerSelectedToDelete = carrer;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  
    }, (reason) => { /*Modal no exitoso*/ });
  }

  showSuccessToast(toastBody: string)
  {
    this.toasts.push({class: "success-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-circle-check"});
  }

  showErrorToast(toastBody: string)
  {
    this.toasts.push({class: "error-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-circle-xmark"});
  }

  showWarningToast(toastBody: string)
  {
    this.toasts.push({class: "warning-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-triangle-exclamation"});
  }

  removeToast(toast)
  {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }

  receiveMessageEventAddCareer($event)
  {
    if($event)
    {
      this.communicationService.triggerReloadCareers();               
      this.careersList.push($event);
      this.showSuccessToast("La carrera se ha agregado correctamente");
    } else
    {
      this.showErrorToast("Ha ocurrido un error al agregar la carrera");
    }
  }

  deleteCareerSelected(modal)
  {
    if(this.careerSelectedToDelete != null)
    {
      this.careerService.delete(this.careerSelectedToDelete.id, this.authService.token)
      .then(() => {
        const index = this.careersList.indexOf(this.careerSelectedToDelete);
        this.careersList.splice(index,1);
        this.communicationService.triggerReloadCareers();      
        this.showSuccessToast("La carrera se ha eliminado con éxito");
      })
      .catch(err => {
        console.log(err);
        this.showErrorToast("Ha ocurrido un error al eliminar la carrera");
      })
      .finally(()=>{
        modal.dismiss();
      });
    }

  }

}
