export default [
  {
    path: '/',
    name: 'index',
    meta: { requiresAuth: true },
    redirect: { name: 'home' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
  },
];
