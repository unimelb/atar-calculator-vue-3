<template>
  <a
    data-test="interest-item"
    :href="link"
    :class="classes"
    :style="thumb ? `background-image: url(${thumb});` : false"
    class="interest-item">
    <p
      v-if="!tight"
      data-test="interest-item-type"
      class="interest-item__type">
      {{ level }}
    </p>
    <span
      data-test="interest-item-name"
      class="interest-item__name">{{ formattedTitle }}</span>
    <div
      v-if="type === 'pathway' || (type === 'Promoted Interest' && !tight)"
      class="interest-item__icon">
      <svg
        focusable="false"
        role="presentation"
        class="push-icon__icon">
        <use
          :xlink:href="type === 'pathway' ? '#icon-signpost' : '#icon-check'"
          xmlns:xlink="http://www.w3.org/1999/xlink" />
      </svg>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'Interest',
    },
    link: {
      type: String,
      required: true,
      default: '#',
    },
    linktype: {
      type: Number,
      default: 1,
    },
    thumb: {
      type: String,
      default: '',
    },
    tight: {
      type: Boolean,
      default: false,
    },
    sentenceCase: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    level() {
      const title = this.title.toLowerCase();
      const type = this.type.toLowerCase();

      const isGraduateType = this.isItemIn(['doctor', 'graduate certificate', 'graduate diploma', 'master', 'juris'], type);
      const isGraduateTitle = this.isItemIn(['executive master'], title);
      const isUndergraduate = this.isItemIn(['diploma', 'bachelor'], type);

      if (isGraduateType || isGraduateTitle) {
        return 'Graduate';
      }

      if (isUndergraduate) {
        return 'Undergraduate';
      }

      return this.type;
    },
    classes() {
      const title = this.title.toLowerCase();
      const type = this.type.toLowerCase();

      const classes = {
        'interest-item--image': this.thumb,
        'interest-item--promoted': this.type === 'Promoted Interest',
        'interest-item--pathway': this.type === 'pathway',
        'interest-item--tight': this.tight,
        'interest-item--doctor': this.isItemIn(['doctor'], type),
        'interest-item--gradcert': this.isItemIn(['graduate certificate'], type),
        'interest-item--graddip': this.isItemIn(['graduate diploma'], type),
        'interest-item--master': this.isItemIn(['master'], type) || this.isItemIn(['executive master'], title),
        'interest-item--diploma': this.isItemIn(['diploma'], type),
        'interest-item--bachelor': this.isItemIn(['bachelor'], type),
      };

      return classes;
    },
    formattedTitle() {
      const { title } = this;

      if (this.sentenceCase) {
        return this.$options.filters.sentence(title);
      }

      return title;
    },
  },
  methods: {
    isItemIn(findInArray, find) {
      const foundAtPositionIndex = 0;
      const isFound = findInArray.some((findIn) => find.indexOf(findIn) === foundAtPositionIndex);

      return isFound;
    },
  },
};
</script>

<style lang="postcss">
.interest-item {
  color: rgb(var(--col-brand));
  background: white;
  border-left: 7px solid rgb(var(--col-blue-mid-2));
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
  text-decoration: none;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .25);
  transform: translateY(0);
  transition: all .3s cubic-bezier(.165, .84, .44, 1);

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, .5);
    transition: all .3s cubic-bezier(.165, .84, .44, 1);
  }

  &:visited,
  &:active {
    color: rgb(var(--col-brand));
  }

  &--image {
    color: #fff !important;
    background-size: cover;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &__name {
    font-size: 1rem;
    font-weight: var(--fw-bold);
    font-family: 'Source Sans Pro', 'Gill Sans', 'Trebuchet MS', 'Arial', sans-serif;
    margin-bottom: .5rem;
    line-height: 1.2;
  }

  &__type {
    font-size: .8rem;
    font-weight: var(--fw-regular);
    margin-bottom: 0;
  }

  &__icon &:not(".interest-item--tight") {
    position: absolute;
    right: 1rem;
    margin-top: -.5rem;

    svg {
      fill: white;
      width: 1.3rem;
      height: 1.3rem;
      background-color: rgb(255, 220, 162);
      border: 3px solid rgb(255, 220, 162);
      border-radius: 50%;
    }
  }

  &--tight {
    margin: .25rem;
    padding: .75rem 1rem;

    .interest-item__name {
      margin-bottom: 0;
    }
  }

  &--pathway {
    padding-right: 4rem;
    border-left-color: rgb(var(--col-emerald-mid-2));

    .interest-item__icon {
      position: absolute;
      right: calc(var(--vr) / 2);
      margin-top: -1rem;
      top: 50%;
      color: rgb(var(--col-emerald-mid-2));

      .push-icon__icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  &--bachelor {
    border-color: rgb(var(--col-teal-mid-1));
  }
  &--master {
    border-color: rgb(var(--col-orange-mid-1));
  }
  &--doctor {
    border-color: rgb(var(--col-orange-mid-2));
  }
  &--graddip {
    border-color: rgb(var(--col-emerald-mid-2));
  }
  &--gradcert {
    border-color: rgb(var(--col-yellow-mid-2));
  }
  &--diploma {
    border-color: rgb(var(--col-green-mid-2));
  }
  &--short {
    border-color: rgb(var(--col-pink-mid-1));
  }
}

.interest--tight {
  .interest-item {
    padding: .75rem 1rem;

    &__name {
      margin-bottom: 0;
    }
  }
}
</style>
