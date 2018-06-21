import { DateTime } from "ionic-angular";

export class Donation {
    charity_id: number;
    amount: number;
    charity_name: string;
    is_subscription: boolean;
    //donate_date: DateTime;
    date: string = "";
}
