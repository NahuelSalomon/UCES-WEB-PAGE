import { UserType } from "./user-type";

export class User {

    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userType: UserType;

    constructor(id: number, firstname: string, lastname: string, email: string, password: string, userType: UserType) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;  
        this.userType = userType;
    }

}
