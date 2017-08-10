/**
 * Created by linGo on 2017/8/8.
 */
import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}){
  // console.log(list)
  commit(types.SET_PLAYINGLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = function({commit, state}, song){
  let playlist = state.playlist.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)

  if(currentIndex > pIndex || currentIndex === playlist.length){
    currentIndex --
  }

  commit(types.SET_PLAYINGLIST, playlist)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if(!playlist.length){
    commit(types.SET_PLAYING_STATE, false)
  }else{
    commit(types.SET_PLAYING_STATE, true)
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
