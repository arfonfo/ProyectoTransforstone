<template>
  <router-link
    :to="`/${path.toLowerCase()}`"
    class="relative flex flex-row sm:items-center sm:justify-center items-start justify-center bg-stoneBackground-4 font-bold text-secondary rounded-lg border-secondary hover:ring-2 hover:ring-secondary hover:ring-offset-2 w-full sm:h-96 h-24 text-center text-lg sm:text-2xl group"
  >
    <div
      class="absolute top-0 left-0 w-full h-1/2 rounded-t-lg bg-stoneBackground-1 shadow-sm"
      :style="{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <div class="w-full h-full bg-transparent blur-effect"></div>
    </div>
    <div
      class="relative sm:w-32 sm:h-32 w-80 h-16 sm:top-0 top-4 rounded-full bg-stoneBackground-4 border border-stoneBackground-1 shadow-sm flex items-center justify-center"
    >
      <div
        class="mt-0 sm:mt-60 sm:ml-0 flex flex-row justify-center gap-4 items-center text-stoneBackground-3"
      >
        <FontAwesomeIcon
          :icon="icon"
          class="sm:absolute sm:w-16 sm:h-16 w-9 h-9 text-stoneBackground-3 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 group-hover:scale-125 group-hover:text-stoneBackgroundContrast-3 transition-transform duration-300 ease-in-out"
        />
        {{ name }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    icon: {
      type: Array,
      default: null
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.blur-effect {
  backdrop-filter: blur(1px);
}

.blur-div:hover .blur-effect {
  backdrop-filter: none;
}
</style>
