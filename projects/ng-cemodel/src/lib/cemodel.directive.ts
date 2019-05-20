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
  @Input()
  private placeholder: string;

  private text: string;
  private isEditing: boolean;

  private onChange: (text: string) => void;
  private onTouched: () => void;

  // stylings
  @HostBinding('style.outline') outline = 'none';
  @HostBinding('style.border') border = '1px dashed transparent';

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
    this.removeBorder();
  }

  @HostListener('input')
  onInput() {
    this.text = this.el.nativeElement.innerText;
    this.onChange(this.el.nativeElement.innerText);
  }

  @HostListener('focus')
  onFocus() {
    this.isEditing = true;
    this.hidePlaceholder();
    this.setBorder();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setBorder();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.isEditing) {
      this.removeBorder();
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

  setBorder() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', 'grey');
  }

  removeBorder() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', 'transparent');
  }
}
