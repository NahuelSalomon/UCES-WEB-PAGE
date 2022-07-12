import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { Career } from 'src/app/models/career';
import { Forum } from 'src/app/models/forum';
import { Subject } from 'src/app/models/subject';
import { ForumType } from 'src/app/models/forum-type';
import { CareerService } from 'src/app/services/career.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent implements OnInit {

  constructor(private route :ActivatedRoute, private careerService: CareerService, private subjectService: SubjectService, private boardSevice : BoardService) { }

  career: Career;
  subject: Subject;
  subjectList: Array<Subject>;
  board : Board;
  typeForum: ForumType;

  ngOnInit(): void {      
    
    this.typeForum = ForumType.QUERY;
    this.route.params.subscribe(params => {

      

      this.careerService.getById(params.id)
        .then(response => {
          this.career = response;
          this.subjectService.getByCareer(this.career.id)    
            .then(responseSubjectList => {
              this.subjectList = responseSubjectList;
            })
            .catch(err => console.log(err));
        
        })
        .catch(err => console.log(err));
      })
  }



  subjectChange(value: string){
    var idSubject = Number.parseInt(value);
    
    
    this.subjectService.getById(idSubject).then((response) =>{
      this.subject = response;
      
      this.boardSevice.getBySubject(this.subject.id).then((responseBoard)=>{
        
        this.board = responseBoard;
      });      
    })
    .catch((error) =>{
      console.log(error)
    });
  }

}
