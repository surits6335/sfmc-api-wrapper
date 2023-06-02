export class UserModel
{
    UserID: string = '';
    Password: string = '';
    Name: string = '';
    Email: string = '';
    NotificationEmailAddress: string = '';
    ActiveFlag: boolean = false;
    IsAPIUser: boolean = false;
    IsLocked: boolean = false;
    MustChangePassword: boolean = false;
    DefaultBusinessUnit: number = 0;
    RoleObjectID: string = '';
}