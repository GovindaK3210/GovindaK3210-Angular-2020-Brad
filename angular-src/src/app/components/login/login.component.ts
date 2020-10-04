import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	username: String;
	password: String;

	constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) {}

	ngOnInit(): void {}

	onLoginSubmit() {
		const user = {
			username: this.username,
			password: this.password
		};

		this.authService.authenticateUser(user).subscribe((data) => {
			if (data.body['success']) {
				this.authService.storeUserData(data.body['token'], data.body['user']);
				this.flashMessage.show('Welcome ' + data.body['user'].name + ' !', {
					cssClass: 'alert-success',
					timeout: 4000
				});
				this.router.navigate([ '/dashboard' ]);
				console.log('Login authenticatae');
				console.log(localStorage);
			} else {
				this.flashMessage.show(data.body['msg'], { cssClass: 'alert-danger', timeout: 4000 });
				this.router.navigate([ '/login' ]);
			}
		});
	}
}
