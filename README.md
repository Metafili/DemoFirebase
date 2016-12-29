## DemoFirebase
Basically the demo consists of an app that lists the users who have signed in to the app. When a new user signs in, a notification is sent to the other users who have the app installed, to indicate that a new user has been added to the list.

The app is composed by 3 important elements:

**LoginActivity:** The user can choose between authenticate by google or anonymously (if the user signs in anonymously it doesn't count as a complete user, therefore the notification isn't sent to other users or appears in the list, but can see the content).

**MainActivity:** Keeps updating the list of users, and if the user is anonymous, gives you the opportunity in the contextual menu to sign in with google.

**Server.js:** It's the app server that listens when there is an insertion in the database (new user) to then send a notification to everybody.

Summarizing in this app has touched the following features of firebase:
* **Realtime Database**
* **Authentication (via Google and anonymously)**
* **Cloud Messaging and Notifications**


