import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatButtonModule, MatProgressBarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports : [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }
