<template>
  <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <!-- error -->
                <div class="error" v-if="getError"> 
                    <p>{{getError}}</p>
                </div>
                <!-- search -->
             <Search 
                placeholder="Type user name" 
                :value="search"
                @search="search = $event"/>
                <!-- button -->
              <button class="btn btnPrimary" @click="getData">{{btnText}}</button>
              <!-- repos info -->
              <div class="repos__wrapper" v-if="getRepos">
                  <div class="repos-ava">
                      <img :src="getUser.ava" alt="">
                      <a :href="getUser.url" target="_blank">Логин: {{getUser.login}}</a>
                      <p>Имя: {{getUser.name}}</p>
                      <p>Кол-во Подписчиков: {{getUser.followers}}</p>
                      <p>Кол-во репов: {{getReposLength}}</p>
                      <div class="pagination">
                          <div class="prev btn btnPrimary" @click="prevPage">&lt;</div>
                          <div class="next btn btnPrimary" @click="nextPage">&gt;</div>
                      </div>
                      <p>Page: {{page.current}} / {{Math.ceil(getReposLength / page.len)}}</p>
                  </div>
                  <div class="repositories">
                      <h2 style="text-align: center">Repositories</h2>
                    <div class="repos-sort">
                      <span @click="sorting('name')">name &#8595;</span>
                      <span @click="sorting('stargazers_count')">stars &#8595;</span>
                    </div>
                    <div class="repos-item" v-for="repo in getRepos" :key="repo.id">
                      <div class="repos-info">
                          <a :href="repo.html_url" target="_blank">{{repo.name}}</a>
                          <span>{{repo.stargazers_count}} ⭐</span>
                      </div>
                  </div>
                  </div>
                
              </div>
        </div>
      </section>
</div>
</template>

<script>
import Search from '../components/Search.vue';
export default {
    components: {
        Search
    },
    data () {
      return { 
        search: '',
        btnText: 'Search',
        currentSort: 'name',
        currentSortDir: 'asc',
        page: {
          current: 1,
          len: 5
        }
      }
    },
    computed: {
       getRepos () {
         if (this.$store.getters.getRepos === null) return this.$store.getters.getRepos
         else {
           return this.$store.getters.getRepos.sort((a, b) => {
                  let mod = 1;
                  if(this.currentSortDir === 'desc') mod = -1;
                  if(a[this.currentSort] < b[this.currentSort]) return -1 * mod;
                  if(a[this.currentSort] > b[this.currentSort]) return 1 * mod;
                  return 0;
           }).
           filter((item, index) => {
              let start = (this.page.current - 1) * this.page.len;
              let end = this.page.current * this.page.len;
              if(index >= start && index < end) return true;
           }) 
         }
       },
       getUser () {
         return this.$store.getters.getUser
       },
       getError () {
         return this.$store.getters.getError
       },
       getReposLength () {
          return this.$store.getters.getRepos.length
       }
    },
    methods: {
       sorting (title){
            if(title === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = title;
       },
       prevPage () {
          if(this.page.current > 1) this.page.current--;
       },
       nextPage () {
          if(this.page.current * this.page.len < this.getReposLength) this.page.current++;
       },
       getData () {
         this.$store.dispatch('setRepos', this.search);
       }
    }
}
</script>
<style lang="scss">
    .container{
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .btn{
      margin-top: 40px;
    }
    .repos__wrapper{
      max-width: 600px;
      width: 100%;
      display: flex;
      gap: 30px;
      margin: 30px 0;
     
    }
    .repos-ava{
      max-width: 200px;
      width: 100%;
      img{
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: block;
        margin-bottom: 20px;
      }
      p{
        margin: 10px 0;
      }
    }
    .repositories{
      flex-grow: 1;
    }
    .pagination {
      user-select: none;
    }
    .repos-sort{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        margin-bottom: 15px;
        span{
          cursor: pointer;
        }
    }
    .error{
      margin-bottom: 20px;
    }
    .repos-info{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px 0;
    }
   
</style>