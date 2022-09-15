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
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent implements OnInit {

  constructor(private route :ActivatedRoute, private careerService: CareerService, private subjectService: SubjectService, private boardSevice : BoardService, private forumService: ForumService) { }

  career: Career;
  subjectSelected: Subject;
  subjectList: Array<Subject>;
  forumList: Array<Forum>;
  board : Board;
  forumType: ForumType;

  ngOnInit(): void {      
    
    this.forumType = ForumType.QUERY;
    this.route.params.subscribe(params => {

      

      this.careerService.getById(params.id)
        .then(response => {
          this.career = response;
          this.subjectService.getByCareer(this.career.id)    
            .then(responseSubjectList => {
              this.subjectList = responseSubjectList;
                this.subjectSelected = this.subjectList[0];
                  this.boardSevice.getBySubject(this.subjectSelected.id).then((responseBoard)=>{        
                    this.board = responseBoard;

                /* this.forumService.getAllByBoard(this.board.id)
               
                .then(responseForumList => {
                  this.forumList = responseForumList;

                  
                })
                .catch(error => {}); */
              });   
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      })
  }



  subjectChange(value: string){
    var idSubject = Number.parseInt(value);
    
    
    this.subjectService.getById(idSubject).then((response) =>{
      this.subjectSelected = response;
      
      this.boardSevice.getBySubject(this.subjectSelected.id).then((responseBoard)=>{        
        this.board = responseBoard;

        /* this.forumService.getAllByBoard(this.board.id)
               
        .then(responseForumList => {
          this.forumList = responseForumList;

          
        })
        .catch(error => {}); */

      });      
    })
    .catch((error) =>{
      console.log(error)
    });
  }

}
