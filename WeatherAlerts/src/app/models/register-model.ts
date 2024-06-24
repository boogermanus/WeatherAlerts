export class RegisterModel {
    public email: string;
    public password: string
    public confirmPassword: string
    public name: string = ''

    constructor(email: string, password: string, confirmPassword:string) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
