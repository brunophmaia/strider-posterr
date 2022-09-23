export const allPath = "All";
export const followingPath = "Following";
export const userProfilePath = "Profile";

export function insertAtUsername(username: string): string {
    return `@${username}`;
}