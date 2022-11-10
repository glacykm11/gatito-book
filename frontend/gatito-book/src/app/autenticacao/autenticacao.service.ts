import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;
@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  urlAutenticacao: string = `${API}/user/login`;

  constructor(private httpClient: HttpClient) {}

  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient.post(
      this.urlAutenticacao,
      {
        userName: usuario,
        password: senha,
      },
      { observe: 'response' }
    );
  }
}
