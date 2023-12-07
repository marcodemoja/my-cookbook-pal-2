import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ingredients-fields-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ],
  templateUrl: './ingredients-fields-list.component.html',
  styleUrl: './ingredients-fields-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsFieldsListComponent {

  @Input()
  formGroup!:FormGroup;

  @Input()
  ingredients!: BehaviorSubject<FormGroup[]>;

  @Output()
  delete = new EventEmitter<number>();

  displayedColumns: string[] = ['food_name', 'quantity', 'serving_unit', 'actions'];

  onDelete(index:number) {
    this.delete.emit(index);
  }


}
