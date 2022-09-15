import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { EditProfessorComponent } from '../edit-professor/edit-professor.component';
import { DeleteProfessorModalComponent } from '../modals-professor/delete-professor-modal/delete-professor-modal.component';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  professorList: Array<Professor>
  showToastSuccess : Boolean = false;
  showToastError: Boolean = false;
  toastMessage: String = ''

  constructor(private professorService: ProfessorService, private modalService : NgbModal) { }

  ngOnInit(): void {

    const addSuccess = sessionStorage.getItem('addSuccess')

    this.checkForToastMessages('deleteSuccess', 'El profesor se ha eliminado correctamente', 'Se ha producido un error, no se pudo eliminar el profesor')
    this.checkForToastMessages('addSuccess', 'El profesor se ha añadido correctamente', 'Se ha producido un error, no se pudo añadir el nuevo profesor')                          
    this.checkForToastMessages('updateSuccess', 'El profesor se ha actualizado correctamente', 'Se ha producido un error, no se pudo actualizar el profesor')                          


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

  openEditModal(professor: Professor){
    const modalRef = this.modalService.open(EditProfessorComponent, {centered:true, size:'xl'});
    modalRef.componentInstance.professor = professor;
  }

  isTrue(success : string) : boolean{
    return success === '1'
  }
  
  checkForToastMessages(operationName: string, successMessage: string, errorMessage: string): void{
    const operation = sessionStorage.getItem(operationName)
    if (operation!=null){
      this.toastMessage = this.isTrue(operation) ? successMessage : errorMessage
      this.isTrue(operation) ? this.showToastSuccess = true : this.showToastError = true
      sessionStorage.removeItem(operationName)
    }
  }
}
