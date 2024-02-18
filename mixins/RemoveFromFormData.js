export default {
  name:'RemoveFromFormData',
  methods:{
    removeEntryFromFormData(formData, keyToRemove) {
      const entries = Array.from(formData.entries());

      // Filter out the entry with the specified key
      const filteredEntries = entries.filter(([key]) => key !== keyToRemove);

      // Create a new FormData object with the filtered entries
      const newFormData = new FormData();

      filteredEntries.forEach(([key, value]) => {
        newFormData.append(key, value);
      });

      return newFormData;
    }
  }
}
