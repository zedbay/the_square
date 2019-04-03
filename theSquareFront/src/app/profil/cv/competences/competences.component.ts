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
  @Input() iam: Personne;
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

  ngOnInit() {}

  public onSubmit(form: NgForm) {
    this.networkService
      .post(
        "/skill/" + form.value.skill + "/" + localStorage.getItem("token"),
        {}
      )
      .subscribe(e => {
        this.userSkills.push(form.value.skill);
      });
  }

  public removeSkill(index: number) {
    this.networkService
      .delete(
        "/skill/" + this.userSkills[index] + "/" + localStorage.getItem("token")
      )
      .subscribe(() => {
        if (this.userSkills.length === 1) {
          this.userSkills = [];
        } else {
          this.userSkills.splice(index, index);
        }
      });
  }

  private loadSkills() {
    this.networkService.get("/skill").subscribe(e => {
      for (let i = 0; i < e["data"].length; i++) {
        this.skills.push(e["data"][i]["properties"]["entitled"]);
      }
    });
  }

  private loadUserSkills() {
    this.networkService
      .get("/skill/" + localStorage.getItem("token"))
      .subscribe(e => {
        for (let i = 0; i < e["data"].length; i++) {
          this.userSkills.push(e["data"][i]["properties"]["entitled"]);
        }
      });
  }

  public show() {
    this.showModify = !this.showModify;
  }
}
