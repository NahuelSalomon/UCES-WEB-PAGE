import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-delete-subject-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Eliminar materia</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>¿Confirma que desea eliminar la materia {{subject.code}} {{subject.name}}? Tenga en cuenta que dejará de mostrarse como correlativa en las materias que corresponda.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cancelar</button>
      <button type="button" class="btn btn-danger" (click)="delete()">Eliminar</button>
    </div>
  `
})
export class DeleteSubjectModalComponent {
  @Input() subject: Subject;

  constructor(public activeModal: NgbActiveModal, private subjectService: SubjectService) { }

  delete(){
    this.subjectService.delete(this.subject.id);
    this.activeModal.close();
    window.location.reload();
  }

}
