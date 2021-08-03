export class Login{
    public id: number;
    public username: string;
    public password: string;
    public token: string;
 
     constructor(id?: number, username?: string, password?: string, token?: string){
         this.id = id;
         this.username = username;
         this.password = password;
         this.token = token;
     }
 }