import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {

  careersList: Array<Career>

  constructor(private careerService: CareerService) { }

  ngOnInit(): void {

    this.careerService.getAll()
    .then(response =>{
      this.careersList = response;
    })
    .catch(err=>console.log(err));
  }

}
