import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExternalBeneficiariesComponent } from './external-beneficiaries.component';

describe('ExternalBeneficiariesComponent', () => {
  let component: ExternalBeneficiariesComponent;
  let fixture: ComponentFixture<ExternalBeneficiariesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalBeneficiariesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
