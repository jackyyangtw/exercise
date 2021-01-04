<template>
  <div id="app">
    <loading :active.sync="isLoading" ></loading>
    <div class="toTop bg-light p-2 rounded-circle">
      <a><i class="fas fa-arrow-up text-warning"></i></a>
    </div>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end m-0 bg-warning" >
      <div class="container">
        <div class="p-1 bg-lighter">
          <h1 class="display-5 font-weight-bold text-center">台灣旅遊網</h1>
          <p class="lead text-center">台灣的旅遊資訊盡在台灣旅遊網!</p>
        </div>
      </div>
    </div>
    <form class="form-inline my-3 my-lg-0 m-auto" id="searchBar">
      <div class="input-group text-center p-3">
        <label for="">請輸入縣市名稱:</label>
        <input class="form-control ml-1" type="text" v-model="searchText"
          placeholder="臺北市、臺東縣" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchText = ''">
            清除
          </button>
        </div>
        <select name="region" id="" v-for="item in regionData" :key="item.region">
          <option value="">{{ item.Region }}</option>
        </select>
      </div>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">地區</th>
          <th scope="col">城市</th>
          <th scope="col">名稱</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in filterData " :key="data.Id" >
          <th scope="row" >{{ data.Region }}</th>
          <td>{{ data.Town }}</td>
          <td>{{ data.Name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'App',
  data(){
    return {
      datas: [],
      searchText: '',
      isLoading: false,
    }
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.datas.filter((item) => {
          const apiRegion = item.Region.toLowerCase().includes(vm.searchText.toLowerCase());
          return apiRegion;
        });
      }
      return vm.datas;
    },
    regionData(){
      const vm = this
      return vm.datas.filter((item)=>{
        return item.Region === vm.datas.Region
      })
    }
  },
  created(){
    const vm = this
    vm.isLoading = true
    this.axios({
      url: '/api/XMLReleaseALL_public/scenic_spot_C_f.json',
      method: "get",
      crossdomain: true,
    }).then((res) => {
      console.log(res.data.XML_Head);
      let Info = res.data.XML_Head.Infos.Info
      let newInfo = []
      Info.filter(item=>{
        if(item.Region !== null){
          newInfo.push(item)
        }
      })
      vm.datas = newInfo
      vm.isLoading = false
    });
  },
  mounted (){
    $(document).ready(()=>{
      $('.toTop').click((event) => {
        event.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 500);
      });
      $(window).scroll(function(){
        if ($(window).scrollTop() >= 50) {
          $('.toTop').fadeIn();
        } else {
          $('.toTop').fadeOut();
        }
      })
    })
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/_reset.sass'
@import "~bootstrap/scss/bootstrap";
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
.toTop
  position: fixed
  right: 10px
  bottom: 30px
  cursor: pointer
  z-index: 100
  i
    font-size: 50px
</style>
