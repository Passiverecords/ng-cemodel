
# ng-cemodel

Angular 4+ directive allowing you to bind ngmodel to contenteditable, complete with placeholder support

# Features

- ngModel and formcontrol support:

```html
<h1
  contenteditable
  [(ngModel)]="title"
></h1>
<h1
  contenteditable
  [formControl]="titleControl"
></h1>
```

- placeholder support

```html
<h1
  contenteditable
  [(ngModel)]="title"
  placeholder="Please enter your title here"
></h1>
```

- optional custom styling

`style.css`
```css
@import '~ng-cemodel/themes/default.css'
```

- can be enabled / disabled

```html
<h1
  [contenteditable]="isEnabled"
  [(ngModel)]="title"
></h1>
```

# Installation

- install the directive

```bash
  npm install --save ng-cemodel
```

or if you're using yarn:

```bash
  yarn add ng-cemodel
```

- import it in your module file along with @angular/forms' FormModule

```ts
import { NgCemodelModule } from 'ng-cemodel';
import { FormsModule } from '@angular/forms';

@NgModule({
  ...
  imports: [
    ...
    FormsModule,
    NgCemodelModule,
    ...
  ],
  ...
})
```

- **(optional)** if you want some default styling around your editable text,
  you can import the css available in the `themes` folder:
  
`style.css`

```css
@import '~ng-cemodel/themes/default.css';
/* or */
@import '<path to node_modules>/ng-cemodel/themes/default.css';
```

- you can now use this directive wherever you want!

```html
<h1 [contenteditable]="isEnabled"
    [(ngModel)]="title"
    placeholder="Please enter a title">
</h1>
```
