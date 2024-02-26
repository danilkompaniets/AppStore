import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Layout, AdminLayout, AuthLayout } from "../layouts/index.js";
import { Home, UserProfile, AdminHome } from "../pages";
import { Authentication } from "../pages";
import { auth } from "../config/firebase.config.js";

const App = () => {
  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* client users */}
        <Route element={<Layout />} />
        <Route path="/profile/:uid" element={<UserProfile />} />

        {/* Admin users */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
        </Route>

        {/* Auth Layout */}
        <Route path={"auth/*"} element={<AuthLayout />}>
          <Route index element={<Authentication />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
