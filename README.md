
# Strider Posterr

Bruno Maia - Strider Web Front-end Assessment - 2.4

## Getting started

It's necessary to install Node.js /npm.

https://nodejs.org/en/download/package-manager/

Inside of the strider-posterr-app folder run the commands bellow:

Install angular CLI:

```npm install -g @angular/cli```

Allow the execution of PowerShell scripts on Windows:

```Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned```

Install dependencies:

```npm install```

Run project:

```ng s```

By default the application will start in http://localhost:4200. If necessary the option ```--port <portNumber>``` can be added in the ```ng s``` command.

## Planning

#### Questions  for the Product Manager

- Can the answers be made both on the homepage and on the userprofile page?

- Are there comment limits per day or per post?

- How many characters can an answer contain?

- What are the conditions to be able to reply to a post? Need an user to follow another?

- Will there be a new indicator on the userprofile page for number of replies?

- Will it be possible to edit and delete a comment?

- Can a post author comment on their own post?

- Can a post author delete comments from other users?

#### Solution

- Front-end
On the homepage there will be a third button, beside to the Repost and Quote Post buttons. Clicking on the button will open an input for the reply. Even though replies are not displayed on the homepage, often users want to add a reply quickly and they don't want to go to the user profile page and find the post to reply. As Post shares the same component, the reply button will automatically be implemented on the homepage and user profile page.

On the user profile page the component will be changed to tabs: the first tab will show only posts without replies; in the second tab there will be the posts with replies. By clicking on the post reply button, the input will open to insert the comment and the list of replies that the post has as well.

- Database:
A new entity 'reply' will be created. Initially, the entity will basically have 4 attributes indicating the post, the reply's author, the date, and the content.

- API:

On the user profile page, the API should filter post and reply posts, to display in each front-end tab. In reply-posts, the API will have to fetch the list of comments for each post.

## Critique

Components such as 'All/Following' toogle in the mobile version were positioned based on pixel. The circle element with the first letter of the username had its size based on pixels as well. For these cases, the best implementation is always have sizes based on proportions and the position should be based on other elements. That way it is impossible to have overlapping or layout break problems.

Scaling the application, features like color theme, internationalization (i18n) would be essential. Users often switch between dark and light theme. The application styling css is prepared to the theming change and internationalization, but some places dates string has to be checked, and colors text constrating with background as well.
An improvement related to the posts could be a type of timer implementation. This timer would update how long was posted, even with the user not interacting with the application.  
The application is responsive to web and mobile browsers. So, for mobile device with larger screens, such as tables, the components could be refactored to use better the large screens.

Another component that should have been implemented is a scroll pagination. When the user scrolling down, the posts must be requested from the API. If there are too many posts loaded, the ones furthest from the scroll position should be destroyed. This is a way to prevent the frontend from being overloaded with elements and the page stop to work. This would be the first thing that would fail with many posts. The application is currently requesting and loading all posts on the screen.

Basically a front-end application to be very scalable has to avoid loading too many components, doing too many recursive renderings and avoiding having too many components with multiple listeners. Of all the possible problems, the only one that the application could fail is the big number of posts. So, a scroll pagination would solve this problem.

For the front-end application, other types of technology would not be necessary to be able to scale. It would take unit tests, component initialization tests, or other tests to verify that some input or action is not causing a logic or layout compliance problem.

## Application notes

By default, the application will initalize with a mocked data. In the application left menu there are two buttons to the management of this stored data.
The first one will clean the data and initalize with the mock data. The second will clean all the locale storage, inserting only the default user. The default user is placed in the file:

```strider-posterr-app/src/app/common/services/auth/auth.service.ts```

Changing the loggedUser attribute the application logged user will be updated.

In the mock data there are the relationships:

- 'brunophmaia' follows the users: 'posterr', 'samuel' and 'dudatobias'

- 'posterr' follows the users: 'brunophmaia'

- 'dudatobias' follows the users: 'samuel'