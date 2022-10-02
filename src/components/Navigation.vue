<template>
  <div>Hello world component</div>



</template>



<script>
export default {

  name: "Navigation",
  methods: {
    getCountryFlagURL(locale) {
      // Map locales to country codes to use with Country Flags API
      const map = {
        en: "us",
        cs: "cz",
      };
      return `https://flagcdn.com/24x18/${map[locale]}.png`;
    },
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 60px;
}
</style>