// import { NavLink } from "react-router-dom";
// import { signInWithGoogle, signOut, useAuthState } from "../utilities/fireBase";

// const SignInButton = () => (
//   <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>
//     Sign in
//   </button>
// );

// const SignOutButton = () => (
//   <button className="ms-auto btn btn-dark" onClick={signOut}>
//     Sign out
//   </button>
// );

// const AuthButton = () => {
//   const [user] = useAuthState();
//   return user ? <SignOutButton /> : <SignInButton />;
// };

// const activation = ({ isActive }) => (isActive ? "active" : "inactive");

// const Navigation = () => (
//   <nav className="d-flex">
//     <NavLink to="/" className={activation} end>
//       Posts
//     </NavLink>
//     <NavLink to="/users" className={activation} end>
//       Users
//     </NavLink>
//     <AuthButton />
//   </nav>
// );

// export default Navigation;

import React from "react";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/fireBase";
import "./components.css";

const AuthBanner = ({ title }) => {
  const [user] = useAuthState();

  return (
    <div className="auth-banner">
      <h1>Course Scheduler for {title}</h1>
      {user ? (
        <div>
          <span>Welcome, {user.displayName}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </div>
  );
};

export default AuthBanner;
