export interface Header {
    app_name: string;
}

export interface Payload {
    user_id: number;
    expires_in: number;
}

export interface Signature {
    secret: string;
}

export class Token {
    header: Header;
    payload: Payload;
    signature: Signature;
}