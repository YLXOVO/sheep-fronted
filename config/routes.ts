export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录' ,path: '/user/login', component: './user/Login' },
      {name: '注册' , path: '/user/register', component: './user/Register' },
      { component: './404' }],
  },
  { name: '欢迎页',path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    name: '管理页',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { name:'用户管理',path: '/admin/user-manager', icon: 'smile', component: './Admin/UserManager' },
      { component:  './404'}
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
