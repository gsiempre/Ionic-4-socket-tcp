import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Rutinas {

  constructor(public toastController: ToastController,
              public alertController: AlertController) {
  }

  arrayBuffer2str(buf: Uint8Array) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  Str2ArrayBuffer(dataString: string) {
    let data = new Uint8Array(dataString.length);
    for (let i = 0; i < data.length; i++) {
      data[i] = dataString.charCodeAt(i);
    }
    return data;
  }

  ShowToast(mensaje: string) {
    let toast = this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.then(res => res.present());
  }

  ShowAlert(mensaje: string) {
    const alert = this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    alert.then(res => res.present());
  }
}
