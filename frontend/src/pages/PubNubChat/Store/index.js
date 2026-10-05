import { store } from "../../../reduxStore/store"
import create from "zustand"

export const ChannelType = {
  Direct: 0,
  Group: 1
}
const state = store.getState()
export const userState = {
  name: state?.login?.user?.username,
  _id: state?.login?.loginInfo?.user?.id,
  avatar: state?.login?.user?.profile_picture
}
export const useStore = create(setState => ({
  state: {
    channels: {},
    messages: {},
    members: {},
    user: userState
  },
  dispatch: newState =>
    setState(oldState => ({ state: { ...oldState.state, ...newState } }))
}))
