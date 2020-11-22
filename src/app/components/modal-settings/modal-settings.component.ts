import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

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
    if(this.util.getStorage('dark-mode')) this.darkMode = this.util.getStorage('dark-mode')
  }

  public close(res: boolean = false): void {
    this.dialogRef.close(res)
  }

  private prepareForm(): void {
    this.settingsForm = this.fb.group({
      email: this.fb.control('')
    })
    if(this.util.getStorage('settings')) this.settingsForm.patchValue(this.util.getStorage('settings'))
  }

  public save(): void {
    this.util.setStorage('settings', this.settingsForm.value)
    this.util.setStorage('dark-mode', this.darkMode)
    this.util.openToast('Configurações salvas')
    this.close()
  }

  public toggleDarkMode(): void {
    this.darkMode = !this.darkMode
    if(this.darkMode) {
      document.getElementsByTagName('body')[0].classList.remove('dark-theme')
    } else {
      document.getElementsByTagName('body')[0].classList.add('dark-theme')
    }
  }

}
