export class BaseUser {
    public email: string;
    public password: string;
    public name: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public dateOfBirth: String[];
    public country: string;
    public state: string;
    public city: string;
    public zipCode: string;
    public phoneNumber: string;

    constructor() {
        this.email = this.createEmail();
        this.password = this.createPassword();
        this.name = this.createName();
        this.firstName = this.createName(4);
        this.lastName = this.createName(6);
        this.address = "123 E 1st St.";
        this.country = "United States";
        this.state = "Alabama";
        this.city = "Townsville";
        this.zipCode = "123456";
        this.dateOfBirth = ['27', 'July', '1990'];
        this.phoneNumber = "1234567890";
    }


    createName(length: number = 8): string {
        return Math.random().toString(36).substring(2, length + 2)
    }

    createEmail(length: number = 8): string {
        let email = this.createName(length);
        email += "@gmail.com";
        return email;
    }

    createPassword(length: number = 8): string {
        let password = this.createName(length);
        //capitalize one letter
        password = password.charAt(0).toUpperCase() + password.substring(1, length - 1);
        //adding number and symbol to fit criteria
        return password += "1!"
    }
}

export const existingUser1 = {
    email: "zaneqa@gmail.com",
    password: "QATest1!",
    name: "zaneqa",
}