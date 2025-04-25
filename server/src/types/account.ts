export interface User {
    firstName: string;
    lastName: string;
    phone: string;
}

export interface Account {
    cardNumber: string;
    expiration: string;
    pin: string;
    balance: number;
}

export interface AccountDocument {
    _id?: string
    user: User;
    account: Account;
}