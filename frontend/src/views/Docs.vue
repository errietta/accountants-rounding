<template>
  <div class="docs">
    <h1>Documentation</h1>

    <ul>
      <li>
        URL: https://api.accountants-rounding.com/api/round
      </li>
      <li>
        numbers: array of numbers to round
      </li>
      <li>
        decimals: number of decimal places to round to, defaults to 2
      </li>
      <li>
        apiKey: your api key - <a href='/get-key'>get an api key</a>.
      </li>
    </ul>

    <p>Response: array of rounded numbers, rounded up, then down, then up...</p>

    Request:
    <pre>
      POST https://api.accountants-rounding.com/api/round
      Content-Type: application/json

      {
        "numbers": ["1.0232","1.2","1.2222"],
        "decimals": "3",
        "apiKey": "{{apiKey}}"
      }

    </pre>

    CURL:
    <pre>
      curl --request POST \
      --url https://api.accountants-rounding.com/api/round \
      --header 'content-type: application/json' \
      --data '
      {
        "numbers": ["1.0232","1.2","1.2222"],
        "decimals": "3",
        "apiKey": "{{apiKey}}"
      }'
    </pre>

    Response:
    <pre>
      {
        "result": [1.023, 1.2, 1.22]
      }
    </pre>
  </div>
</template>


<script>
export default {
  name: 'docs',
  data() {
    return {
      apiKey: window.sessionStorage.getItem('api-key') || 'YOUR_API_KEY',
    }
  }
}
</script>
