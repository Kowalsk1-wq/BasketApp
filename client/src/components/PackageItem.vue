<template>
  <q-card class="my-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="ongPic">
        </q-avatar>
        <span>{{ ongName }}</span>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ name }}</q-item-label>
        <q-item-label caption>
          {{ description }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section>
        <p v-for="i in items" :key="i">{{ i }}</p>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'PackageItem',
  props: {
    name: {
      type: String
    },
    description: {
      type: String
    },
    items: {
      type: String
    },
    ongName: {
      type: String
    },
    ongPic: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>