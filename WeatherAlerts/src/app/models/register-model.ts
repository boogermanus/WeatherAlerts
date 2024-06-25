export class RegisterModel {
    public username: string;
    public password: string
    public confirmPassword: string
    public name: string = ''

    constructor(email: string, password: string, confirmPassword:string) {
        this.username = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
