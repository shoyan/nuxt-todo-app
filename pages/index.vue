<template>
  <section class="container">
    <h1>{{ days[date.getDay()] }} <span>{{ months[date.getMonth()] }} {{ date.getDate() }}</span></h1>
    <input @keydown.enter="save" type="text" name="content" v-model="content" placeholder="+ add a new task"/>
    <transition-group name="list-complete" tag="ul">
      <li v-for="row in todo" :key="row.id" class="task_list list-complete-item">
        <input class="done" type="checkbox" name="done" :checked="row.done" @input="updateDone(row.id, $event)"> 
        <input type="text" name="updatedContent" :value="row.content" @blur="update(row.id, $event)" class="task">
        <font-awesome-icon icon="trash" class="trash" @click="deleteTodo(row.id)" />
      </li>
    </transition-group>
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
    await store.dispatch('todo/getTodo')
  },
  methods: {
    save: function(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode !== 13) return
      this.$store.dispatch('todo/create', {content: this.content})
      this.content = ''
    },
    update: function(id, event) {
      this.$store.dispatch('todo/update', {id, content: event.target.value})
    },
    deleteTodo: function(id) {
      this.$store.dispatch('todo/delete', id)
    },
    updateDone: function(id, event) {
      this.$store.dispatch('todo/update', {id, done: event.target.checked})
    },
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
  border-bottom: 1px solid #666;
  list-style-type: none!important;
}

.task {
  background-color: rgb(53, 54, 58);
  margin: 0;
  border-radius: 0;
}

.task_list {
  background-color: rgb(53, 54, 58);
  display: flex;
}

.trash {
  cursor: pointer;
  margin: 15px;
}

.list-complete-item {
  transition: all .8s;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
  width: 95%;
}

.done {
  width: 20px;
}

@media screen and (min-width: 768px){
  input {
    width: 99%;
  }

  .list-complete-leave-active {
    width: 99%;
  } 
}
</style>
