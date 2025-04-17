export interface User {
    id: number,
    username: string,
    password: string | undefined | null,
    isActive: boolean
}

export interface UserDto {
    pk_userID: string,
    fk_companyID: string,
    username: string,
    userNameLower: string,
    fullname: string
}