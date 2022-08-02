export class SendEmailConfirmEmailRequest {
    email: string;
    urlToRedirect: string;

    constructor(email: string, urlToRedirect: string) {
        this.email  = email;
        this.urlToRedirect = urlToRedirect;
    }
}
