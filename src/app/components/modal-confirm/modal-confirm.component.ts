import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Storage } from 'src/app/enums/storage.enum';
import { Days } from 'src/app/enums/days.enum';
import { ModalSettingsComponent } from '../modal-settings/modal-settings.component';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  public hours: Array<any> = new Array<any>()
  public isLoading: boolean = false

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: MatSnackBar,
    private api: ApiService,
    private util: UtilsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.prepareArray()
  }

  private prepareArray(): void {
    Object.keys(this.data).forEach(el => {
      if(el.includes('day')) {
        this.hours.push({
          day: this.data[el],
          hours: []
        })
      }
      if(el.includes('0')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.SEGUNDA)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('1')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.TERCA)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('2')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.QUARTA)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('3')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.QUINTA)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('4')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.SEXTA)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('5')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.SABADO)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('6')) {
        this.hours.forEach(val => {
          if(val.day.includes(Days.DOMINGO)) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
    })
  }

  public close(res: boolean = false): void {
    this.dialogRef.close(res)
  }

  public send(): void {
    if(this.util.getStorage(Storage.SETTINGS) && this.util.getStorage(Storage.SETTINGS).email) {
      const objData: any = {
        email: this.util.getStorage(Storage.SETTINGS).email,
        hours: this.hours
      }

      this.isLoading = true
      this.api.post('api/send-mail', objData).subscribe((data: any) => {
        this.isLoading = false
        this.util.openToast(data.msg)
        if(this.util.getStorage(Storage.SETTINGS).clearOnSubmit)
          this.util.emitReloadForm(true)
        if(data.status) {
          this.close(data.status)
        }
      }, (err: any) => {
        this.isLoading = false
      })
    } else {
      this.util.openToast('Configure seu e-mail antes de enviar')
      this.dialog.open(ModalSettingsComponent, {
        width: '500px',
        maxWidth: ''
      })
    }
  }
}
