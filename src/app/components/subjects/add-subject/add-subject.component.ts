import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Career } from 'src/app/models/career';
import { Professor } from 'src/app/models/professor';
import { Subject } from 'src/app/models/subject';
import { ProfessorService } from 'src/app/services/professor.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  @Input() careerList : Array<Career>
  professorsList : Array<Professor>
  selectedCareer: Career
  careerSubjects : Array<Subject>

  subjectForm = new FormGroup({
    code: new FormControl('', [Validators.maxLength(30)]),
    name: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    professors: new FormControl(''),
    career: new FormControl('', [Validators.required]),
    correlatives: new FormControl('')
  })

  get code() { return this.subjectForm.get('code'); }
  get name() { return this.subjectForm.get('name'); }
  get professors() { return this.subjectForm.get('professors'); }
  get career() { return this.subjectForm.get('career'); }
  get correlatives() { return this.subjectForm.get('correlatives'); }


  constructor(private professorService : ProfessorService, private subjectService : SubjectService) { }

  ngOnInit(): void {

    this.professorService.getAll()
      .then(resp => this.professorsList = resp)
      .catch(error => console.log(error))
  }

  onSubmit(){
    let code: string = this.code.value
    let name: string = this.name.value
    let professorsIds: Array<number> = this.professors.value
    let careerId: number = this.career.value
    let correlativesIds: Array<number> = this.correlatives.value

    let professors = this.professorsList.filter(p => professorsIds.includes(p.id));
    let career = this.careerList.find(c => c.id == careerId)
    let correlatives = this.careerSubjects.filter(c => correlativesIds.includes(c.id));

    this.subjectService.add(new Subject(null, code, name, null, correlatives, professors, null, career))
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
