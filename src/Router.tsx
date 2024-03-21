/* eslint-disable mobx/missing-observer */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "layout";
import PrivateRoute from "layout/PrivateRoute";
import AdminRoute from "layout/AdminRoute";

const Main = lazy(() => import("pages/Main/Main"));
const Login = lazy(() => import("pages/Login/Login"));
const Registration = lazy(() => import("pages/Registration/Registration"));
const User = lazy(() => import("pages/User/User"));
const Profile = lazy(() => import("pages/Profile/Profile"));
const ProfileSettings = lazy(
   () => import("pages/ProfileSettings/ProfileSettings"),
);
const Posts = lazy(() => import("pages/Posts/Posts"));
const PostItem = lazy(() => import("pages/PostItem/PostItem"));
const Users = lazy(() => import("pages/Users/Users"));
const SearchPosts = lazy(() => import("pages/SearchPosts/SearchPosts"));

// const SelectPage = lazy(() => import("pages/test/Select"));
// const AccessTokenTest = lazy(() => import("pages/test/AccessTokenTest"));

const Dashboard = lazy(() => import("layout/DashboardLayout/DashboardLayout"));

const DashboardPosts = lazy(
   () => import("pages/DashboardPosts/DashboardPosts"),
);
const DashboardUsers = lazy(
   () => import("pages/DashboardUsers/DashboardUsers"),
);

export const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route element={<Layout />} path="/">
               <Route index element={<Main />} />

               <Route element={<Posts />} path="/posts" />
               <Route element={<PostItem />} path="/posts/:id" />

               <Route element={<Users />} path="/users" />
               <Route element={<User />} path="/user/:id" />

               <Route element={<SearchPosts />} path="/search" />

               <Route element={<Login />} path="/login" />
               <Route element={<Registration />} path="/registration" />

               <Route element={<PrivateRoute />} path="">
                  <Route element={<Profile />} path="/profile" />
                  <Route
                     element={<ProfileSettings />}
                     path="/profile/settings"
                  />
                  <Route element={<AdminRoute />} path="">
                     <Route element={<Dashboard />} path="/dashboard/*">
                        <Route element={<DashboardPosts />} path="posts" />
                        <Route element={<DashboardUsers />} path="users" />
                     </Route>
                  </Route>
               </Route>

               {/* <Route
                  element={
                     <Suspense fallback={<LoadSpinner />}>
                        <AccessTokenTest />
                     </Suspense>
                  }
                  path="/Token"
               />
               <Route element={<SelectPage />} path="/select" /> */}
            </Route>
         </Routes>
      </BrowserRouter>
   );
};
