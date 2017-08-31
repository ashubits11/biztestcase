import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {NotificationCenterService} from '../notification-center.service';
import {Notification} from './notification-center.interface';

@Component({
    selector: 'app-notification-center',
    templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent implements OnInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input() delay = 5000;

    @Input()
    layout = 'attached';

    @Input()
    effect = 'bouncyflip';

    @Input()
    type = 'notice';

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    notifications: Notification[] = [];

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private notificationsSubscription: Subscription;
    private timeoutId: any;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private notificationCenter: NotificationCenterService) {
    }

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------

    ngOnInit(): void {
        this.notificationsSubscription = this.notificationCenter.subscribe((notification: Notification) => {
            this.notifications.push(notification);

            this.timeoutId = setTimeout(() => {
                this.removeNotification(notification);
                this.timeoutId = null;
            }, notification.delay || this.delay);
        });
    }

    ngOnDestroy() {
        if (this.notificationsSubscription) {
            this.notificationsSubscription.unsubscribe();
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
    }
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    clear() {
        this.notifications = [];
    }

    removeNotification(notification: Notification) {
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
              this.notifications.splice(index, 1);
        }
    }

}
