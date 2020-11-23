import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModalConfirmComponent } from 'src/app/components/modal-confirm/modal-confirm.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Storage } from 'src/app/enums/storage.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hoursForm: FormGroup

  public week: Array<any> = new Array<any>()

  public endOfScroll: boolean = false
  private mobileScreen: boolean = window.innerWidth < 959

  @HostListener('window:scroll', ['$event']) onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight
    const max = document.documentElement.scrollHeight
    const diff = this.mobileScreen ? 90 : 30

    if(pos > max-diff) {
      this.endOfScroll = true
    } else {
      this.endOfScroll = false
    }
  }

  constructor(
    private fb: FormBuilder,
    private util: UtilsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek()
    this.prepareForm()

    this.util.receiveReloadForm().subscribe(data => {
      if(data) {
        this.util.delStorage(Storage.FORM)
        this.prepareForm()
      }
    })
  }

  public send(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '700px',
      maxWidth: '90%',
      data: this.hoursForm.value
    })
  }

  private getCurrentWeek(): void {
    const currentDate = moment()
    const weekStart = currentDate.clone().startOf('isoWeek')
    const currentWeek = currentDate.isoWeek()
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

    if(!this.util.getStorage(Storage.CURRENT_WEEK)) {
      this.util.setStorage(Storage.CURRENT_WEEK, currentWeek)
    } else {
      if(this.util.getStorage(Storage.CURRENT_WEEK) !== currentWeek) {
        if(this.util.getStorage(Storage.SETTINGS).clearOnChangeWeek) {
          this.util.delStorage(Storage.FORM)
          this.prepareForm()
        }
        this.util.setStorage(Storage.CURRENT_WEEK, currentWeek)
      }
    }
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
    if(this.util.getStorage(Storage.FORM)) this.hoursForm.patchValue(this.util.getStorage(Storage.FORM))
  }

  public saveOnCache(ev: any): void {
    const formControlName = ev.target.getAttribute('ng-reflect-name')
    const value = ev.target.value

    this.hoursForm.patchValue({
      [formControlName]: value
    })

    this.util.setStorage(Storage.FORM, this.hoursForm.value)
    this.util.openToast('Rascunho salvo')
  }

  public clearHours(item: any, index: number): void {
    if(confirm('Deseja mesmo limpar os horários deste dia?')) {
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
        this.util.setStorage(Storage.FORM, this.hoursForm.value)
        this.util.openToast('Rascunho salvo')
      })
    }
  }
}
