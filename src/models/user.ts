import { MyCharity } from './myCharity';

export class User {
    id: number = 0;
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    password: string = "";
    myCharities: Array<MyCharity> = [];
}