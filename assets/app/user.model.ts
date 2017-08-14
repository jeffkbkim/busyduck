export class User {
    constructor(public email: string,
                public password: string,
                public isAdmin: boolean,
                public firstName?: string,
                public lastName?: string,
                public positions?: Array<Object>) {}
}