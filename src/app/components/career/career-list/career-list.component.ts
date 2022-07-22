import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';
import { DeleteCareerModalComponent } from '../career-modals/delete-career-modal/delete-career-modal.component';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {

  careersList: Array<Career>

  constructor(private careerService: CareerService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.careerService.getAll()
    .then(response =>{
      this.careersList = response;
    })
    .catch(err=>console.log(err));
  }

  openDeleteModal(carrer: Career) {
    const modalRef = this.modalService.open(DeleteCareerModalComponent);
    modalRef.componentInstance.career = carrer;
  }

}
