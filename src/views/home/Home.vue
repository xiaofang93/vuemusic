<template>
  <div class="home">
    <div class="tags" v-for="item in names" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { request } from "../../notework/request"
export default {
  name: "Home.vue",
  data() {
    return {
      names: [],
    }
  },
  created() {
    this.getSongDetail()
  },
  methods: {
    getSongDetail() {
      request({
        url: "/playlist/hot",
      }).then((res) => {
        console.log(res)
        this.names = res.data.tags
        console.log(this.names)
      })
    },
  },
}
</script>

<style scoped></style>
