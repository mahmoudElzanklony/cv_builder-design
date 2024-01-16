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
      styles:[]
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
      console.log(check_exist_section)
      if(check_exist_section >= 0){
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
        }else{
          // this style for general
          if(this.styles[check_exist_section].hasOwnProperty('general')) {
            this.styles[check_exist_section]['general'][type] = value
          }else{
            console.log('error--------')
            this.styles[check_exist_section]['general'] = {}
            this.styles[check_exist_section]['general']['id'] = this.styles[check_exist_section]['id'];
            this.styles[check_exist_section]['general'][type] = value

          }
        }
      }else{
        //  create new section
        console.log(section_item,attribute_info)
        var obj = {title:{id:section_item['id']}}
        if(ele_type == 'section'){
          obj['title'][type] = value
        }else if(ele_type == 'attribute'){
          obj['properties'] = []
          obj['properties'][0] = {id:attribute_info['id']}
          obj['properties'][0][type] =  value
        }else{
          // general
          obj['general'] = []
          obj['general'][0] = {id:section_item['id']}
          obj['general'][0][type] =  value
        }
        this.styles.push(obj)
      }


      if(input_number == -1){
        $(query).eq(section_index).find(find).css(css_property,  value+(event.target.hasAttribute('reset_val') ? event.target.getAttribute('reset_val'):''))
      }else {
        $(query).eq(section_index).find(find).eq(input_number).css(css_property, value+(event.target.hasAttribute('reset_val') ? event.target.getAttribute('reset_val'):''))
      }
    },

  }
}


