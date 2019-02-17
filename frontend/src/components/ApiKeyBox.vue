<template>
  <div class='key-box'>
    <p>Your API key:</p>
    <input class='input' type='text'
    readonly
    @focus="selectAll"
    :value="apiKey"
    id='apiKeyInput'
    ref="input"
    />
    <p>
      Press CTRL/CMD+c to copy
    </p>
  </div>
</template>

<script>
export default {
  name: 'ApiKeyBox',
  props: ['apiKey'],
  methods: {
    selectAll() {
      this.$refs.input.setSelectionRange(
        0,
        this.$refs.input.value.length
      );
    }
  }
}
</script>

<style scoped>
.key-box {
  padding: 20px;
  background: #ccc;
  margin: 10px;
  color: black;
  width: 80%;
  border-radius: 10px;
}

.input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
