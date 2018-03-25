import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import GetWord from '@/components/GetWord'
import AddWord from '@/components/AddWord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GetWord',
      component: GetWord
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/hello',
      name: 'Helloworld',
      component: HelloWorld
    },
    {
      path:'/addword',
      name:'AddWord',
      component:AddWord
    }
  ]
})
