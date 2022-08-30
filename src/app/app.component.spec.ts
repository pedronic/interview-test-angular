import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { channels, schedules } from './fake-api';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>([
      'getChannels',
      'getSchedules',
    ]);
    apiServiceSpy.getChannels.and.callFake(() => {
      return of({
        channels: Object.values(channels),
      });
    });
    apiServiceSpy.getSchedules.and.callFake(() => {
      return of({
        scheduleResponse: Object.assign({}, schedules),
      });
    });

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        },
      ],
      imports: [AppModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should not render Profile Card initialy', () => {
    const compiled = el.queryAll(By.css('.profile-card'));
    expect(compiled.length).toBe(0);
  });

  xit('should create', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
