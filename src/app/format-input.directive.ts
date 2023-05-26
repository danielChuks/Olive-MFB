import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';


@Directive({
  selector: '[appFormatInput]'
})
export class FormatInputDirective {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Remove non-numeric characters
    value = value.replace(/[^0-9\.]+/g, '');

    // Format the value as a currency string
    const formattedValue = this.currencyPipe.transform(value, 'USD', true, '1.2-2');

    // Set the formatted value back into the input field
    this.ngControl.valueAccessor.writeValue(formattedValue);
  }


}
