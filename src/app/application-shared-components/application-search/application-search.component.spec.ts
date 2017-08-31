import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationSearchComponent } from './application-search.component';
import { SearchOptions } from './application-search.interface';

describe('ApplicationSearchComponent', () => {
  let component: ApplicationSearchComponent;
  let fixture: ComponentFixture<ApplicationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ ApplicationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSearchComponent);
    component = fixture.componentInstance;
    component.options = new SearchOptions();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize options on init', () => {
    component.ngOnInit();
    expect(component.options).toBeDefined();

    component.options = null;
    component.ngOnInit();
    expect(component.options).toBeDefined();
  });

  // searchChange

  it('should emit search text', () => {
    spyOn(component.onSearchUpdate, 'emit');
    const ev = 'search text';
    component.searchChange(ev);
    expect(component.onSearchUpdate.emit).toHaveBeenCalledWith(ev);
  });

  // ngOnDestroy

  it('should clear inputs on destroy', () => {
    component.options = new SearchOptions();
    component.searchText = 'search text';
    component.ngOnDestroy();

    expect(component.options).toBeUndefined();
    expect(component.searchText).toBeUndefined();
  });

});
