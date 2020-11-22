import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSettingsComponent } from '../modal-settings/modal-settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public titleApp = 'ECS Hours'

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  public settings(): void {
    const dialogRef = this.dialog.open(ModalSettingsComponent, {
      width: '500px',
      maxWidth: ''
    })
  }
}
