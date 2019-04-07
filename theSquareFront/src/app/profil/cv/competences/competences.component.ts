import { Component, OnInit, Input } from "@angular/core";
import { Personne } from "src/app/shared/models/personne";
import { NgForm } from "@angular/forms";
import {
  faPlus,
  IconDefinition,
  faMinus,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { NetworkService } from "../../../shared/services/network.service";

@Component({
  selector: "app-competences",
  templateUrl: "./competences.component.html",
  styleUrls: ["./competences.component.scss"]
})
export class CompetencesComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;
  public skills: string[] = [];
  public userSkills: string[] = [];

  constructor(private networkService: NetworkService) {
    this.loadUserSkills();
    this.loadSkills();
  }

  ngOnInit() { }

  public onSubmit(form: NgForm) {
    this.networkService.post("skill", form.value).subscribe(e => {
      this.userSkills.push(form.value.entitled);
    });
  }

  public removeSkill(index: number) {
    this.networkService.delete("skill/" + this.userSkills[index]).subscribe(() => {
      index === 0 ? this.userSkills.shift() : this.userSkills.splice(index, index);
    });
  }

  private loadSkills() {
    this.networkService.get("skill").subscribe(e => {
      this.skills = e["data"].map(element => element["properties"]["entitled"]);
    });
  }

  private loadUserSkills() {
    this.networkService.get("skill/" + localStorage.getItem("type") + "/" + localStorage.getItem("id")).subscribe(e => {
      this.userSkills = e["data"].map(element => element["properties"]["entitled"]);
    });
  }

  public show() {
    this.showModify = !this.showModify;
  }
}
