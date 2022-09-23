import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const materialModules = [
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
