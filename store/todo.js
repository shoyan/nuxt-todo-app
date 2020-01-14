import axios from 'axios'

export const state = () => ({
  todoList: [],
});

export const actions = {
  /**
   * Todo取得
   * @param {object} object.commit - vuex commit
   * @returns {void}
   */
  async getTodo({ commit }) {
    const { data } = await axios.get(`http://localhost:3000/api/todo/`)

    if (data) {
      data.forEach(todo => {
        commit("pushTodoList", todo);
      });
    }
  },
  /**
   * Todo作成
   * @param {object} object.commit - vuex commit
   * @returns {void}
   */
  async create({ commit }, content) {
    const { data } = await axios.post(`http://localhost:3000/api/todo/`, content)
    commit("pushTodoList", data);
  },
  async update({ commit }, params) {
    const { data } = await axios.patch(`http://localhost:3000/api/todo/${params.id}`, { content: params.content })
    commit("updateTodo", params);
  }
};

export const getters = {
  /**
   * TodoList取得
   * @param {object} state - vuex state
   * @returns {array} - Todo
   */
  all(state) {
    return state.todoList
  },
}

export const mutations = {
  /**
   * Todo追加
   * @param {object} state - vuex state
   * @param {object} todo - Todo
   * @returns {void}
   */
  pushTodoList(state, todo) {
    state.todoList.unshift(todo);
  },
  updateTodo(state, data) {
    for(let i = 0; i < state.todoList.length; i++) {
      if (state.todoList[i].todo_id === data.id) {
        state.todoList[i].content = data.content
      }
    }
  }
};
