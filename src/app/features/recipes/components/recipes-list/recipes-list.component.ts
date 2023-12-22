import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, ViewChild, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recipe } from '../../models/recipe.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule
],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  @Input()
  data!:Signal<Recipe[]>;

  @Output()
  edit = new EventEmitter<string>();

  @Output()
  delete = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'description', 'preparation', 'actions'];
  resultsLength = 0;
  isLoading = true;
  dataSource = new MatTableDataSource<Recipe>([]);

  constructor() {
    effect(() => {
      if(this.data()) {
        this.dataSource.data = this.data();
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }

  onEdit(id: string):void {
    this.edit.emit(id);
  }

  onDelete(id: string):void {
    this.delete.emit(id);
  }

}
