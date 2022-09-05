import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { DeleteProfessorModalComponent } from '../modals-professor/delete-professor-modal/delete-professor-modal.component';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  professorList: Array<Professor>
  showToastSuccess : boolean = false;
  showToastError: boolean = false;

  constructor(private professorService: ProfessorService, private modalService : NgbModal) { }

  ngOnInit(): void {

    this.professorService.getAll(100, 0)
    .then(response =>{
      this.professorList = response;
    })
    .catch(err=>console.log(err));
  }

  openDeleteModal(professor: Professor) {
    const modalRef = this.modalService.open(DeleteProfessorModalComponent);
    modalRef.componentInstance.professor = professor;
    modalRef.componentInstance.isSuccessful.subscribe(($e) => {
      console.log($e)
      if ($e){
        this.showToastSuccess = true;
        window.location.reload()
      }
    })
  }
}
