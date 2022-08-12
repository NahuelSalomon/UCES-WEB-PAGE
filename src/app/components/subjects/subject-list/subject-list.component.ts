import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { DeleteSubjectModalComponent } from '../subject-modals/delete-subject-modal/delete-subject-modal.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjectList: Array<Subject>

  constructor(private subjectService : SubjectService, private modalService: NgbModal) { }

  ngOnInit(): void {

      this.subjectService.getAll(100, 0)  //TODO Modificar para la paginación
        .then(response => {

          response.forEach(subject =>
            this.subjectService.getCorrelativesById(subject.id)
            .then(response => {
              subject.correlatives = response
            })
            .catch(error => console.log(error))
          )
          this.subjectList = response
        })
        .catch(error => console.log(error))

  }
  
  openDeleteModal(subject: Subject) {
    const modalRef = this.modalService.open(DeleteSubjectModalComponent);
    modalRef.componentInstance.subject = subject;
  }

}
