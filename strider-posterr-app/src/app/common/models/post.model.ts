export class Post {
    id: string;
    author: string;
    text?: string;
    repost?: Post;
    idRepost?: string;
    datetime: Date;
}