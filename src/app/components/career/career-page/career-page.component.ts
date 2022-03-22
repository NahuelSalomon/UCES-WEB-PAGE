import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { Career } from 'src/app/models/career';
import { Subject } from 'src/app/models/subject';
import { CareerService } from 'src/app/services/career.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent implements OnInit {

  constructor(private route :ActivatedRoute, private careerService: CareerService, private subjectService: SubjectService) { }

  career: Career;
  subject: Subject;
  board : Board; 

  ngOnInit(): void {      
    
    this.route.params.subscribe(params => {

      this.careerService.getById(params.id)
        .then(response => this.career = response)
        .catch(err => console.log(err));
    })
  
  }

  changeTypeForum(typeForum : string) {

    /** Se cambia de un tipo de foro a otro tipo de foro */
    var element = document.getElementsByName("active-form-type")[0];
    element.classList.remove("active","active-form-type");
    element.style.backgroundColor = "white";
    element.style.color = "black";
    element.setAttribute("name",""); 
    
    var elementToActive  = document.getElementById(typeForum);
    elementToActive.classList.add("active");
    elementToActive.style.backgroundColor = "#A989B0";
    elementToActive.style.color = "white";
    elementToActive.setAttribute("name","active-form-type"); 
  }

  subjectChange(value: string){
    var idSubject = Number.parseInt(value);
    
    
    this.subjectService.getById(idSubject).then((response) =>{
      this.subject = response;
      this.board = this.subject.board;
      console.log(this.board);
      
    })
    .catch((error) =>{
      console.log(error)
    });

    
    
    
    //this.board = subject.board;
  }

}
