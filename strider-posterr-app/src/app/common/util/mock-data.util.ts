import { Post } from "../models/post.model";
import { UserFollowing } from "../models/user-following.model";
import { User } from "../models/user.model";

export const users: Array<User> = [{ "username": "brunophmaia", "joinedDate": new Date("2022-09-19T03:00:00.000Z") },
                                   { "username": "posterr", "joinedDate": new Date("2022-09-20T03:00:00.000Z") },
                                   { "username": "dudatobias", "joinedDate": new Date("2022-09-21T03:00:00.000Z") },
                                   { "username": "samuel", "joinedDate": new Date("2022-09-21T03:00:00.000Z") }];

export const usersFollowing: Array<UserFollowing> = [{"username":"posterr","userFollowing":"brunophmaia"},
                                                     {"username":"brunophmaia","userFollowing":"posterr"},
                                                     {"username":"brunophmaia","userFollowing":"samuel"},
                                                     {"username":"brunophmaia","userFollowing":"dudatobias"},
                                                     {"username":"dudatobias","userFollowing":"samuel"}];

export const posts: Array<Post> = [{
                                    "text":"The Project Manager you work with wants to build a new product, a new social media application called Posterr. Posterr is very similar to Twitter, but it has far fewer features.\nPosterr only has two pages, the homepage, and the user profile page, which are described below. Other data and actions are also detailed below.",
                                    "author":"brunophmaia",
                                    "datetime": new Date("2022-09-19T19:39:42.752Z"),
                                    "id":"1664134782752-brunophmaia"
                                   },
                                   {
                                    "text":"The homepage, by default, will show a feed of all posts, from all users\nThere is a toggle switch \"All / following\" that allows you to switch between seeing all posts and just posts by those you follow. For both views, all kinds of posts are expected on the feed (regular posts, reposts, and quote posts).\nThe URL should change when toggling between  \"All / following\"\n If you open the page fresh, by typing the URL for \"All\" or \"Following\" in the browser, it should show the properly unfiltered or filtered page.\nNew posts can be written from this page.",
                                    "author":"brunophmaia",
                                    "datetime": new Date("2022-09-20T19:40:21.660Z"),
                                    "id":"1664134821660-brunophmaia"
                                   },
                                   {
                                    "text":"This page should be a modal over the homepage",
                                    "author":"posterr",
                                    "datetime": new Date("2022-09-21T19:40:48.747Z"),
                                    "id":"1664134848747-posterr"
                                   },
                                   {
                                    "author":"brunophmaia",
                                    "idRepost":"1664134848747-posterr",
                                    "datetime": new Date("2022-09-21T19:41:21.941Z"),
                                    "id":"1664134881941-brunophmaia"
                                   },
                                   {
                                    "text":"The URL should change when visiting this page",
                                    "idRepost":"1664134848747-posterr",
                                    "author":"brunophmaia",
                                    "datetime": new Date("2022-09-22T19:41:59.263Z"),
                                    "id":"1664134919263-brunophmaia"
                                   },
                                   {
                                    "text":"Shows a feed of all posts the user has made (including reposts and quote posts)",
                                    "author":"dudatobias",
                                    "datetime": new Date("2022-09-23T19:43:03.513Z"),
                                    "id":"1664134983513-dudatobias"
                                   },
                                   {
                                    "text":"Users are not allowed to post more than 5 posts in one day (including reposts and quote posts)",
                                    "author":"samuel",
                                    "datetime": new Date("2022-09-25T19:43:52.521Z"),
                                    "id":"1664135032521-samuel"
                                   },
                                   {
                                    "author":"posterr",
                                    "idRepost":"1664134782752-brunophmaia",
                                    "datetime": new Date("2022-09-25T19:46:14.390Z"),
                                    "id":"1664135174390-posterr"
                                }];