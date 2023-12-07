import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InstantSearchItemResponse } from '../../interfaces/nutritionx/responses';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFoodComponent {

  @Output()
  itemSelected = new EventEmitter<string>()

  @Output()
  search = new EventEmitter<string>()

  @Input()
  searchResult$!: Observable<InstantSearchItemResponse[]>;

  selectedIngredient!:string;


  _onSearch(event: KeyboardEvent) {
    if((event.target as HTMLInputElement).value.length > 1) {
      this.search.emit((event.target as HTMLInputElement).value)
    }
  }

  _onItemSelected(event: MatAutocompleteSelectedEvent, searchInput: MatAutocompleteTrigger, autocomplete: MatAutocomplete) {
    this.itemSelected.emit(event.option.value)
    autocomplete.options.reset([]);
  }

}
