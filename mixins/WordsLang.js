export default {
  name:'WordsLang',
  async fetch() {
    const lang = 'en';
    const words = require(`~/lang/${lang}/words`).default;
    this.$store.commit('words_data_lang/InitializeData',words)


  },

}
