import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toast: MatSnackBar
  ) { }

  @Output() public reloadForm = new EventEmitter<boolean>()

  public getStorage = (key: string) => JSON.parse(window.localStorage.getItem(key))
  public setStorage = (key: string, data: any) => window.localStorage.setItem(key, JSON.stringify(data))
  public delStorage = (key: string) => window.localStorage.removeItem(key)

  public openToast(data: string): void {
    this.toast.openFromComponent(ToastComponent, {
      duration: 3000,
      data
    })
  }

  public emitReloadForm(value: boolean): void {
    this.reloadForm.emit(value)
  }

  public receiveReloadForm = () => this.reloadForm
}
