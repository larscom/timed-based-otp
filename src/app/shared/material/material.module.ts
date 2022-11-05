import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

const exports = [
  A11yModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatIconModule
];

@NgModule({ exports })
export class MaterialModule {}
