import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { Career } from 'src/app/models/career';
import { Forum } from 'src/app/models/forum';
import { Subject } from 'src/app/models/subject';
import { TypeForum } from 'src/app/models/type-forum';
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
  typeForum: TypeForum;

  ngOnInit(): void {      
    
    this.typeForum = TypeForum.QUERY;
    this.route.params.subscribe(params => {

      this.careerService.getById(params.id)
        .then(response => this.career = response)
        .catch(err => console.log(err));
    })
  
  }



  subjectChange(value: string){
    var idSubject = Number.parseInt(value);
    
    
    this.subjectService.getById(idSubject).then((response) =>{
      this.subject = response;
      this.board = this.subject.board;
      
    })
    .catch((error) =>{
      console.log(error)
    });

    
    
    
    //this.board = subject.board;
  }

}
