import * as url from "url";

export default{
  name:'ApplyStyle',
  data(){
    return {
      fonts:[
        'cairo',
        'Roboto Mono',
        'Lato',
        'Raleway',
        'cursive',
        'monospace',
        'sans-serif',
        'system-ui',
      ],
      colors:[
        '#3786fba1',
        '#0cc85794',
        '#fca1198f',
        '#e01e1ea3',
        '#bd00ff94',
        '#222222a1',
      ],
      styles:[],
      template_style:{},
    }
  },
  computed:{
  },
  async mounted() {
    let com = this;
      if(this.getTemplateInfo && this.getTemplateInfo.style != null){
        let id = document.URL.split('id=')[document.URL.split('id').length - 1]
        await this.$axios.get('templates/style/'+id).then((e)=>{
           com.styles = e.data.style
           com.template_style = e.data.layout
        })

         // for loop and get styles per each section
         for(let key in Object.values(this.styles)){
           let sec_style = this.styles[key];
           let sec_html = $('.style-data > div').eq(key);
           this.detectStyle(sec_style,sec_html)
           this.clickForInput(sec_html)
         }
      }
  },
  methods:{
    applyStyle(query,section_index,find,section_item,input_number,type,css_property,ele_type,attribute_info = null){



      // search for this section in style
      var value = (event.target.value == undefined ? event.target.getAttribute('value'):event.target.value);
      if(value > 100 && event.target.getAttribute('reset_val') == '%'){
        value = 100;
      }else if(value < 0 && event.target.getAttribute('reset_val') == '%'){
        value = 0;
      }


      /*var check_exist_section = this.styles.findIndex((e)=>{
        return e['title']['id'] == section_item['id'];
      });*/
      var check_exist_section = section_index;
      if(ele_type === 'template'){
         this.template_style[type] = value
         setTimeout(()=>{
           $('.page').css(css_property, css_property === 'background-image' ? `url(${value})` :  (isNaN(value) ? value:value+'px'))
         })
        return false;
      }else if(check_exist_section >= 0){
        // if section exist check if this for section
        if(ele_type == 'section') {
          this.styles[check_exist_section][ele_type == 'section' ? 'id' : 'properties'][type] = value
        }if(ele_type == 'header') {
          if(!(this.styles[check_exist_section].hasOwnProperty('header'))){
            this.styles[check_exist_section]['header'] = {}
          }
          this.styles[check_exist_section]['header'][type] = value
        }else if(ele_type == 'attribute'){
          // this style for attribute
          // so check if attribute exist or not
          if(this.styles[check_exist_section].hasOwnProperty('properties')) {
            var check_exist_attribute = this.styles[check_exist_section]['properties'].findIndex((e) => {
              return e['id'] == (attribute_info != null ? attribute_info['id'] : null);
            });

            // check if attribute exist
            if(check_exist_attribute >= 0){
              this.styles[check_exist_section]['properties'][check_exist_attribute][type] = value
            }else{
              // not exist
              var obj = {id:attribute_info['id']};
              obj[type] = value;
              this.styles[check_exist_section]['properties'].push(obj)
            }
          }else{

            var obj = {id:attribute_info['id']};
            obj[type] = value;
            this.styles[check_exist_section]['properties'] = [];
            this.styles[check_exist_section]['properties'][0] = obj
          }
        }else if(ele_type == 'icons'){
          // this style for icons
          if(this.styles[check_exist_section].hasOwnProperty('icons')) {
            this.styles[check_exist_section]['icons'][type] = value
          }else{
            this.styles[check_exist_section]['icons'] = {}
            this.styles[check_exist_section]['icons']['id'] = this.styles[check_exist_section]['id'];
            this.styles[check_exist_section]['icons'][type] = value
          }
        }else{
          // this style for general
          if(this.styles[check_exist_section].hasOwnProperty('general')) {
            this.styles[check_exist_section]['general'][type] = value
          }else{
            this.styles[check_exist_section]['general'] = {}
            this.styles[check_exist_section]['general']['id'] = this.styles[check_exist_section]['id'];
            this.styles[check_exist_section]['general'][type] = value

          }
        }
      }else{
        //  create new section
        var obj = {title:{id:section_item['id']}}
        if(ele_type == 'section'){
          obj['title'][type] = value
        }else if(ele_type == 'attribute'){
          obj['properties'] = []
          obj['properties'][0] = {id:attribute_info['id']}
        }else if(ele_type == 'icons'){
          // icons
          obj['icons'] = []
          obj['icons'][0] = {id:section_item['id']}
        }else{
          // general
          obj['general'] = []
          obj['general'][0] = {id:section_item['id']}
        }
        obj['properties'][0][type] =  value
        this.styles.push(obj)
      }
      if(value !== 'auto') {

        if (input_number == -1) {
          $(query).eq(section_index).find(find).css(css_property, value + (event.target.hasAttribute('reset_val') ? event.target.getAttribute('reset_val') : ''))
        } else {
          $(query).eq(section_index).find(find).eq(input_number).css(css_property, value + (event.target.hasAttribute('reset_val') ? event.target.getAttribute('reset_val') : ''))
        }
      }
      this.make_pages(this.get_template_style())
    },

    detectStyle(sec_style,sec_html){
      for(let key_item of Object.keys(sec_style)){

        if(key_item === 'general' || sec_style['properties'].find((ob) => {return ob.hasOwnProperty('width')})) {
          for (let property_width of sec_style['properties']) {

            if (property_width.hasOwnProperty('width')) {

              sec_html.find('div[name="width"]').find('input[item_id="' + property_width['id'] + '"]').val(property_width['width']);
            }
          }
        }
          for (let property of Object.keys(sec_style[key_item])) {

            if (isNaN(property)) {

              let item = sec_html.find('>div.' + key_item).find('div[name="'+property +'"]')

              if(item.length > 0){
                this.applyStyleLayout(property,item,sec_style,key_item)
              }

            } else {
              // properties

              let property_id = sec_style[key_item][property]['id'];
              let item = sec_html.find('>div.' + key_item).find('.properties').find('div[property_id="'+property_id+'"]').find('.style-attribute')
              //console.log(sec_style , property , item)
              if(Object.keys(sec_style[key_item][property]).length > 1){
                for(let pro_key in sec_style[key_item][property]){

                  var input_attr = item.find('div[name="'+pro_key+'"]');
                  if(input_attr.length > 0){
                    this.applyStyleLayout(pro_key,input_attr,sec_style,key_item , true , sec_style[key_item][property][pro_key])
                  }
                }
              }
            }
          }
      }

    },

    clickForInput(sec_html){
      setTimeout(()=>{
        for(let item of sec_html.find('input[type="radio"].checked,select')){
          item.click()
        }
        for(let num_input of sec_html.find('input[type="number"],select,input[type="radio"].checked')){
          if(num_input.value !== ''){
            num_input.dispatchEvent(new Event("change"));
          }
        }

      },)
    },

    applyStyleLayout(property,item,sec_style,key_item , is_property = false , property_attr_val = false){
      let property_val = sec_style[key_item][property];
      if(is_property == true){
        property_val = property_attr_val
        //console.log(property);
      }
      if(property.indexOf('font') >= 0){
        let select = (property_val.indexOf('px') >= 0) ? item.find('select[select_name="font-size"]') : item.find('select[select_name="font-family"]');
        select.val(property_val)
      }else if(property.indexOf('color') >= 0){
        //item.find('input,select').attr('value', sec_style[key_item][property])
        // Add an event listener to handle changes
        var input = item.find('input').eq(0)

        input[0].checked = true;
        input[0].value = property_val;
        input[0].classList.add('checked')
        input[0].style.backgroundColor = property_val;
        // value sec_style[key_item][property] maybe column or any thing so its radio in this case
      }else if(isNaN(property_val)){
        for(let radio_input of item.find('input')){
          if(radio_input.value === property_val){
            radio_input.checked = true;
            radio_input.classList.add('checked')
            break;
          }
        }
      }else{
        item.find('input,select').attr('value', property_val)
      }
    }
  }
}


