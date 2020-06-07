<template>
  <q-item clickable tag="a" :href="link" :class="id">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <small>{{ caption }}</small>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
