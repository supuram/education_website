// auth.js
import 'firebase/auth';
import { auth } from './../firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

// Register a new user
export const register = async(username, email, password) => {
  // Create a new user with the specified email and password
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;

  // Update the user's profile with their username
  await user.updateProfile({
    displayName: username,
  });

  await db.collection('admin').doc(user.uid).set({
    username: username,
    email: email,
  });
};

// Send email verification
export const sendEmailVerification = () => {
  return auth.currentUser.sendEmailVerification();
};

// Log for Admins
export const login = async(username, password) => {
    try {
        // Find the user based on the provided username
        const userQuery = await db.collection('admin').where('username', '==', username).get();
    
        if (!userQuery.empty) {
          // Get the first matching document (assuming usernames are unique)
          const userDoc = userQuery.docs[0];
          const userData = userDoc.data();
    
          // Authenticate with Firebase using email and password
          return auth.signInWithEmailAndPassword(userData.email, password);
        } 
        else {
          // Username not found
          throw new Error('User not found');
        }
      } 
      catch (error) {
        throw error;
      }
};

// Registration of Educator by the Admins
export const educatorregister = async(email, password) => {
    try {
        // Create a new document in the 'employeelogin' collection
        await db.collection('employeelogin').add({
          email: email,
          password: password,
        });
    } 
    catch (error) {
        throw error;
    }
}

// Login for employees
export const educatorlogin = async(username, password) => {
    try {
        // Find the user based on the provided username
        const userQuery = await db.collection('employeelogin')
        .where('username', '==', username)
        .where('password', '==', password)
        .get();
    
        if (!userQuery.empty) {
            return true
        } 
        else {
            return false
        }
      } catch (error) {
        throw error;
      }
}

// Log out the current user
export const logout = () => {
    return auth.signOut();
};