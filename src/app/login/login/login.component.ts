import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // document.body.className = 'hold-transition login-page';
    // $(() => {
    //     $('input').iCheck({
    //         checkboxClass: 'icheckbox_square-blue',
    //         radioClass: 'iradio_square-blue',
    //         increaseArea: '20%' /* optional */
    //     });
    // });
  }

}
