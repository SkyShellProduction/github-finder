import axios from 'axios';
export default {
      state:{
        repos: null,
        error: null,
        user: {
            login: '',
            name: '',
            url: '',
            ava: '',
            followers: ''
        }
    },
    mutations:{
       setUser (state, payload) {
           state.user = payload;
       },
       setRepos(state, payload) {
           state.repos = payload; 
       },
       setError(state, payload) {
           state.error = payload
       }
    },
    actions:{
        setUser ({commit}, payload) {
            commit('setUser', payload);
        },
        setRepos({commit}, payload) {
            axios.get(`https://api.github.com/users/${payload}/repos`)
            .then(res => {
                this.error = null;
                commit('setError', null);
               
                commit('setRepos', res.data);
            })
            .catch(e => {
                commit('setError', `Can't find this user`);
                commit('setRepos', null);
            })
            axios.get(`https://api.github.com/users/${payload}`)
            .then(res => {
               let user = {
                  login: res.data.login,
                  name: res.data.name,
                  url: res.data.html_url,
                  ava: res.data.avatar_url,
                  followers: res.data.followers
                }
                commit('setUser', user);
            })
            .catch(e => {
                commit('setError', `Can't find this user`);
                commit('setRepos', null);
            }); 
        },
        setError({commit}, payload) {
            commit('setError', payload);
        }
    },
    getters:{
       getError: state => state.error,
       getUser: state => state.user,
       getRepos: state => state.repos,
    },
}