import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Career } from 'src/app/models/career';
import { Subject } from 'src/app/models/subject';
import { CareerService } from 'src/app/services/career.service';
import { SubjectService } from 'src/app/services/subject.service';
import { DeleteSubjectModalComponent } from '../subject-modals/delete-subject-modal/delete-subject-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  careerList: Array<Career>
  selectedCareer: Career
  subjectList: Array<Subject>
  career : Career;
  subjectSelectedToDelete : Subject;
  toasts: Array<Toast> = new Array<Toast>();

  constructor(private subjectService : SubjectService, private careerService: CareerService, private modalService: NgbModal, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => 
      {
        const careerId = params.id;
        this.careerService.getById(careerId)
          .then(careerResponse=>{
            this.career = careerResponse;
            this.subjectService.getByCareer(this.career.id)
              .then(subjectResponse => {
                this.subjectList = subjectResponse;
              })
              .catch(subjectResponseError =>{

              });

          })
          .catch(careerResponseError=>{

          });

      });
   
  }

  setSubjectToDelete(subject, content)
  {
    this.subjectSelectedToDelete = subject;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  
    }, (reason) => { /*Modal no exitoso*/ });
  }

  careerChange(id: string){
    this.selectedCareer = this.careerList.find(career => career.id == Number.parseInt(id))
    //this.loadSubjectsByCareer(this.selectedCareer.id)
  }

  deleteSubjectSelected(modal)
  {
    if(this.subjectSelectedToDelete != null)
    {
      this.subjectService.delete(this.subjectSelectedToDelete.id)
      .then(() => {
        const index = this.subjectList.indexOf(this.subjectSelectedToDelete);
        this.subjectList.splice(index,1);      
        this.showSuccessToast("La materia se ha eliminado con éxito");
      })
      .catch(err => {
        console.log(err);
        this.showErrorToast("Ha ocurrido un error al eliminar la materia");
      })
      .finally(()=>{
        modal.dismiss();
      });
    }
  }

  receiveMessageEventAddSubject($event)
  {
    if($event)
    {
      this.subjectList.push($event);
      this.showSuccessToast("La materia se ha agregado conrrectamente");
    }
    else
    {
      this.showErrorToast("No se ha podido agregar la materia correctamente");
    }
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

}
