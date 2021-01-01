<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end m-0">
      <div class="container">
        <div class="p-1 bg-lighter">
          <h1 class="display-5 font-weight-bold text-center">台灣旅遊網</h1>
          <p class="lead text-center">台灣的旅遊資訊盡在台灣旅遊網!</p>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">地區</th>
          <th scope="col">城市</th>
          <th scope="col">名稱</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      data: []
    }
  },
  created(){
    // this.$http.get("api/open-api/swagger/docs/V1").then((response) => {
    //   console.log(response.data)
    // })
    this.$http({
          url: "/api",
          method: "get",
          crossdomain: true,
        }).then((res) => {
          // const resObject = JSON.parse(res)
          console.log(res);
        });
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

</style>
