import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ToastComponent } from '../toast/toast.component';

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
    private util: UtilsService
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
          if(val.day.includes('segunda')) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('1')) {
        this.hours.forEach(val => {
          if(val.day.includes('terça')) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('2')) {
        this.hours.forEach(val => {
          if(val.day.includes('quarta')) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('3')) {
        this.hours.forEach(val => {
          if(val.day.includes('quinta')) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('4')) {
        this.hours.forEach(val => {
          if(val.day.includes('sexta')) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('5')) {
        this.hours.forEach(val => {
          if(val.day.includes('sábado')) {
            val.hours.push(this.data[el])
            _.remove(val.hours, e => e !== '' && !e.includes(':'))
          }
        })
      }
      if(el.includes('6')) {
        this.hours.forEach(val => {
          if(val.day.includes('domingo')) {
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
    const objData: any = {
      email: this.util.getStorage('settings').email,
      hours: this.hours
    }

    this.isLoading = true
    this.api.post('api/send-mail', objData).subscribe((data: any) => {
      this.isLoading = false
      this.openToast(data.msg)
      if(data.status) {
        this.close(data.status)
      }
    }, (err: any) => {
      this.isLoading = false
    })
  }

  private openToast(data: string): void {
    this.toast.openFromComponent(ToastComponent, {
      duration: 4000,
      data
    })
  }
}
