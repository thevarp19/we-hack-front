export interface UserProfile {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    photoUrl?: string;
    is_email_confirmed: boolean;
}

export interface RegisterData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
}
