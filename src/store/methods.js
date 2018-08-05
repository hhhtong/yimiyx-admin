import { categoryGet } from '@/api'

/* vuex mutations */
export const mutations = {
  UPDATE_CATEGORY_LIST (state, [list, listEqual]) {
    state.categoryList = list
    state.categoryListEqual = listEqual
  },

  SET_TABLECONHEIGHT (state, height) {
    state.tableConHeight = height
  }
}

/* vuex actions */
export const actions = {
  updateCategoryList ({ state, commit }) {
    return categoryGet({ disabledPage: true }).then(result => {
      if (result.code === 50000) {
        let { list, listEqual } = result.data
        list = [{ id: 0, name: '全部' }, ...list]
        commit('UPDATE_CATEGORY_LIST', [list, listEqual])
      }
    })
  }
}
