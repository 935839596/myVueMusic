<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent = 'progressTouchStart'
            @touchmove.prevent = 'progressTouchMove'
            @touchend.prevent = 'progressTouchEnd'
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  const progressBtnWidth = 16
  export default {
    props:{
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods:{
      progressTouchStart(e){
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth =Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0,this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd(e){
        this.touch.initiated = false
        this._triggerPercent();
      },
      progressClick(e){
        this._offset(e.offsetX)
        this._triggerPercent()
      },
      _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange',percent)
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width = offsetWidth + 'px'
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent(newPercent){
        if(newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .progress-bar{
    height: 2rem;
    .bar-inner{
      height: .25rem;
      background-color: rgba(0,0,0,.3);
      position: relative;
      top: .9rem;
      .progress{
        position: absolute;
        height: 100%;
        background: yellow;
      }
      .progress-btn-wrapper{
        position: absolute;
        left: -.5rem;
        top: -.9rem;
        width: 2rem;
        height: 2rem;
        .progress-btn{
          position: relative;
          top: .45rem;
          left: .45rem;
          box-sizing: border-box;
          width: 1rem;
          height: 1rem;
          border: .2rem solid #fff;
          border-radius: 50%;
          background: #ffcd32;
        }
      }
    }
  }
</style>
