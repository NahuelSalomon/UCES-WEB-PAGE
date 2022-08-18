import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Career } from 'src/app/models/career';
import { Subject } from 'src/app/models/subject';
import { CareerService } from 'src/app/services/career.service';
import { SubjectService } from 'src/app/services/subject.service';
import { DeleteSubjectModalComponent } from '../subject-modals/delete-subject-modal/delete-subject-modal.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  careerList: Array<Career>
  selectedCareer: Career
  subjectList: Array<Subject>

  constructor(private subjectService : SubjectService, private careerService: CareerService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.careerService.getAll()
      .then(response => {
        this.careerList = response
        this.selectedCareer = response[0]
        this.loadSubjectsByCareer(this.selectedCareer.id)
      })
      .catch(error => console.log(error))
  }

  loadSubjectsByCareer(id: number){
    this.subjectService.getByCareer(this.selectedCareer.id)
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

  careerChange(id: string){
    this.selectedCareer = this.careerList.find(career => career.id == Number.parseInt(id))
    this.loadSubjectsByCareer(this.selectedCareer.id)
  }

}
