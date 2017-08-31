export class Notification {
    type: 'success'|'info'|'warning'|'danger';
    delay: number;
    message: string;
    dismissible: boolean;

    constructor(args: { type: 'success'|'info'|'warning'|'danger', message: string, delay?: number, dismissible?: boolean }) {
        this.type = args.type;
        this.dismissible = true;
        if ( args.delay !== undefined ) {
            this.delay = args.delay;
        }
        if (args.message !== undefined) {
            this.message = args.message;
        }
        if (args.dismissible !== undefined) {
             this.dismissible = args.dismissible;
        }
    }

}
