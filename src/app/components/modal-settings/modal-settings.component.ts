import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { Storage } from 'src/app/enums/storage.enum';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss']
})
export class ModalSettingsComponent implements OnInit {

  public settingsForm: FormGroup
  public darkMode: boolean = false

  constructor(
    private dialogRef: MatDialogRef<ModalSettingsComponent>,
    private fb: FormBuilder,
    private util: UtilsService
  ) { }

  ngOnInit(): void {
    this.prepareForm()
    if(this.util.getStorage(Storage.DARK_MODE)) this.darkMode = this.util.getStorage(Storage.DARK_MODE)
  }

  public close(res: boolean = false): void {
    this.dialogRef.close(res)
  }

  private prepareForm(): void {
    this.settingsForm = this.fb.group({
      email: this.fb.control(''),
      clearOnSubmit: this.fb.control(false),
      clearOnChangeWeek: this.fb.control(false)
    })
    if(this.util.getStorage(Storage.SETTINGS)) this.settingsForm.patchValue(this.util.getStorage(Storage.SETTINGS))
  }

  public save(): void {
    this.util.setStorage(Storage.SETTINGS, this.settingsForm.value)
    this.util.setStorage(Storage.DARK_MODE, this.darkMode)
    this.util.openToast('Configurações salvas')
    this.close()
  }

  public toggleDarkMode(isDark: boolean) {
    if(isDark) {
      document.getElementsByTagName('body')[0].classList.add('dark-theme')
    } else {
      document.getElementsByTagName('body')[0].classList.remove('dark-theme')
    }
    this.darkMode = isDark
  }

}
