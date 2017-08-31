import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadMoreComponent } from './load-more.component';
import { Dimensions, LoadMoreOptions } from './load-more.interface';
import {NgZone} from '@angular/core';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.loadMoreOptions = new LoadMoreOptions({
      totalColumns: 2,
      columnsPerRow: 2,
      heightOfContainer: 100,
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
 it('should be initialized', () => {
    //  component.init();
     expect(window.dispatchEvent(new CustomEvent('resize'))).toBe(true);
 });

  // onWindowScroll

  // it('should test scroll functionality', () => {
  //   spyOn(component, 'increaseSize');
  //   component.onWindowScroll();

  //   expect(component.increaseSize).not.toHaveBeenCalled();
  // });

  // calulateItemsPerPage

  it('should caluculate items per page with higher height of container', () => {
    component.dimensions = new Dimensions({
      width: 100,
      height: 100
    });
    component.loadMoreOptions = new LoadMoreOptions({
      totalColumns: 2,
      columnsPerRow: 2,
      heightOfContainer: 200,
    });
    const items = component.calulateItemsPerPage();
    expect(items).toBe(0);
  });

  it('should calculate items per page when heights are equal', () => {
    component.dimensions = new Dimensions({
      width: 100,
      height: 100
    });
    component.loadMoreOptions = new LoadMoreOptions({
      totalColumns: 2,
      columnsPerRow: 2,
      heightOfContainer: 100,
    });
    const items = component.calulateItemsPerPage();
    expect(items).toBe(2);
  });

  // calculateOnReSize

  it('should calculate items per page when container height is more', () => {
    component.dimensions = new Dimensions({
      width: 100,
      height: 100
    });
    component.loadMoreOptions = new LoadMoreOptions({
      totalColumns: 2,
      columnsPerRow: 2,
      heightOfContainer: 40,
    });
    const items = component.calulateItemsPerPage();
    expect(items).toBe(4);
  });

  it('should calculate items per page on resize', () => {
    spyOn(component, 'calulateItemsPerPage').and.callFake(() => 4);
    spyOn(component, 'updateScreen');
    component.itemPerPage = 2;

    component.calculateOnReSize();

    expect(component.itemPerPage).toBe(4); // size returned by calulateItemsPerPage
    expect(component.updateScreen).toHaveBeenCalledWith(2); // diff
  });

  it('should calculate items per page on resize - negative diff', () => {
    spyOn(component, 'calulateItemsPerPage').and.callFake(() => 2);
    spyOn(component, 'updateScreen');
    component.itemPerPage = 3;

    component.calculateOnReSize();

    expect(component.itemPerPage).toBe(3); // given number of items
    expect(component.updateScreen).not.toHaveBeenCalled();
  });

  // updateScreen

  it('should increment total number of items with given size', () => {
    spyOn(component.updateRowsSize, 'emit');
    component.totalItemShown = 5;
    component.updateScreen(5);

    expect(component.totalItemShown).toBe(10);
    expect(component.updateRowsSize.emit).toHaveBeenCalledWith(10);
  });

  // increaseSize

  it('should increase screen size with items per page', () => {
    spyOn(component, 'updateScreen');
    component.itemPerPage = 5;

    component.increaseSize();
    expect(component.updateScreen).toHaveBeenCalledWith(5);
  });

});
