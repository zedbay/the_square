import { Component, OnInit } from "@angular/core";
import { NetworkService } from "../../shared/services/network.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.scss"]
})
export class ConnexionComponent implements OnInit {

  public loginFail: boolean = false;
  constructor(private networkService: NetworkService,
    private router: Router) { }

  ngOnInit() { }

  public onSubmit(form: NgForm) {
    this.networkService.post("/Login", form.value).subscribe(res => {
      if (res["success"] == false) {
        this.loginFail = true;
      } else {
        localStorage.setItem("token", res['token']);
        this.router.navigate(['/']);
      }
    });
  }
}
