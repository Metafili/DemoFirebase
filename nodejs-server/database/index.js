/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START imports]
var firebase = require('firebase-admin');
// [END imports]

var FCM = require('fcm-push');

// TODO(DEVELOPER): Change the two placeholders below.
// [START initialize]
// Initialize the app with a service account, granting admin privileges
var serviceAccount = require("./secrets.json");

var serverKey = 'AAAAlxqoghI:APA91bEE1DEDVrl-fHrxmoDlWDVXAfAjZ9zkC7FZGQ60xdk7n9Yus46oeAehS_3FU99UJcEU2RTK4-atxJX2VHZ41m3KjeqJPQzVBSKKx1sGkb9y1cKaxaKTF5h9Fejy7HyFBy8XkLEHpme-2cQpwojzCY_27Tkp0w';
var fcm = new FCM(serverKey);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://demofirebase-47a7f.firebaseio.com'
});
// [END initialize]

/**
 * Keep the likes count updated and send email notifications for new likes.
 */
function startListeners() {
  firebase.database().ref('/users').on('child_added', function(userSnapshot) {

    var message = { 
        to: '/topics/user_engage', 
        notification : {
            title : 'New user!',
            body : userSnapshot.val().name + ' joined to BEEVAPP'
        }
    };

    // TODO: enviar notificacion del nuevo usuario
    fcm.send(message, function(err,response){  
        if(err) {
            console.log("Something has gone wrong !",err);
        } else {
            console.log("Successfully sent with resposne :",response);
        }
    });

  });
  console.log('New users notifier started...');
  console.log('Users count updater started...');
}

// Start the server.
startListeners();
