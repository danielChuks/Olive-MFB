import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageBeneficiariesPage } from './manage-beneficiaries.page';

describe('ManageBeneficiariesPage', () => {
  let component: ManageBeneficiariesPage;
  let fixture: ComponentFixture<ManageBeneficiariesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBeneficiariesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBeneficiariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
