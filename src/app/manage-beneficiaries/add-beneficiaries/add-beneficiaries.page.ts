import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { BeneficiariesService } from '../beneficiaries.service';
import { BeneficiaryModel } from '../beneficiaryModel';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ManageBeneficiariesPage } from '../manage-beneficiaries.page';
import { BanksModalComponent } from './banks-modal/banks-modal.component';
import { Subscription } from 'rxjs';
import { TransferService } from 'src/app/transfer/transfer.service';

@Component({
  selector: 'app-add-beneficiaries',
  templateUrl: './add-beneficiaries.page.html',
  styleUrls: ['./add-beneficiaries.page.scss'],
})
export class AddBeneficiariesPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;

  message = '';
  name: '';
  isValid = false;
  bankName = 'Select Bank';
  beneficiaryForm: FormGroup;
  beneficiaryname;
  bankCode: any;
  beneficiaryAccountNum: string;
  success = false;
  beneficiaries = new BeneficiaryModel();
  beneficiaryDetails: any;
  banks: any;
  mybank: any;
  display = false;
  beneficiaryCheck;

  private httpSubscriptions: Subscription[] = [];
  // errorMessage: string;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    public beneficiaryService: BeneficiariesService,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
    private managebenPage: ManageBeneficiariesPage,
    private transferService: TransferService
  ) {
    this.beneficiaryForm = this.formBuilder.group({
      beneficiaryAcctNum: ['', [Validators.maxLength(10), Validators.required]],
    });
  }

  async openBankModal() {
    const modal = await this.modalCtrl.create({
      component: BanksModalComponent,
      backdropBreakpoint: 0.1,
      initialBreakpoint: 800 / this.platform.height(),
      breakpoints: [0, 1],
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //set beneficiary field to empty when you click on list of banks
      this.beneficiaryForm.get('beneficiaryAcctNum').setValue('');
      this.beneficiaryname = '';
      this.success = false;
      this.display = false;
      this.bankName = data.bankName;
      this.bankCode = data.bankCode;
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.banks = this.banks.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  getNameEnquiry(event) {
    this.beneficiaryAccountNum = event.target.value;
    if (this.beneficiaryAccountNum.length === 10) {
      sessionStorage.setItem('destinationAcct', this.beneficiaryAccountNum);
      //do internal name enquiry if bank code === local
      if (this.bankCode === 'local') {
        this.httpSubscriptions.push(
          this.dashboardService.getName(this.beneficiaryAccountNum).subscribe(
            (data) => {
              this.beneficiaryname = data.accountName;
              this.success = true;
              this.display = true;
            },

            (err) => {
              this.beneficiaryname = 'Invalid Account Number';
              this.success = false;
              this.display = false;
            }
          )
        );
      }
      //if bankcode is not local, perform external name enquiry
      else {
        const externalNameEnquiryData = {
          bankCode: this.bankCode,
          accountId: this.beneficiaryAccountNum,
        };
        this.httpSubscriptions.push(
          this.transferService
            .getExternalAccountName(externalNameEnquiryData)
            .subscribe(
              (data) => {
                this.beneficiaryname = data.accountName;
                this.success = true;
                this.display = true;
              },

              (err) => {
                this.beneficiaryname = 'Invalid Account Number';
                this.success = false;
                this.display = false;
              }
            )
        );
      }
    } else {
      this.beneficiaryname = 'Account number must be 10 digits';
      this.success = false;
      this.display = false;
    }
  }

  ngOnInit() {}

  addBeneficiary(formGroup: FormGroup) {
    this.beneficiaries.beneficiaryAcctNo = formGroup.value.beneficiaryAcctNum;
    this.beneficiaryDetails = {
      ...this.beneficiaries,
      bankCode: this.bankCode,
      beneficiaryAcctName: this.beneficiaryname,
      bankName: this.bankName,
      senderAcctNo: sessionStorage.getItem('accountNumber'),
    };

    this.httpSubscriptions.push(
      this.beneficiaryService.addBeneficiary(this.beneficiaryDetails).subscribe(
        (data) => {
          this.presentAlert(data.responseMessage);
          this.beneficiaryService.getBeneficiaryList().subscribe((list) => {
            this.beneficiaryService.beneficiariesList = list.beneficiaryList;
          });
        },

        (err) => {
          this.presentAlert(err.error.message || 'Unable to reach server');
        }
      )
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/manage-beneficiaries']);
            alert.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy() {
    if (this.httpSubscriptions.length > 0) {
      this.httpSubscriptions.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}
