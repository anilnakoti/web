import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import keycloakConfig from 'src/environments/kc.config';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly kcUrl = keycloakConfig.url;
  readonly keycloakUsersAPI = `${this.kcUrl}/admin/realms/springup-labs/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any>(this.keycloakUsersAPI);
  }
}
