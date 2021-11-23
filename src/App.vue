<template>
  <div class="wrapper">
      <header>
       <div class="navbar">
         <div class="container">
            <div class="navbar-content">
              <div class="logo">
                Github Finder
              </div>
              <!-- <ul class="navbar-list">
                <li class="navbar-item" v-for="link in links" :key="link.title">
                  <router-link class="navbar-link" :to="link.url">{{link.title}}</router-link>
                </li>
              </ul> -->
          </div>
         </div>
       </div>
      </header>
      <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  data () {
    return {
      links: [
        {title: 'Home', url: '/'},
      ]
    }
  }
};
</script>
<style lang="scss">
    .navbar-link.router-link-exact-active{
      color: rgb(24, 89, 241);
    }
</style>


