export interface LoginCredentials {
    username: string;
    password: string;
}

export interface JwtPayload {
    id: number;
    username: string;
    email: string;
}

export interface JwtToken  {
    readonly token: string;
}
