import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsFieldsListComponent } from './ingredients-fields-list.component';

describe('IngredientsFieldsListComponent', () => {
  let component: IngredientsFieldsListComponent;
  let fixture: ComponentFixture<IngredientsFieldsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsFieldsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsFieldsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
