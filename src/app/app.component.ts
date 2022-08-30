import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { ConfirmDialogComponent } from 'src/shared/components/confirm-dialog/confirm-dialog.component';
import IAppointment from './models/appointment.interface';
import Channel from './models/channel.model';
import Schedule from './models/schedule.model';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loading: boolean = true;
  public readonly DATE_FORMAT: any = {
    format: 'EEEE, dd/MMM/YYYY',
    timezone: '-03:00',
    locale: 'pt-BR',
  };
  public readonly PUBLICATION_TYPE: string[] = ['feed', 'story'];
  public readonly TODAY: Date = new Date();

  public files: NgxFileDropEntry[] = [];
  public _files: string[] = [];

  public channels: Array<Channel> = [];
  public schedules: Array<Schedule> = [];
  public schedulePeriod: any = { start_date: null, end_date: null };
  public displayedColumns: string[] = [
    'type',
    'status',
    'image',
    'channel',
    'date',
  ];
  public title: string;
  public form: FormGroup;
  public startDate: FormGroup;

  public constructor(
    private _api: ApiService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      channel: [null, []],
      image: [[], []],
      type: ['', []],
      date: [{value:null, disabled:true}, []],
    });
  }

  public ngOnInit() {

    this.form.get('type').setValue(this.PUBLICATION_TYPE[0]);
    this._api.getChannels().subscribe({
      next: (channels) => {
        this.channels = channels;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this._api.getSchedules().subscribe({
      next: (scheduleResponse) => {
        this.schedulePeriod = {
          start_date: scheduleResponse.start_date,
          end_date: scheduleResponse.end_date,
        };
        this.schedules = scheduleResponse.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.loading = false;
  }

  public isLoading(): boolean {
    return this.loading;
  }


  public schedule() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent,{data: this.form.get('date').value});
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        let body: IAppointment = {
          channel: this.form.value.channel,
          date: this.form.value.date,
          image: this.form.value.image,
          type: this.form.value.type,
        };
        this._api.postSchedules(body).subscribe({
          next: () => {
            this.form.reset();
            this.files = [];
            this._files = [];
            this._api.getSchedules().subscribe({
              next:(scheduleResponse: any) => {
              this.schedulePeriod = {
                start_date: scheduleResponse.start_date,
                end_date: scheduleResponse.end_date,
              };
              this.schedules = scheduleResponse.data;
            },
            error: () => {},
            complete: () => {
              this._snackBar.open('Agendamento bem sucedido!', 'OK',{
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000
              })
            }
          });
          },
          error: () => {
            this._snackBar.open('Erro no agendamento. Por favor, tente novamente.', 'DISPENSAR',{
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            })
          }
        });
      }
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.form?.get('image').markAsTouched();
    this.files = this.files.concat(files);

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this._files.push(reader.result.toString());
          };
        });
        this.form?.get('image').setValue(this.files);
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public removeItem(index: number): void {
    this.files.splice(index, 1);
    this._files.splice(index, 1);
    if(this.files.length === 0 || this._files.length === 0){
      this.form?.get('image').markAsUntouched();
    }
  }
  public changeTab(index: number): void {
    this.form?.get('type').setValue(this.PUBLICATION_TYPE[index]);
    this.form?.get('type').markAsTouched();
  }

  public checkErrors(): boolean {
    if(this.form?.get('channel').value === null){
      return true;
    }
    if(this.form?.get('date').value === null){
      return true;
    }
    if(this.form?.get('type').value === ''){
      return true;
    }
    if(this.form?.get('image').value.length === 0){
      return true;
    }
    return false;
  }
}
