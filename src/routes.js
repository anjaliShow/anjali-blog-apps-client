import BlogDetails from './pages/BlogDetails';
import Home from './pages/Home';
import Library from './pages/Library';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import WriteBlog from './pages/WriteBlog';

// export const routes = [
//   {
//     path: '/',
//     exact: true,
//     name: 'Home',
//     element: Home,
//   },
//   {
//     path: '/blog/:id',
//     exact: true,
//     name: 'Blogs',
//     element: BlogDetails,
//   },
// ];

export const protectedroutes = [
  {
    path: '/',
    protectedRoute: false,
    exact: true,
    name: 'Home',
    element: Home,
  },
  {
    path: '/blog/:id',
    protectedRoute: false,
    exact: true,
    name: 'Blogs',
    element: BlogDetails,
  },
  {
    path: '/my-profile',
    protectedRoute: true,
    exact: true,
    name: 'Profile',
    element: Profile,
  },
  {
    path: '/my-posts',
    protectedRoute: true,
    exact: true,
    name: 'My Posts',
    element: MyPosts,
  },
  {
    path: '/my-library',
    protectedRoute: true,
    exact: true,
    name: 'Library',
    element: Library,
  },
  {
    path: '/write-blog',
    protectedRoute: true,
    exact: true,
    name: 'Write Blog',
    element: WriteBlog,
  },
];

// export default routes;
