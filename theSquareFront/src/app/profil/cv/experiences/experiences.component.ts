import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  IconDefinition,
  faMinus,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { NgForm } from '@angular/forms';
import { NetworkService } from "../../../shared/services/network.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;
  public entreprises: string[] = [];
  public experiences = [];

  constructor(private networkService: NetworkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadEntreprise();
    this.route.params.subscribe(params => {
      this.loadExperiences(params.id);
    });
  }

  private loadExperiences(idUser: string) {
    this.networkService.get('experience/person/' + idUser).subscribe(experiences => {
      this.experiences = experiences['data'].map(element => element['properties']);
    });
  }

  private loadEntreprise() {
    this.networkService.get('entreprise').subscribe(entreprises => {
      this.entreprises = entreprises["data"].map(element => element["properties"]["name"]);
    });
  }

  public show() {
    this.showModify = !this.showModify;
  }

  public onSubmit(form: NgForm) {
    this.networkService.post('experience', form.value).subscribe((experience) => {
      this.experiences.push(experience['data']);
    });
  }

  public onDeleteExperience(intitule: string, index: number) {
    this.networkService.delete('experience/' + intitule).subscribe(() => {
      index === 0 ? this.experiences.shift() : this.experiences.splice(index, index);
    });
  }
}


