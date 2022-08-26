import { TestBed } from '@angular/core/testing';
import Channel from '../models/channel.model';

import { ApiService } from './api.service';

xdescribe('ApiService', () => {
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });
  it('should retrieve channels', () => {
    expect(service.getChannels()).toBeInstanceOf(Channel)
  });
});
