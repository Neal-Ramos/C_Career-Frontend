export interface IUpdateAdminAccountReq {
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    middleName: string,
    birthDate: string
}
export interface IAdminChangePasswordReq{
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}