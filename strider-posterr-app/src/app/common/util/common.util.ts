export const allPath = "All";
export const followingPath = "Following";
export const userProfilePath = "Profile";

export const usernameParam = "username";

export function insertAtUsername(username: string): string {
    return `@${username}`;
}

export function copy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }