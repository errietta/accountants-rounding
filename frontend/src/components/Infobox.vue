<template>
  <div class='info'>
    <h1 :class="{
      'info__header': true,
      'info__header--error': type === 'error'
    }">{{title}}</h1>
    <p class='info__text'>
      {{ body }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Infobox',
  props: ['title', 'body', 'type']
}
</script>

<style scoped>
  .info {
    background-color: #bcbcbc;
    margin: 10px;
    width: calc(80% + 36px);
    border-radius: 10px 10px 0 0;
  }

  .info__text {
    padding: 5px 0;
    margin: 5px;
  }

  .info__header {
    font-size: 120%;
    margin: 0;
    padding: 5px 10px 5px;
    background-color: #3E85C1;
    border-radius: 10px 10px 0 0;
    color: white;
  }

  .info__header--error {
    background-color: red;
  }
</style>
