import { Component, OnInit, Input } from '@angular/core';
import { Personne } from 'src/app/shared/models/personne';
import { NgForm } from '@angular/forms';
import { faPlus, IconDefinition, faMinus, faHammer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent implements OnInit {

  @Input() iam: Personne;
  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;

  constructor() { }

  ngOnInit() { }

  public onSubmit(form: NgForm) {
    console.log(form.value);
  }

  public show() {
    this.showModify ? this.showModify = false : this.showModify = true;
  }

}
