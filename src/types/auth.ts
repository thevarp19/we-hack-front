export interface UserProfile {
    fistName: string;
    lastName: string;
    username: string;
    email: string;
    photoUrl?: string;
}

export interface RegisterData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
}
