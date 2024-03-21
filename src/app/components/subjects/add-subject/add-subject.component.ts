import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { Career } from 'src/app/models/career';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  @Input() career: Career;
  @Output() messageEventAddSubject = new EventEmitter<Subject>();
  careerSubjects : Array<Subject>;

  subjectForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(60)])
  });

  get name() { return this.subjectForm.get('name'); }

  constructor(private subjectService : SubjectService, private authService : AuthService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.career.currentValue) {
      this.name.addAsyncValidators([CustomValidator.subjectNameExists(this.subjectService,this.career.id)]);
    }
  }

  onSubmit(){
    let name: string = this.name.value

    this.subjectService.add(new Subject(null, name, null, this.career), this.authService.token)
      .then(subjectResponse => {
        this.subjectForm.reset();
        this.messageEventAddSubject.emit(subjectResponse);
      })
      .catch(subjectResponseError=> {
        this.messageEventAddSubject.emit(null);
        console.log(subjectResponseError);
      });

  }


}
