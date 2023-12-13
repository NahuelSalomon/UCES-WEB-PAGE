import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Career } from 'src/app/models/career';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  @Input() careerList : Array<Career>
  @Input() career: Career
  careerSubjects : Array<Subject>

  subjectForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(60)])
  })

  get name() { return this.subjectForm.get('name'); }

  constructor(private subjectService : SubjectService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    let name: string = this.name.value

    this.subjectService.add(new Subject(null, name, null, this.career))
      .then(resp => {
        window.location.reload()
        console.log(resp)
      })
      .catch(err=> console.log(err))

  }


}
