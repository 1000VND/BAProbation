export interface User {
    id: number,
    username: string;
    password: string | undefined | null;
    isActive: boolean
}

