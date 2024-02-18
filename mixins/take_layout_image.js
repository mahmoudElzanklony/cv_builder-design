
export default {
  name:'take_layout_image',
  methods:{
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    },
    async take_capture(){
      const divToCapture = document.querySelector('.page');
      let image_layout;
      // Use html2canvas to convert the div to a canvas
      await html2canvas(divToCapture,{
        allowTaint: true,
        logging: true,
        taintTest: false,
      }).then(canvas => {
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Extract the base64 string (excluding the data URL prefix)
        const base64String = dataUrl.split(',')[1];

        // Convert the base64 string to a Blob
        image_layout = this.b64toBlob(base64String, 'image/png');
      })
      console.log(new Date().toLocaleTimeString())

      return image_layout;
    }
  }
}
