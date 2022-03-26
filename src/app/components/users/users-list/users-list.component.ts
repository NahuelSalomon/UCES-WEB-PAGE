import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DeleteModalUser } from '../delete-modal-user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList : Array<User>;
  filterPost = '';
  
  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.userService.getAll()
      .then(response =>{
        this.userList = response;
      })
      .catch(err=>console.log(err));
  }

  open(user: User) {
    const modalRef = this.modalService.open(DeleteModalUser);
    modalRef.componentInstance.user = user;
  }

}
