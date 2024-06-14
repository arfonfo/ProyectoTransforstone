<template>
  <svg :class="customClasses" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.99 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: {
    customClasses: {
      type: String,
      default: 'h-6 w-6'
    }
  }
}
</script>
