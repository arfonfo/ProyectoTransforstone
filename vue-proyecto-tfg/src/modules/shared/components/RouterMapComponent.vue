<template>
  <nav>
    <FontAwesomeIcon
      :icon="['fas', 'home']"
      class="mr-2 text-bold text-lg text-stoneBackgroundContrast-1"
    />
    <router-link to="/" class="text-bold text-stoneBackgroundContrast-1 capitalize"
      >Inicio</router-link
    >
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <span><FontAwesomeIcon :icon="['fas', 'chevron-right']" class="mx-2 text-xs" /></span>
      <router-link
        v-if="crumb.to"
        :to="crumb.to"
        class="text-bold text-stoneBackgroundContrast-1"
        >{{ crumb.text }}</router-link
      >
      <span v-else class="text-bold text-stoneBackgroundContrast-1">{{
        crumb.text.replace(/energeticos/i, 'energéticos')
      }}</span>
    </span>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    const breadcrumbs = computed(() => {
      const pathArray = route.path.split('/')
      pathArray.shift()

      const breadcrumbs = pathArray.map((path, i) => {
        let words = path.replace(/-/g, ' ').split(' ')
        words = words.map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase())
        return {
          text: words.join(' '),
          to: i < pathArray.length - 1 ? '/' + pathArray.slice(0, i + 1).join('/') : null
        }
      })

      return breadcrumbs
    })

    return {
      breadcrumbs
    }
  }
}
</script>
