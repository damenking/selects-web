import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyCJffYj1XNZXUhOOYpvlxsUPP6NR-HrG-U',
  authDomain: 'selectsweb.firebaseapp.com',
  databaseURL: 'https://selectsweb.firebaseio.com',
  projectId: 'selectsweb',
  storageBucket: 'selectsweb.appspot.com',
  messagingSenderId: '730451883325',
  appId: '1:730451883325:web:00605fbcba2d1e1610c154',
  measurementId: 'G-XVTCSHFFHK'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth, firebase };
