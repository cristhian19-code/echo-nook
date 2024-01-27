export interface LoginPayload {
    email: string
    password: string
}

export interface SignupPayload extends LoginPayload {
    lastname: string;
    firstname: string;
}

export interface User {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    __v: number;
}

export interface LoginResponse {
    user: User | null;
    token: string | null;
}

export interface LoginStore extends LoginResponse {
    loading: boolean;
    error: string | null;
}
