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
  selectedCareer: Career
  careerSubjects : Array<Subject>

  subjectForm = new FormGroup({
    code: new FormControl('', [Validators.maxLength(30)]),
    name: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    career: new FormControl('', [Validators.required])
  })

  get code() { return this.subjectForm.get('code'); }
  get name() { return this.subjectForm.get('name'); }
  get career() { return this.subjectForm.get('career'); }


  constructor(private subjectService : SubjectService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    let name: string = this.name.value
    let careerId: number = this.career.value
    let career = this.careerList.find(c => c.id == careerId)

    this.subjectService.add(new Subject(null, name, null, career))
      .then(resp => {
        window.location.reload()
        console.log(resp)
      })
      .catch(err=> console.log(err))

  }

  changeCareer(id: string){
    this.selectedCareer = this.careerList.find(career => career.id == Number.parseInt(id))
    console.log(id)
    console.log(this.selectedCareer)
    this.subjectService.getByCareer(this.selectedCareer.id)
      .then(response => {
        this.careerSubjects = response
        console.log(this.careerSubjects)
      })
      .catch(error => console.log(error))

  }

}
