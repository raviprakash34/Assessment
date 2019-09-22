import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyDRLW33fBUIf96cOehPWi0KWTACmZ_RMFE',
  authDomain: 'taskcompleted-81978.firebaseapp.com',
  databaseURL: 'https://taskcompleted-81978.firebaseio.com',
  projectId: 'taskcompleted-81978',
  storageBucket: '',
  messagingSenderId: '836012913239'
};
let app = Firebase.initializeApp(config);
export const db = app.database();