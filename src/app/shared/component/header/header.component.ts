import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import screenfull from 'screenfull';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  ShowStatus=false;
  ShowSetting=false;
  constructor(private router: Router) { }
  userName:string = 'userName';
  ngOnInit(): void {
    if(localStorage.getItem("userName") != ''){
      this.userName = localStorage.getItem("userName");
    }
    if(localStorage.getItem("userGroup") != "Outage_Creator")
    {
     this.ShowSetting=true;
    }

  }


  public onToggleSidenav=()=> {
    this.sidenavToggle.emit();
     }


     logOut(){
      localStorage.clear();

        this.router.navigateByUrl('/login');

      }
      toggleFullscreen() {
        if (screenfull.isEnabled) {
          screenfull.toggle();
        }
      }

}
