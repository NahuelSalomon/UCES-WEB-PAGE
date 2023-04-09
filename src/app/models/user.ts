import { Byte } from "@angular/compiler/src/util";
import { Forum } from "./forum";
import { UserType } from "./user-type";

export class User {

    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userType: UserType;
    active: boolean;
    confirmedEmail: boolean;
    image: Array<Byte>;
    forumsVoted : Array<Forum>;

    constructor(id: number, firstname: string, lastname: string, email: string, password: string, userType: UserType, active: boolean, image: Array<Byte>) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;  
        this.userType = userType;
        this.active = active;
        this.image = image;
        this.forumsVoted = new Array<Forum>();
    }

}
