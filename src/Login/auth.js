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
          const userDoc = userQuery.docs[0];
          const userData = userDoc.data();
    
          // Authenticate with Firebase using email and password
          return auth.signInWithEmailAndPassword(userData.email, password);
        } 
        else {
          throw new Error('User not found');
        }
      } 
      catch (error) {
        throw error;
      }
};

// *! Registration of Educator by the Admins. See AfterAdminLogin.js
export const educatorregisterbyadmins = async(username) => {
    try {
        await db.collection('employeelogin').add({
          username: username,
        });
    } 
    catch (error) {
      throw error;
    }
}

// *! See EducatorRegister.js
export const educatorregister = async(username, dob, email, password) => {
  try{
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await user.sendEmailVerification();
    const combinedVariable = `${username}_${dob}`;
    const educatorRef = await db.collection('employeelogin')
    .where('username', '==', username)
    .get()
    if (!educatorRef.empty) {
      const doc = educatorRef.docs[0];
      await db.collection('employeelogin').doc(doc.id).update({
        email: email,
        password: password,
        username: combinedVariable
    });
  }
  else {
    throw new Error('Educator not found');
  }
  }
  catch (error) {
    throw error;
  }
}

// *!  Login for employees. See EducatorLogin.js
export const educatorlogin = async(username, email, password) => {
    try {
      const userQuery = await db.collection('employeelogin')
        .where('email', '==', email)
        .where('password', '==', password)
        .get();
    
        if (!userQuery.empty) {
          const userDoc = userQuery.docs[0];
          const userData = userDoc.data();
          return auth.signInWithEmailAndPassword(userData.email, userData.password);
        } 
        else {
          throw new Error('User not found');
        }
    } 
    catch (error) {
      throw error;
    }
}

// *! AfterAdminLogin.js
export const students_assigned_to_educator = async(studentname, subjectname, educatoremail, classcount) => {
  try{
    const educatorRef = await db.collection('employeelogin')
    .where('email', '==', educatoremail)
    .get()

    if (!educatorRef.empty) {
      const educatorDoc = educatorRef.docs[0]; 
      const currentStudentInfo = educatorDoc.data().studentinfo || [];
      currentStudentInfo.push({ studentname, subjectname, classcount });
      await educatorDoc.ref.update({
        studentinfo: currentStudentInfo
      });
    } 
    else {
      throw new Error('Educator not found');
    }
  }
  catch (error) {
    throw error;
  }
}

// *! AfterEducatorLogin.js
export const fetchStudents_for_AfterEducatorLogin = async (email) => {
  try {
    const snapshot = await db.collection('employeelogin')
      .where('email', '==', email) 
      .get();
    const studentInfo = [];
    snapshot.forEach((doc) => {
      const studentData = doc.data().studentinfo;
      if (Array.isArray(studentData)) {
        studentData.forEach((student) => {
          studentInfo.push({
            studentname: student.studentname,
            subjectname: student.subjectname,
            classcount: student.classcount
          });
        });
      }
    });
    return studentInfo;
  } 
  catch (error) {
    throw error;
  }
};

// *! AfterEducatorLogin.js
export const updateTotalClassesCount = async (studentname, subjectname, count, email) => {
  try {
    const educatorRef = await db.collection('employeelogin')
      .where('email', '==', email)
      .get()

    if (!educatorRef.empty) {
      const educatorDoc = educatorRef.docs[0];
      const currentStudentInfo = educatorDoc.data().studentinfo || [];
      const studentIndex = currentStudentInfo.findIndex((student) => student.studentname === studentname && student.subjectname === subjectname);

      if (studentIndex !== -1) {
        // Update the specific student's classcount
        currentStudentInfo[studentIndex].classcount = count;

        await educatorDoc.ref.update({
          studentinfo: currentStudentInfo,
        });
      } 
      else {
        throw new Error('Student not found');
      }
    } 
    else {
      throw new Error('Educator not found');
    }
  } 
  catch (error) {
    throw error;
  }
}

// Log out the current user
export const logout = () => {
    return auth.signOut();
};