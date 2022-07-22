import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-delete-career-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Eliminar carrera</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>¿Confirma que desea eliminar la carrera {{career.name}}? Al eliminarla también se eliminaran las materias y profesores asociados.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cancelar</button>
      <button type="button" class="btn btn-danger" (click)="delete()">Eliminar</button>
    </div>
  `
})
export class DeleteCareerModalComponent {
  @Input() career: Career;

  constructor(public activeModal: NgbActiveModal, private careerService: CareerService) { }

  delete(){
    this.careerService.delete(this.career.id);
    this.activeModal.close();
    window.location.reload();
  }

}
