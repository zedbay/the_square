import { Component, OnInit, Input } from "@angular/core";
import { NetworkService } from "../../../shared/services/network.service";
import {
  faPlus,
  IconDefinition,
  faMinus,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-formations",
  templateUrl: "./formations.component.html",
  styleUrls: ["./formations.component.scss"]
})
export class FormationsComponent implements OnInit {

  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;
  public schools: string[] = [];
  public formations = [];

  constructor(private networkService: NetworkService) {
    this.loadSchools();
    this.loadFormations();
  }

  ngOnInit() { }

  private loadSchools() {
    this.networkService.get('school').subscribe(school => {
      this.schools = school["data"].map(element => element["properties"]["name"]);
    });
  }

  private loadFormations() {
    this.networkService.get('formation/person/' + localStorage.getItem('id')).subscribe(formations => {
      this.formations = formations['data'].map(element => element['properties']);
    });
  }

  public onDeleteFormation(intitule: string, index: number) {
    this.networkService.delete('formation/' + intitule).subscribe(() => {
      index === 0 ? this.formations.shift() : this.formations.splice(index, index);
    });
  }

  public show() {
    this.showModify = !this.showModify;
  }

  public onSubmit(form: NgForm) {
    this.networkService.post('formation', form.value).subscribe((formation) => {
      this.formations.push(formation['data']);
    });
  }
}
