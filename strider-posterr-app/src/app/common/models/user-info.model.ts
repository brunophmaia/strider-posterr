import { User } from "./user.model";

export class UserInfo extends User {
    postCount: number;
    followersCount: number;
    followingCount: number;
}