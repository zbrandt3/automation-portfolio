export class BaseUser {
    public email: string;
    public password: string;
    public name: string;

    constructor() {
        this.email = this.createEmail();
        this.password = this.createPassword();
        this.name = this.createName();
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