import { Component } from '@angular/core';
import { TcpService } from '../controler/tcp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private ip: string;
  private port: number;
  private mensaje: string;

  constructor(public tcp: TcpService) {}

  conectar() {
    this.tcp.conectar(this.ip, this.port);
  }

  enviarMensaje() {
    this.tcp.enviarMensaje(this.mensaje);
  }

}
