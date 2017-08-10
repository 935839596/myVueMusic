/**
 * Created by linGo on 2017/8/7.
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAYING_STATE](state, flag){
    state.playing = flag
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYINGLIST](state, list) {
    state.playlist = list
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_INITPLAYLIST](state, flag) {
    state.initPlaylist = flag
  }
}

export  default mutations
