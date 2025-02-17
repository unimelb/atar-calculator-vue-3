<template>
  <div
    ref="wrap"
    :id="id"
    class="vue-slide-bar-component vue-slide-bar-horizontal"
    :style="calculateHeight"
    @click="wrapClick"
  >
    <div
      ref="elem"
      class="vue-slide-bar"
      :style="{ height: `${lineHeight}px` }"
    >
      <template>
        <div
          ref="tooltip"
          class="vue-slide-bar-always vue-slide-bar-tooltip-container"
          :style="{'width': `${iconWidth}px`}"
          @mousedown="moveStart"
          @touchstart="moveStart"
        >
          <span
            v-if="showTooltip"
            class="vue-slide-bar-tooltip-top vue-slide-bar-tooltip-wrap"
          >
            <slot name="tooltip">
              <span :style="tooltipStyles" class="vue-slide-bar-tooltip">
                {{ val }}
              </span>
            </slot>
          </span>
        </div>
      </template>
      <div
        ref="process"
        :style="processStyle"
        class="vue-slide-bar-process"
      />
    </div>
    <div v-if="range" class="vue-slide-bar-range">
      <div
        v-for="(r, index) in range"
        :key="index"
        class="vue-slide-bar-separate"
        :style="dataLabelStyles"
      >
        <span v-if="!r.isHide" class="vue-slide-bar-separate-text">
          {{ r.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

export default {
  name: 'vue-slide-bar',
  props: {
    data: { type: Array, default: null },
    id: { type: String, default: 'wrap' },
    range: { type: Array, default: null },
    speed: { type: Number, default: 0.5 },
    lineHeight: { type: Number, default: 5 },
    iconWidth: { type: Number, default: 20 },
    value: { type: [String, Number], default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    showTooltip: { type: Boolean, default: true },
    isDisabled: { type: Boolean, default: false },
    draggable: { type: Boolean, default: true },
    paddingless: { type: Boolean, default: false },
    tooltipStyles: Object,
    labelStyles: Object,
    processStyle: Object,
  },
  setup(props, { emit }) {
    const wrap = ref(null);
    const elem = ref(null);
    const tooltip = ref(null);
    const process = ref(null);
    const flag = ref(false);
    const size = ref(0);
    const currentValue = ref(0);
    const currentSlider = ref(0);
    const isComponentExists = ref(true);
    const dataLabelStyles = computed(() => ({
      color: '#4a4a4a',
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      ...props.labelStyles,
    }));
    const spacing = computed(() => (props.data ? 1 : props.interval));

    const val = computed({
      get: () => (props.data ? props.data[currentValue.value] : currentValue.value),
      set: (newValue) => {
        if (props.data) {
          const index = props.data.indexOf(newValue);
          if (index > -1) {
            currentValue.value = index;
          }
        } else {
          currentValue.value = newValue;
        }
      },
    });

    const minimum = computed(() => (props.data ? 0 : props.min));
    const maximum = computed(() => (props.data ? props.data.length - 1 : props.max));
    const gap = computed(() => size.value / (maximum.value - minimum.value));
    const position = computed(() => ((currentValue.value - minimum.value) / spacing.value) * gap.value);

    const calculateHeight = computed(() => {
      return props.paddingless ? {} : { paddingTop: '40px', minHeight: props.range ? '100px' : null };
    });

    const setValue = (newVal) => {
      if (newVal < minimum.value || newVal > maximum.value) return false;
      currentValue.value = newVal;
      emit('input', newVal);
    };

    const refresh = () => {
      if (elem.value) {
        size.value = elem.value.offsetWidth;
        setValue(currentValue.value);
      }
    };

    const bindEvents = () => {
      document.addEventListener('touchmove', moving, { passive: false });
      document.addEventListener('touchend', moveEnd, { passive: false });
      document.addEventListener('mousemove', moving);
      document.addEventListener('mouseup', moveEnd);
      document.addEventListener('mouseleave', moveEnd);
      window.addEventListener('resize', refresh);
    };

    const unbindEvents = () => {
      window.removeEventListener('resize', refresh);
      document.removeEventListener('touchmove', moving);
      document.removeEventListener('touchend', moveEnd);
      document.removeEventListener('mousemove', moving);
      document.removeEventListener('mouseup', moveEnd);
      document.removeEventListener('mouseleave', moveEnd);
    };

    const wrapClick = (e) => {
      if (props.isDisabled || (!props.draggable && e.target.id === props.id)) return false;
      const pos = e.clientX - elem.value.getBoundingClientRect().left;
      setValue(pos);
    };

    const moveStart = () => {
      if (!props.draggable) return false;
      flag.value = true;
      emit('dragStart');
    };

    const moving = (e) => {
      if (!flag.value || !props.draggable) return false;
      e.preventDefault();
      const pos = e.clientX - elem.value.getBoundingClientRect().left;
      setValue(pos);
    };

    const moveEnd = () => {
      if (flag.value && props.draggable) {
        emit('dragEnd');
      }
      flag.value = false;
    };

    onMounted(() => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.error('[VueSlideBar error]: window or document is undefined, cannot initialize.');
        return;
      }
      nextTick(() => {
        if (isComponentExists.value) {
          refresh();
          bindEvents();
        }
      });
    });

    onBeforeUnmount(() => {
      isComponentExists.value = false;
      unbindEvents();
    });

    return {
      wrap,
      elem,
      tooltip,
      process,
      dataLabelStyles,
      val,
      calculateHeight,
      wrapClick,
      moveStart,
      moving,
      moveEnd,
      refresh,
      setValue,
    };
  },
};
</script>

<style scoped>
.vue-slide-bar-component {
  position: relative;
  box-sizing: border-box;
  user-select: none;
}
.vue-slide-bar {
  position: relative;
  display: block;
  border-radius: 15px;
  background-color: #d8d8d8;
  cursor: pointer;
}
.vue-slide-bar::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.vue-slide-bar-process {
  position: absolute;
  border-radius: 15px;
  background-color: #1066FD;
  transition: all 0s;
  z-index: 1;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  will-change: width;
}
.vue-slide-bar-tooltip-container {
  position: absolute;
  transition: all 0s;
  will-change: transform;
  cursor: pointer;
  z-index: 3;
  left: 0;
  top: -16px;
}
.vue-slide-bar-tooltip-wrap {
  /* display: none; */
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 100%;
  display: block !important;
}
.vue-slide-bar-tooltip-top {
  top: -12px;
  left: 40%;
  transform: translate(-50%, -100%);
}
.vue-slide-bar-tooltip {
  position: relative;
  font-size: 14px;
  white-space: nowrap;
  padding: 2px 5px;
  min-width: 20px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #1066FD;
  background-color: #1066FD;
}
.vue-slide-bar-tooltip::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-top-color: inherit;
  transform: translate(-50%, 0);
}
.vue-slide-bar-range {
  display: flex;
  padding: 5px 0;
  justify-content: space-between;
}
.vue-slide-bar-separate {
  position: relative;
  width: 2px;
  background-color: #9e9e9e;
  height: 5px;
  cursor: pointer;
}
.vue-slide-bar-separate-text {
  text-align: center;
  position: absolute;
  white-space: nowrap;
  transform: translate(-50%, 0);
  top: 6px;
}
</style>
