import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/models/board';
import { Career } from 'src/app/models/career';
import { CareerStatistics } from 'src/app/models/career-statistics';
import { Subject } from 'src/app/models/subject';
import { BoardService } from 'src/app/services/board.service';
import { CareerStatisticsService } from 'src/app/services/career-statistics.service';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {

  constructor(private careerService: CareerService, private careerStatisticsService: CareerStatisticsService) { }

  careerForm = new FormGroup({
    name: new FormControl('', [ Validators.required])
  })

  get name() { return this.careerForm.get('name'); }

  ngOnInit(): void {
  }

  onSubmit(){

    let name: string = this.name.value
    let newCareerStatistics = new CareerStatistics(null, 0, 0);
    let statistics: CareerStatistics

    this.careerStatisticsService.add(newCareerStatistics)
      .then(response => console.log(response))
        
  }

}
