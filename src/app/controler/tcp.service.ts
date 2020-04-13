import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutinas } from './rutinas';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TcpService {
  socket = new (<any>window).Socket();

  constructor(public rutinas: Rutinas,
              public loadingController: LoadingController) {

    this.eventos().subscribe(
      data => rutinas.ShowToast('data: ' + data),
      error => rutinas.ShowToast('Error: ' + error)
    );
  }

  eventos() {
    return new Observable(observer => {
      this.socket.onData = asData => observer.next('socket.onData ' + this.rutinas.arrayBuffer2str(asData));

      this.socket.onError = asError => observer.next('socket.onError ' + asError);

      this.socket.onClose = asClose => observer.next('socket.onClose ' + asClose);
    });
  }

  conectar(ip: string, port: number) {
    const loading = this.loadingController.create({
      message: 'Conectando',
    });
    loading.then(res => res.present());

    this.socket.open(ip, port,
      () => {
        this.rutinas.ShowToast('socket.open.success');
        loading.then(res => res.dismiss());
      },
      error => {
        this.rutinas.ShowAlert('socket.open.failed ' + error);
        loading.then(res => res.dismiss());
      }
    );
  }

  enviarMensaje(mensaje: string) {
    this.socket.write(
      this.rutinas.Str2ArrayBuffer(mensaje),
      () => this.rutinas.ShowToast('Se envio el mensaje'),
      error => this.rutinas.ShowAlert('No se envio el mensaje ' + error)
    );
  }
}