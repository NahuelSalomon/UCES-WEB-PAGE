import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent implements OnInit {

  constructor(private route :ActivatedRoute, private careerService: CareerService) { }

  career: Career;

  ngOnInit(): void {      
    
    this.route.params.subscribe(params => {

      this.careerService.getById(params.id)
        .then(response => this.career = response)
        .catch(err => console.log(err));
    })
  
  }
}
