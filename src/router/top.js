export default [
  {
    path: '/',
    name: 'index',
    meta: { requiresAuth: true },
    // redirect: { path: '/home' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
];
