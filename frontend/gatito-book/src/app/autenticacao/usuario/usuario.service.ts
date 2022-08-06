import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) { 
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT(); 
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const usuario = jwt_decode(token) as Usuario;

    this.usuarioSubject.next(usuario);
  }

  retornarUsuario(){
    return this.usuarioSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }
}
