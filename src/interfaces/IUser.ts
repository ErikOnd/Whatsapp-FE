export interface IUser {
    _id: string;
    username: string
    password: string
    email: string
    avatar: string
    status: "online" | "offline"
    // googleId: string
    createdAt: string;
    updatedAt: string;
}
