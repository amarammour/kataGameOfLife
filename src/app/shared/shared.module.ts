import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports : [
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
