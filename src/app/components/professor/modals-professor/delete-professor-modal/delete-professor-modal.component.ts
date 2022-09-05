import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-delete-professor-modal',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Eliminar profesor</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p>¿Confirma que desea eliminar el professor {{professor.name}}? Tenga en cuenta que dejará de mostrarse como profesor de las materias a las que está asociado.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="delete()">Eliminar</button>
  </div>
`
})
export class DeleteProfessorModalComponent {
  @Input() professor : Professor
  @Output() isSuccessful = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private professorService: ProfessorService) { }


  delete(){
    this.professorService.delete(this.professor.id)
    .then(resp => this.isSuccessful.emit(true))
    .catch(err => this.isSuccessful.emit(false))
    
    this.activeModal.close();
  }

}
