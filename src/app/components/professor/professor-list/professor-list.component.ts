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
  toastMessage: string = ''

  constructor(private professorService: ProfessorService, private modalService : NgbModal) { }

  ngOnInit(): void {

    const deleteSuccess = sessionStorage.getItem('deleteSuccess')
    const addSuccess = sessionStorage.getItem('addSucess')

    if (deleteSuccess!=null){
      this.toastMessage = this.isTrue(deleteSuccess) ? 'El profesor se ha eliminado correctamente' : 'Se ha producido un error, no se pudo eliminar el profesor'
      this.isTrue(deleteSuccess) ? this.showToastSuccess = true : this.showToastError = true
      sessionStorage.removeItem('deleteSuccess')
    }
    if (addSuccess!=null){
      this.toastMessage = this.isTrue(addSuccess) ? 'El profesor se ha añadido correctamente' : 'Se ha producido un error, no se pudo añadir el nuevo profesor'
      this.isTrue(addSuccess) ? this.showToastSuccess = true : this.showToastError = true
      sessionStorage.removeItem('addSuccess')
    }

    this.professorService.getAll(100, 0)
    .then(response =>{
      this.professorList = response;
    })
    .catch(err=>console.log(err));
  }

  openDeleteModal(professor: Professor) {
    const modalRef = this.modalService.open(DeleteProfessorModalComponent);
    modalRef.componentInstance.professor = professor;
  }

  isTrue(success : string) : boolean{
    return success === '1'
  }
}
