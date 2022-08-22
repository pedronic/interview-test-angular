import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
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
  public files: NgxFileDropEntry[] = [];
  public channels: Array<Channel> = [];
  public schedules: Array<Schedule> = [];
  public schedulePeriod: any = { start_date: null, end_date: null};
  public selectedChannel: Channel = null;
  public displayedColumns: string[] = ['type', 'status', 'image', 'channel', 'date'];
  public title: string;
  private form: FormGroup;

  public constructor(
    private http: HttpClient,
    private api: ApiService
    ) {
    this.form = new FormBuilder().group({
      channel: null,
      image: null,
      date: [new Date()],
      type: null,
    });
  }

  public ngOnInit() {
    this.form.patchValue({ type: 'feed' });
    this.api.getChannels().subscribe((channels) => {
      this.selectedChannel = channels[0];
      this.channels = channels;
      this.form.patchValue({ channel: channels[0] });
    });

    this.api.getSchedules().subscribe((scheduleResponse: any) => {
      this.schedulePeriod = {
        start_date: scheduleResponse.start_date,
        end_date: scheduleResponse.end_date,
      };
      this.schedules = scheduleResponse.data;
    });
  }

  public selectChannel(channel) {
    this.selectedChannel = channel;
    this.form.patchValue({ channel });
  }

  public schedule() {
    if (!this.form.valid) {
      return;
      // TODO: give feedback
    }
    console.log("form.value\n",this.form.value)
    let body:IAppointment = {
      channel: this.form.value.channel,
      date: this.form.value.date,
      image: this.form.value.image,
      type: this.form.value.type,
    }
    this.api.postSchedules(body)
      .subscribe((data) => {
        this.form.reset();
        this.files = [];
        this.api.getSchedules().subscribe((scheduleResponse: any) => {
          this.schedulePeriod = {
            start_date: scheduleResponse.start_date,
            end_date: scheduleResponse.end_date,
          };
          this.schedules = scheduleResponse.data;
        });
      });
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.form.patchValue({ image: file });
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public changeTab($event) {
    this.form.patchValue({ type: $event.index === 0 ? 'feed' : 'story' });
  }
}
