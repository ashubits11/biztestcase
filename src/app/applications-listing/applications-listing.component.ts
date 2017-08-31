import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../application-shared-components/application-shared-components.module';
import { ApplicationService } from './application.service';
import { LoadMoreOptions } from '../application-shared-components/application-shared-components.module';
import { SearchOptions } from '../application-shared-components/application-shared-components.module';
import { NoResultFound } from '../application-shared-components/application-shared-components.module';
import * as _ from 'lodash';

@Component({
  selector: 'app-applications-lisitng',
  templateUrl: './applications-listing.component.html',
  styleUrls: ['./applications-listing.component.css']
})
export class ApplicationsListingComponent implements OnInit {
  applications: Array<Application> = [];
  searchText: string;
  searchOptions: SearchOptions;
  loadMoreOptions: LoadMoreOptions;
  size: number;
  noResultFound: NoResultFound;
  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
    ) {
    this.searchOptions = new SearchOptions();
    this.searchOptions.placeholder = 'Search App Name...';
    this.noResultFound = new NoResultFound();
  }
  ngOnInit() {
    this.applicationService.getAllApplications().subscribe((applications: Array<Application>) => {
     this.loadMoreOptions = new LoadMoreOptions({
       'columnsPerRow': 1, 'heightOfContainer': 118, 'totalColumns': applications.length
      });
     this.applications = _.sortBy(applications, function(ele) { return ele.display.toLowerCase(); });
   });
  }
  updateRowsSize (event: number) {
    this.size = event;
  }
  onSearchUpdate (event: string) {
    this.searchText = event;
  }
}
