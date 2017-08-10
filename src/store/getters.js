/**
 * Created by linGo on 2017/8/7.
 */

export const playing = state => state.playing

export const playlist = state => state.playlist

export const currentIndex = state => state.currentIndex

export const  currentSong = state => state.playlist[state.currentIndex] || {}

export const fullScreen = state => state.fullScreen
