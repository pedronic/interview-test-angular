import { TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import Channel from '../models/channel.model';

import { ApiService } from './api.service';
import { channels, schedules } from '../fake-api';
import Schedule from '../models/schedule.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve Channels', () => {
    service.getChannels().subscribe((channels) => {
      let payload = channels.payload;

      expect(channels).withContext('No channels returned').toBeTruthy();

      for (let i of payload) {
        expect(typeof i)
          .withContext(
            `failed beacuse expected type to be 'object'; actual type: '${typeof i}'`
          )
          .toBe('object');
        expect(
          JSON.stringify(Object.keys(i)) ===
            JSON.stringify(Object.keys(new Channel()))
        )
          .withContext(
            `failed beacuse expected same keys as [Channel object]; actual keys: '${Object.keys(
              i
            )}' !== '${Object.keys(new Channel())}'`
          )
          .toBeTruthy();
      }
    });

    const req = httpTestingController.expectOne(`api/channels`);

    expect(req.request.method).toEqual('GET');

    req.flush({ payload: Object.values(channels) });
  });

  it('should retrieve Schedules', () => {
    service.getSchedules().subscribe((schedules) => {
      let payload = schedules.payload.data;
      expect(schedules).withContext('No schedules returned').toBeTruthy();

      for (let i of payload) {
        expect(typeof i)
          .withContext(
            `failed beacuse expected type to be 'object'; actual type: '${typeof i}'`
          )
          .toBe('object');
        expect(
          JSON.stringify(Object.keys(i)) ===
            JSON.stringify(Object.keys(new Schedule()))
        )
          .withContext(
            `failed beacuse expected same keys as [Schedule object]; actual keys: '${Object.keys(
              i
            )}' !== '${Object.keys(new Schedule())}'`
          )
          .toBeTruthy();
      }
    });

    const req = httpTestingController.expectOne(`api/schedules`);

    expect(req.request.method).toEqual('GET');

    req.flush({ payload: Object.assign({},schedules) });
  });
});
