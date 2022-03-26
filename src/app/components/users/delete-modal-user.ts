import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Eliminar usuario</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>¿Confirma que desea eliminar al usuario {{user.firstname}} {{user.lastname}}?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cancelar</button>
      <button type="button" class="btn btn-danger" (click)="delete()">Eliminar</button>
    </div>
  `
})
export class DeleteModalUser {
  @Input() user: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {}

  delete(){
    this.userService.delete(this.user.id);
    this.activeModal.close();
    window.location.reload();
  }
}
