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

export interface TreeNode {
    name: string;
    selected: boolean;
    children: TreeNode[];  // Mảng các node con
    parent: TreeNode | null;  // Tham chiếu tới node cha hoặc null nếu không có cha
}
