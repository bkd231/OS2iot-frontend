import { Component, OnInit, Input } from '@angular/core';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackButton } from '@shared/models/back-button.model';

@Component({
  selector: 'app-payload-decoder-edit',
  templateUrl: './payload-decoder-edit.component.html',
  styleUrls: ['./payload-decoder-edit.component.scss']
})
export class PayloadDecoderEditComponent implements OnInit {
  payloadDecoder = new PayloadDecoder();
  payloadDecoderBody: string;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/payload-decoder' };
  public title = '';
  public submitButton = '';
  id: number;
  subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
    private location: Location) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate.get(['NAV.PAYLOAD-DECODER', 'FORM.EDIT-PAYLOAD-DECODER', 'PAYLOAD-DECODER.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.PAYLOAD-DECODER'];
        this.title = translations['FORM.EDIT-PAYLOAD-DECODER'];
        this.submitButton = translations['PAYLOAD-DECODER.SAVE'];
      });
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getPayloadDecoder(this.id);
    } else {
      this.payloadDecoderBody = new PayloadDecoder().decodingFunction;
    }
  }

  private getPayloadDecoder(id: number) {
    this.subscription = this.payloadDecoderService.getOne(id)
      .subscribe(
        (response) => {
          this.payloadDecoder = response;
          this.payloadDecoderBody = response.decodingFunction;
        });
  }

  private create(): void {
    this.payloadDecoderService.post(this.payloadDecoder)
      .subscribe(
        (response) => {
          console.log(response);
          this.routeBack();
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  private update(): void {
    this.payloadDecoderService.put(this.payloadDecoder, this.id)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error) => {
          this.showError(error);
        });
  }

  onSubmit(): void {
    this.payloadDecoder.decodingFunction = this.payloadDecoderBody;
    if (this.payloadDecoder.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    if (error.error?.message?.length > 0) {
      error.error.message.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
          Object.values(err.constraints)
        );
      });
    } else {
      this.errorMessage = error.message;
    }
    this.formFailedSubmit = true;
  }

  routeBack(): void {
    this.location.back();
  }

}