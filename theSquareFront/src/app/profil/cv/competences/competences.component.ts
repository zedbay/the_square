import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  faPlus,
  IconDefinition,
  faMinus,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { NetworkService } from "../../../shared/services/network.service";
import { ActivatedRoute } from "@angular/router";

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

  constructor(
    private networkService: NetworkService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadSkills();
    this.route.params.subscribe(params => {
      this.loadUserSkills(params.id);
    });
  }

  public onSubmit(form: NgForm) {
    this.networkService.post("skill", form.value).subscribe(() => {
      this.userSkills.push(form.value.entitled);
    });
  }

  public removeSkill(index: number) {
    this.networkService.delete("skill/" + this.userSkills[index]).subscribe(() => {
      index === 0 ? this.userSkills.shift() : this.userSkills.splice(index, index);
    });
  }

  private loadSkills() {
    this.networkService.get("skill/").subscribe(e => {
      this.skills = e["data"].map(element => element["properties"]["entitled"]);
    });
  }

  private loadUserSkills(idUser: number) {
    this.networkService.get("skill/" + idUser).subscribe(e => {
      this.userSkills = e["data"].map(element => element["properties"]["entitled"]);
    });
  }

  public show() {
    this.showModify = !this.showModify;
  }
}
