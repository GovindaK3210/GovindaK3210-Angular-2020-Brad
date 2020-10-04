import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authToken: string;
	user: any;

	constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

	registerUser(user) {
		let headers = new HttpHeaders();
		headers.append('Contet-Type', 'application/json');
		return this.http
			.post('http://localhost:3000/users/register', user, {
				headers: headers,
				observe: 'response'
			})
			.pipe(map((res: HttpResponse<JSON>) => res));
	}

	authenticateUser(user) {
		let headers = new HttpHeaders();
		headers.append('Contet-Type', 'application/json');
		console.log(headers);
		return this.http
			.post('http://localhost:3000/users/authenticate', user, {
				headers: headers,
				observe: 'response'
			})
			.pipe(map((res: HttpResponse<JSON>) => res));
	}

	getProfile() {
		this.loadToken();
		console.log('token is ');
		console.log(this.authToken);

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: this.authToken
		});

		return this.http
			.get('http://localhost:3000/users/profile', { headers: headers, observe: 'response' })
			.pipe(map((res: HttpResponse<JSON>) => res));
	}

	loadToken() {
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	storeUserData(token, user) {
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));

		this.authToken = token;
		this.user = user;
	}

	loggedIn() {
		return !this.jwtHelper.isTokenExpired();
	}

	logout() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
}
