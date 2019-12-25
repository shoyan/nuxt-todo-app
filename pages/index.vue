<template>
  <section class="container">
    <h1>Todo App</h1>
    <div><input type="text" name="content" v-model="content" /></div>
    <div>
      <button @click="save">save</button>
    </div>
    <ul v-for="row in todo" :key="row.todo_id">
      <li>
        <span>{{ row.content }}</span><span>×</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function() {
    return {
      content: ''
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
    save: function() {
      this.$store.dispatch('todo/create', {content: this.content});
      this.content = '';
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
