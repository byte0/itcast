import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/user/User'
import Right from '@/components/right/Right'
import Role from '@/components/right/Role'
import Category from '@/components/product/Category'
import Param from '@/components/product/Param'
import PHome from '@/components/product/PHome'
import List from '@/components/product/List'
import Add from '@/components/product/Add'
import Edit from '@/components/product/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/welcome', // 重定向到子路由
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/users', component: User, name: 'user'},
        {path: '/rights', component: Right, name: 'right'},
        {path: '/roles', component: Role, name: 'role'},
        {path: '/categories', component: Category, name: 'categorie'},
        {path: '/params', component: Param, name: 'param'},
        {
          path: '/goods',
          component: PHome,
          name: 'phome',
          redirect: '/list',
          children: [
            {path: '/list', component: List, name: 'list'},
            {path: '/add', component: Add, name: 'add'},
            {path: '/edit', component: Edit, name: 'edit'}
          ]
        }
      ]
    }
  ]
})
