import axios from 'axios'
import history from '../history'

const GET_EVENTS = 'GET_EVENTS'
const REMOVE_USER = 'REMOVE_USER'

const defaultEvents = []

const getEvents = events => ({type: GET_EVENTS, events})
//const removeUser = () => ({type: REMOVE_USER})
            
export const events = () => async dispatch => {
  try {
    const res = await axios.get('/api/events')
    dispatch(getEvents(res.data || defaultEvents))
  } catch (err) {
    console.error(err)
  }
}

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    default:
      return state
  }
}
