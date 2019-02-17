<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/get-key">Get Api Key</router-link> |
      <router-link to="/docs">Docs</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <footer>
      <a href='https://github.com/errietta/accountants-rounding'>Github</a> |
      Made by <a href='https://errietta.me'>errietta.me</a>
    </footer>
  </div>
</template>

<style>
#app { /**/
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

footer {
  position: absolute;
  width: 90%;
  bottom: 10px;
}
</style>
