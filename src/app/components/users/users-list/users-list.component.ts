import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { Toast } from 'src/app/models/toast';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userSelectedToChangeState : User;
  userList : Array<User>;
  filterPost = '';
  toasts: Array<Toast> = new Array<Toast>();
  
  constructor(private userService: UserService, private modalService: NgbModal, private authService : AuthService) { }

  ngOnInit(): void {

    this.userService.getAll(this.authService.token)
      .then(response =>{
        this.userList = response;
      })
      .catch(err=>console.log(err));
  }

  changeStateUserSelected(modal)
  {
    this.userService.changeState(this.userSelectedToChangeState.id, this.authService.token)
      .then(responseChangeStateUser=>{
        this.userSelectedToChangeState.active = !this.userSelectedToChangeState.active;
        const index = this.userList.findIndex(u => u.id == this.userSelectedToChangeState.id);
        this.userList[index] = this.userSelectedToChangeState;
        this.showSuccessToast(this.userSelectedToChangeState.active ? "El usuario se activo correctamente" : "El usuario se inactivo correctamente");
      })
      .catch(responseChangeStateUserError=>{
        console.log(responseChangeStateUserError);
        this.showSuccessToast(this.userSelectedToChangeState.active ? "Ha ocurrido un error al activar el usuario" : "Ha ocurrido un error al desactivar el usuario");
        this.showSuccessToast("Ha ocurrido un error al " + this.userSelectedToChangeState.active ? "activar" : "inactivar" + " el usuario");
      })
      .finally(()=>{
        modal.dismiss();
      });
  }

  setUserToChangeState(user,content)
  {
    this.userSelectedToChangeState = user;
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
}
