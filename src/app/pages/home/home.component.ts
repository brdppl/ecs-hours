import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModalConfirmComponent } from 'src/app/components/modal-confirm/modal-confirm.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hoursForm: FormGroup

  public week: Array<any> = new Array<any>()
  
  constructor(
    private fb: FormBuilder,
    private util: UtilsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek()
    this.prepareForm()
  }

  public send(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '700px',
      maxWidth: '',
      data: this.hoursForm.value
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log('modal fechado', data)
    })
  }

  private getCurrentWeek(): void {
    const currentDate = moment()
    const weekStart = currentDate.clone().startOf('isoWeek')
    const weekEnd = currentDate.clone().endOf('isoWeek')
    const days = []
  
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).locale('pt-BR').add(i, 'days').format('dddd, D [de] MMMM'))
    }

    days.forEach(el => {
      this.week.push({
        day: el,
        firstStart: 'firstStart',
        firstEnd: 'firstEnd',
        secondStart: 'secondStart',
        secondEnd: 'secondEnd'
      })
    })
  }

  private prepareForm(): void {
    const form = {}
    for(let i = 0; i < this.week.length; i++) {
      form['day'+i] = this.week[i].day
      form[this.week[i].firstStart+i] = this.fb.control('')
      form[this.week[i].firstEnd+i] = this.fb.control('')
      form[this.week[i].secondStart+i] = this.fb.control('')
      form[this.week[i].secondEnd+i] = this.fb.control('')
    }
    this.hoursForm = this.fb.group(form)
    if(this.util.getStorage('form')) this.hoursForm.patchValue(this.util.getStorage('form'))
  }

  public saveOnCache(ev: any): void {
    const formControlName = ev.target.getAttribute('ng-reflect-name')
    const value = ev.target.value

    this.hoursForm.patchValue({
      [formControlName]: value
    })

    this.util.setStorage('form', this.hoursForm.value)
    this.util.openToast('Rascunho salvo')
  }

  public clearHours(item: any, index: number): void {
    Object.keys(this.hoursForm.value).forEach(el => {
      if(item.firstStart+index === el) {
        this.hoursForm.patchValue({
          [el]: ''
        })
      } else if(item.firstEnd+index === el) {
        this.hoursForm.patchValue({
          [el]: ''
        })
      } else if(item.secondStart+index === el) {
        this.hoursForm.patchValue({
          [el]: ''
        })
      } else if(item.secondEnd+index === el) {
        this.hoursForm.patchValue({
          [el]: ''
        })
      }
      this.util.setStorage('form', this.hoursForm.value)
      this.util.openToast('Rascunho salvo')
    })
  }
}
