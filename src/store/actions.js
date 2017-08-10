/**
 * Created by linGo on 2017/8/8.
 */
import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  // console.log(list)
  commit(types.SET_PLAYINGLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_INITPLAYLIST, true)
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYINGLIST, playlist)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const insertSong = function ({commit, state}, song)
{
  let playlist = state.playlist.slice()
  let currentIndex = state.currentIndex

  //记录当前歌曲
  let currentSong = playlist[currentIndex]
  //查找当前列表中是否含有需要插入的歌曲
  let fpIndex = findIndex(playlist, song)
  //因为是插入歌曲，所以加1
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  //如果已经包含了要插入的歌曲
  if (fpIndex > -1) {
    //如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      //在后面
      playlist.splice(fpIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYINGLIST,playlist)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_INITPLAYLIST, true)
}
