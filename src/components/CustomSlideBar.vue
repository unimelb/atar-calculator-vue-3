<template>
  <div class="slider-wrapper">
    <div class="slider-track" ref="track" @click="onTrackClick">
      <div class="slider-fill" :style="{ width: position + '%' }"></div>
      <div
        class="slider-handle"
        :style="{ left: position + '%' }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <slot name="tooltip">
          <span class="sliderCircle">
            <span></span><span></span><span></span>
          </span>
        </slot>
      </div>
    </div>
    <!-- Range Bar with Tick Marks -->
    <div class="range-bar">
      <div
        v-for="(tick, index) in tickMarks"
        :key="tick"
        class="tick"
        :style="{
          left: `${((tick - min) / (max - min)) * 100}%`,
          height: (tickMarks.indexOf(tick) % 2 === 0) ? '25px' : '10px' // Odd index = taller
        }"
      >
        <span v-if="tick % labelStep === 0" class="tick-label">
          {{ ((tick < max ? tick : max) / 100).toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number, // v-model binding
    min: { type: Number, default: 5000 },
    max: { type: Number, default: 9995 },
    step: { type: Number, default: 500 }, // Adjust step size dynamically
    labelStep: { type: Number, default: 1000 }, // Show labels every 1000 units
  },
  data() {
    return {
      dragging: false,
      position: this.calculatePosition(this.modelValue),
      value: this.min,
    };
  },
  computed: {
    tickMarks() {
      const marks = [];
      let current = this.min;
      while (current <= this.max) {
        marks.push(current);
        current += this.step;
      }
      marks.push(current);

      //   if (marks[marks.length - 1] !== this.max) {
      //     marks.push(current);
      // }
      return marks;
    },
  },
  watch: {
    modelValue(newValue) {
      this.position = this.calculatePosition(newValue);
    },
  },
  methods: {
    calculatePosition(value) {
      return ((value - this.min) / (this.max - this.min)) * 100;
    },
    startDrag(event) {
      this.dragging = true;
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("touchmove", this.onDrag);
      document.addEventListener("touchend", this.stopDrag);
    },
    onDrag(event) {
      if (!this.dragging) return;
      const track = this.$refs.track;
      const trackRect = track.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      let newPosition = ((clientX - trackRect.left) / trackRect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      this.position = newPosition;
      this.$emit("update:modelValue", this.getValueFromPosition(newPosition));
    },
    stopDrag() {
      this.dragging = false;
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("touchmove", this.onDrag);
      document.removeEventListener("touchend", this.stopDrag);
    },
    getValueFromPosition(position) {
      return Math.round((position / 100) * (this.max - this.min) + this.min);
    },
    onTrackClick(event) {
      this.onDrag(event);
    },
  },
};
</script>

<style scoped>
.slider-wrapper {
  position: relative;
  width: 60%;
  margin: auto;
  height: 40px;
  padding-top: 40px;
  min-height: 100px;

  @media (max-width: 768px) { /* Adjust for tablet and smaller screens */
    width: 80%;
  }

@media (max-width: 480px) { /* Mobile screens */
    width: 100%;
  }
}
.slider-track {
  position: relative;
  width: 100%;
  height: 8px;
  background: white;
  border: 1px solid #abbed5;
  cursor: pointer;
}
.slider-fill {
  position: absolute;
  height: 100%;
  background: #000f46;
}
.slider-handle {
  display: inline-block;
  position: absolute;
  z-index: 100;
  top: 50%;
  height: 45px;
  width: 45px;
  background: #fff;
  background-color: #fbfbfb;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  box-shadow: 0 0 12px 0 #e1e1e1;
}
.sliderCircle {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;  /* Distribute lines horizontally */
  align-items: center;
  bottom: 25px;
  width: 45px;  /* Make square by setting width and height the same */
  height: 45px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  color: #094183;
  padding: 5px 0px;
  font-size: 12px;
  gap: 5px;
  visibility: visible;
}

.sliderCircle span {
    display: block;
    width: 20px;
    height: 1px;
    background: #094183;
  }


.range-bar {
  position: relative;
  width: 100%;
  height: 0px;
  display: flex;
  align-items: center;
}

.tick {
  position: absolute;
  bottom: 0;
  height: 10px;
  width: 1px;
  transform: translateX(-50%) translateY(100%); /* Ensures ticks extend upward */
  color: rgb(9, 65, 131);
  font-family: Arial, sans-serif;
  font-size: 12px;
  background-color: rgb(171, 190, 213);
}

.tick-label {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  transform: translateX(-50%) translateY(100%);
}
</style>
