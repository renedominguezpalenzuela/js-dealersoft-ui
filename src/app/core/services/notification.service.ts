import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NotificationComponent } from '@core/components/notification/notification.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(
    private readonly matSnackBar: MatSnackBar,
    private readonly deviceService: DeviceDetectorService
  ) {
  }

  public riseNotification = (data: { color: string, data: string | string[] }) => {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      panelClass: ['bg-transparent', 'shadow-none'],
      verticalPosition: 'bottom',
      horizontalPosition: this.deviceService.isDesktop() ? 'end' : 'center',
      duration: 5000,
      data,
    });
  }
}
