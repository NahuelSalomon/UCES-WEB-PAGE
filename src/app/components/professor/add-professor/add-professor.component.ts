import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent {

  professorForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(40)])
  })

  get name() { return this.professorForm.get('name'); }


  constructor(private professorService: ProfessorService) { }

  onSubmit() {
    
    let name: string = this.name.value

    this.professorService.add(new Professor(null, name, 0, null))
    .then(response => {
      sessionStorage.setItem('addSucess', '1')
      window.location.reload()
    })
    .catch(error => {
      sessionStorage.setItem('addSucess', '1')
      window.location.reload()
    })
  }

}
