<template>
  <section class="container">
    <h1>{{ days[date.getDay()] }} <span>{{ months[date.getMonth()] }} {{ date.getDate() }}</span></h1>
    <input @keydown.enter="save" type="text" name="content" v-model="content" placeholder="+ add a new task"/>
    <ul>
      <li v-for="row in todo" :key="row.todo_id">
        {{ row.content }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function() {
    return {
      content: '',
      date: new Date(),
      days: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
      months: ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
    }
  },
  computed: {
    ...mapGetters({
      todo: 'todo/all',
    }),
  },
 async fetch({ store, query }) {
    await store.dispatch('todo/setTodo')
  },
  methods: {
    save: function(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode !== 13) return
      this.$store.dispatch('todo/create', {content: this.content});
      this.content = '';
    }
  }
}
</script>

<style scoped>
input {
  background: #001100;
  display: block;
  width: 96%;
  margin: 1rem auto;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #a0a0a0;
  outline: none;
}

h1 {
  text-align: center;
  margin: 10px;
  font-weight: 400;
}

h1 span {
  font-weight: 300;
}

ul {
  padding: 0 0.5em;
  position: relative;
}

ul li {
  line-height: 1.5;
  padding: 0.5em 0 0.5em 1.5em;
  border-bottom: 1px solid #666;
  list-style-type: none!important;
}

@media screen and (min-width: 768px){
  input {
    width: 99%;
  }
 
}
</style>
