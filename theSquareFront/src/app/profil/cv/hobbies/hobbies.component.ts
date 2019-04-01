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
  selector: "app-hobbies",
  templateUrl: "./hobbies.component.html",
  styleUrls: ["./hobbies.component.scss"]
})
export class HobbiesComponent implements OnInit {
  @Input() iam: Personne;
  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;
  public hobbies: string[] = [];
  public userHobbies: string[] = [];

  constructor(private networkService: NetworkService) {
    this.loadUserHobbies();
    this.loadHobbies();
  }

  ngOnInit() {}

  public removeHobby(index: number) {
    this.networkService
      .delete(
        "/Hobby/" +
          this.userHobbies[index] +
          "/" +
          localStorage.getItem("token")
      )
      .subscribe(() => {
        if (this.userHobbies.length === 1) {
          this.userHobbies = [];
        } else {
          this.userHobbies.splice(index, index);
        }
      });
  }

  private loadUserHobbies() {
    this.networkService
      .get("/Hobby/" + localStorage.getItem("token"))
      .subscribe(e => {
        for (let i = 0; i < e["data"].length; i++) {
          this.userHobbies.push(e["data"][i]["properties"]["entitled"]);
        }
      });
  }

  private loadHobbies() {
    this.networkService.get("/Hobby").subscribe(e => {
      for (let i = 0; i < e["data"].length; i++) {
        this.hobbies.push(e["data"][i]["properties"]["entitled"]);
      }
    });
  }

  public onSubmit(form: NgForm) {
    this.networkService
      .post(
        "/Hobby/" + form.value.hobby + "/" + localStorage.getItem("token"),
        {}
      )
      .subscribe(e => {
        this.userHobbies.push(form.value.hobby);
      });
  }

  public show() {
    this.showModify = !this.showModify;
  }
}
