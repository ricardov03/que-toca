import { reactive, watch } from 'vue'
// import axios from 'axios'

export const decree = () => {
  const state = reactive({
    response: [],
  })
  watch(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((jsonResponse) => {
        state.response = jsonResponse.data
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return state
}
