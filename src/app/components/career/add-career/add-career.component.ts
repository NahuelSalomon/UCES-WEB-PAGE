import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {

  @Output() messageEventAddCareer = new EventEmitter<Career>();

  constructor(private careerService: CareerService) { }

  careerForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [ Validators.required, Validators.minLength(30), Validators.maxLength(300)]),
    duration: new FormControl('', [ Validators.required])
  })

  get name() { return this.careerForm.get('name'); }
  get description() { return this.careerForm.get('description'); }
  get duration() { return this.careerForm.get('duration'); }

  ngOnInit(): void {
  }

  onSubmit(){

    let name: string = this.name.value;
    let description: string = this.description.value;
    let duration: number = this.duration.value;

    var career = new Career(0, name, description, duration);

    this.careerService.add(career)
    .then(careerResponseAdded => {
      this.messageEventAddCareer.emit(careerResponseAdded);
    })
    .catch(error => {
      console.log(error);
      
      this.messageEventAddCareer.emit(null);
    });
  }
}
