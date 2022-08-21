export class SendEmailRequest {
    email: string;
    urlToRedirect: string;

    constructor(email: string, urlToRedirect: string) {
        this.email  = email;
        this.urlToRedirect = urlToRedirect;
    }
}
