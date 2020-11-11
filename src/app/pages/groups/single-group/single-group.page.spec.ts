import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleGroupPage } from './single-group.page';

describe('SingleGroupPage', () => {
  let component: SingleGroupPage;
  let fixture: ComponentFixture<SingleGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
