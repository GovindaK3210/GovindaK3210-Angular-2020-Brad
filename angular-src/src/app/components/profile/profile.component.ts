import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	user: any;
	username: any;
	email: any;
	name: any;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.authService.getProfile().subscribe(
			(profile) => {
				this.user = profile.body['user'];
				this.username = profile.body['user'].username;
				this.email = profile.body['user'].email;
				this.name = profile.body['user'].name;
				console.log('profile email');
				console.log(this.email);
			},
			(err) => {
				console.log(err);
				return false;
			}
		);
	}
}
