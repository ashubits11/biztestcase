import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { ApplicationSharedComponentsModule } from '../../application-shared-components/application-shared-components.module';
import { ApplicationGroupApplicationsListingComponent } from './application-group-applications-listing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationGroupService } from '../../application-group-detail/application-group.service';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from '../../shared/shared.module';
import { MockBackend } from '@angular/http/testing';
import { NotificationCenterService } from '../../common/notification-center/notification-center.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsFilterPipe } from '../../application-shared-components/filters/applications-filter.pipe';
import { ApplicationGroupUserService } from '../application-group-user.service';
import { NoResultFound } from '../../application-shared-components/application-shared-components.module';
import { SearchOptions } from '../../application-shared-components/application-shared-components.module';
import { Permission } from '../../core/_services/permission.interface';

describe('ApplicationGroupApplicationsListingComponent', () => {
  let component: ApplicationGroupApplicationsListingComponent;
  let fixture: ComponentFixture<ApplicationGroupApplicationsListingComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      // ApplicationSharedComponentsModule,
      // ApplicationSharedComponentsModule,
      // SharedModule,
      // RouterTestingModule
      ],
      declarations: [
        ApplicationGroupApplicationsListingComponent,
        ApplicationsFilterPipe
      ],
      providers: [
        {
          provide: ApplicationGroupUserService,
          useClass: MockApplicationGroupUserService
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
        {
          provide: NotificationCenterService,
          useClass: MockNotificationCenterService
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ApplicationGroupApplicationsListingComponent);
      component = fixture.componentInstance;
    });
  }));

  let applicationUserGroupService;
  let notificationCenter;
  let activatedRoute;
  beforeEach(inject([ApplicationGroupUserService, NotificationCenterService, ActivatedRoute], (_applicationGroupService: ApplicationGroupUserService, _notificationCenter: NotificationCenterService, _activatedRoute: ActivatedRoute) => {
    applicationUserGroupService = _applicationGroupService;
    notificationCenter = _notificationCenter;
    activatedRoute = _activatedRoute;
  }));

  it('should expect ApplicationGroupApplicationsListingComponent  to be defined', () => {
    expect(component).not.toBe(undefined);
    expect(component.searchOptions).toEqual(new SearchOptions({ placeholder: 'Search Activity Name...' }));
    expect(component.noResultFound).toEqual(jasmine.any(NoResultFound));
    expect(component.applicationName).toBe('dummy-id');
    expect(component.userGroupName).toBe('dummy-user-group-name');
    expect(component.policyGroupName ).toBe('dummy-policy-group-name');
  });

  it('should expect permission to be ["dummy-activities-found"]', () => {
    spyOn(applicationUserGroupService, 'getApplicationGroupActivities').and.returnValue(Observable.of(['Dummy Activity 1', 'Dummy Activity 2']));
    activatedRoute.snapshot.data['activitesFound'] = ['dummy-activities-found'];
    fixture.detectChanges();
    expect(component.permission).toEqual(['dummy-activities-found']);
  });

  it('should expect permission to be a new permission instance', () => {
    spyOn(applicationUserGroupService, 'getApplicationGroupActivities').and.returnValue(Observable.of(['Dummy Activity 1', 'Dummy Activity 2']));
    activatedRoute.snapshot.data = {};
    fixture.detectChanges();
    expect(component.permission).toEqual(jasmine.any(Permission));
  });

  it('should expect the console to be called with the current permission string', () => {
    spyOn(applicationUserGroupService, 'getApplicationGroupActivities').and.returnValue(Observable.of(['Dummy Activity 1', 'Dummy Activity 2']));
    spyOn(console, 'log');
    const actualPermissionObject = new Permission({
            viewApp: true,
            updateApp: true,
            updateUserGroup: true,
            viewUserGroup: false,
            viewUser: true,
            addUser: false,
            deleteUser: true,
            havePermissions: true
    });
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith(actualPermissionObject);
  });

  it('should expect activitys to be a list of new activitys', () => {
    spyOn(applicationUserGroupService, 'getApplicationGroupActivities').and.returnValue(Observable.of(['Dummy Activity 1', 'Dummy Activity 2']));
    fixture.detectChanges();
    expect(component.activitys).toEqual(['Dummy Activity 1', 'Dummy Activity 2']);
  });

  it('should expect loadMoreOptions totalColumns to be same length as that of activitys', () => {
    spyOn(applicationUserGroupService, 'getApplicationGroupActivities').and.returnValue(Observable.of(['Dummy Activity 1', 'Dummy Activity 2']));
    fixture.detectChanges();
    expect(component.loadMoreOptions.totalColumns).toBe(component.activitys.length);
  });

  it('should expect activitys to be set to an empty list', () => {
    spyOn(applicationUserGroupService, 'getApplicationGroupActivities').and.returnValue(Observable.throw(new Error()));
    fixture.detectChanges();
    expect(component.activitys).toEqual([]);
  });

  it('should expect onSearchUpdate to set the current search text', () => {
    component.searchText = 'Original search text';
    component.onSearchUpdate('New Search Text');
    expect(component.searchText).toBe('New Search Text');
  });

  it('should expect updateRowsSize to set the current size', () => {
    component.size = 101;
    component.updateRowsSize(1);
    expect(component.size).toBe(1);
  });

});

class MockApplicationGroupUserService {
  getApplicationGroupActivities() {}
}
class MockActivatedRoute {
  parent: any  = {
    snapshot: {
      params: {
        id: 'dummy-id',
        userGroupName: 'dummy-user-group-name',
        policyGroupName: 'dummy-policy-group-name'
      }
    }
  };
  snapshot: any = {
    data: {
      activitesFound: new Permission({
            viewApp: true,
            updateApp: true,
            updateUserGroup: true,
            viewUserGroup: false,
            viewUser: true,
            addUser: false,
            deleteUser: true,
            havePermissions: true
      })
    }
  };
}
class MockNotificationCenterService {}

