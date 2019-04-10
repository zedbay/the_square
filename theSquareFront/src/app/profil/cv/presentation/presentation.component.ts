import { Component, OnInit, Input } from "@angular/core";
import { NetworkService } from "../../../shared/services/network.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"]
})
export class PresentationComponent implements OnInit {
  public iam = {
    name: "",
    firstName: ""
  };
  public entreprise = [];
  public activity = [];

  constructor(private networkService: NetworkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadUser(params.id);
      this.loadActivity(params.id);
      this.loadEntreprise(params.id);
    });
  }

  private loadUser(idUser: string) {
    this.networkService.get('entity/' + idUser).subscribe(e => {
      this.iam = e["data"]["properties"];
    });
  }

  private loadActivity(idUser: string) {
    this.networkService.get('activity/Person/' + idUser).subscribe(activity => {
      this.activity = activity['data'];
    });
  }

  private loadEntreprise(idUser: string) {
    this.networkService.get('entreprise/person/' + idUser).subscribe(entreprise => {
      this.entreprise = entreprise["data"];
    });
  }


}
