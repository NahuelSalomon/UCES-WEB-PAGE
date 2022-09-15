import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {
  @Input() professor : Professor
  professorEditForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(40)])
  })

  get name() { return this.professorEditForm.get('name'); }

  constructor(public activeModal: NgbActiveModal, public professorService: ProfessorService) { }

  ngOnInit(): void {
    this.professorEditForm.setValue({
      name: this.professor.name
    })
  }

  onSubmit(){
    let name: string = this.name.value
    let updated: Professor = this.professor
    updated.name = name

    this.professorService.update(this.professor.id, updated)
    .then(resp => {
      sessionStorage.setItem('updateSuccess', '1')
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
      sessionStorage.setItem('updateSuccess', '0')
      window.location.reload()
    })
    this.activeModal.close()
  }

}
