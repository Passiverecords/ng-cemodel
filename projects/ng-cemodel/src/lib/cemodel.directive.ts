import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
  OnInit,
  HostBinding,
  forwardRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CeModelDirective),
      multi: true
    }
  ]
})
export class CeModelDirective
  implements OnInit, OnChanges, ControlValueAccessor {
  @Input() private placeholder: string;
  @Input('contenteditable') isActivated: any;

  private text: string;
  private isEditing: boolean;

  private onChange: (text: string) => void;
  private onTouched: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.text = '';
    this.placeholder = '';
    this.onChange = () => {};
    this.onTouched = () => {};
  }

  ngOnInit(): void {
    if (!this.text) {
      this.showPlaceholder();
    }
    this.checkIfActivated();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
      this.placeholder = changes['placeholder'].currentValue;
      if (!this.text) {
        this.showPlaceholder();
      }
    }
  }

  writeValue(text: string): void {
    this.text = text;
    text && text.length ? this.hidePlaceholder() : this.showPlaceholder();
  }

  registerOnChange(fn: (text: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('blur')
  onBlur() {
    this.isEditing = false;
    if (this.el.nativeElement.innerText === '') {
      this.showPlaceholder();
    }
  }

  @HostListener('input')
  onInput() {
    this.text = this.el.nativeElement.innerText;
    this.onChange(this.el.nativeElement.innerText);
  }

  @HostListener('focus')
  onFocus() {
    if (this.isActivated) {
      this.isEditing = true;
      this.hidePlaceholder();
    }
  }

  checkIfActivated() {
    // The default value for an attribute is '',
    // and <p contenteditable></p> should enable contenteditable
    if (this.isActivated === '') {
      this.isActivated = true;
    }
  }

  showPlaceholder() {
    this.el.nativeElement.innerText = this.placeholder;
    this.renderer.setStyle(this.el.nativeElement, 'color', 'rgba(0,0,0,0.25)');
  }

  hidePlaceholder() {
    this.el.nativeElement.innerText = this.text;
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }
}
