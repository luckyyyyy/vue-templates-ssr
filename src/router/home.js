export default [
  {
    path: '/home',
    // meta: { requiresAuth: true },
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/login'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
