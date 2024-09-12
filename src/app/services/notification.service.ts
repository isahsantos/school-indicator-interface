import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  showSuccess(message: string, title: string = 'Sucesso') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showError(message: string, title: string = 'Erro') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showWarning(message: string, title: string = 'Atenção') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'ENTENDI'
    });
  }

  showInfo(message: string, title: string = 'Informação') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Entendi'
    });
  }

  showConfirm(message: string, title: string = 'Você tem certeza ?') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'sim',
      cancelButtonText: 'não'
    });
  }
}
