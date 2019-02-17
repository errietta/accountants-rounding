<template>
  <div id="app">
    <div class='login'>
      <info-box
        title="Get API key"
        body="This is used to track which way the rounding should happen"
      />

      <key-form
        v-if="!apiKey"
        @key-updated="keyUpdated"
      />

      <api-key-box v-else :apiKey="apiKey" />
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form';
import InfoBox from '@/components/Infobox';
import ApiKeyBox from '@/components/ApiKeyBox';

export default {
  name: 'get-key',
  data() {
    return {
      apiKey: window.sessionStorage.getItem('api-key') || null,
    }
  },
  methods: {
    keyUpdated(key) {
      this.apiKey = key;
      window.sessionStorage.setItem('api-key', this.apiKey);
    }
  },
  components: {
    'key-form': Form,
    'info-box': InfoBox,
    'api-key-box': ApiKeyBox,
  }
}
</script>

