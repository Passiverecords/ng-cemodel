
# ng-cemodel

Angular 4+ directive allowing you to bind ngmodel to contenteditable, complete with placeholder support

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

- you can now use this directive wherever you want!

```html
<h1 name="title"
    contenteditable
    [(ngModel)]="title"
    placeholder="it has a placeholder too!">
</h1>
```

# features

This directive allows for both ngModel as well as formcontrol, on top of that it supports placeholder and has custom stylings when a contenteditable element with this directive is hovered
