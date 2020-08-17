import React, { useState, useEffect } from "react";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import { ToastContainer, toast } from "react-toastify";
import LoggedLayout from "./Layouts/LoggedLayout";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged(currentUser => {
    // console.log(currentUser);
    if (currentUser && !currentUser.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  });
  if (loading) {
    return null;
  }
  //return !user ? <Auth /> : <UserLogged />;

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
