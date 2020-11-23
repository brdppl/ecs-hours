import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalSettingsComponent } from '../modal-settings/modal-settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public titleApp = 'ECS Hours'

  constructor(
    private dialog: MatDialog,
    private util: UtilsService
  ) { }

  ngOnInit(): void { }

  public settings(): void {
    const dialogRef = this.dialog.open(ModalSettingsComponent, {
      width: '500px',
      maxWidth: ''
    })
  }

  public clearAll(): void {
    if(confirm('Deseja mesmo limpar todos os horários da semana?'))
      this.util.emitReloadForm(true)
  }
}
