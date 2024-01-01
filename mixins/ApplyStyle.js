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
      var check_exist_section = this.styles.findIndex((e)=>{
        return e['title']['id'] == section_item['id'];
      });
      if(check_exist_section >= 0){
        // if section exist check if this for section
        if(ele_type == 'section') {
          this.styles[check_exist_section][ele_type == 'section' ? 'title' : 'properties'][type] = event.target.value;
        }else{
          // this style for attribute
          // so check if attribute exist or not
          if(this.styles[check_exist_section].hasOwnProperty('properties')) {
            var check_exist_attribute = this.styles[check_exist_section]['properties'].findIndex((e) => {
              return e['id'] == (attribute_info != null ? attribute_info['id'] : null);
            });
            console.log('check_exist_attribute ' , check_exist_attribute)
            // check if attribute exist
            if(check_exist_attribute >= 0){
              this.styles[check_exist_section]['properties'][check_exist_attribute][type] = event.target.value
            }else{
              // not exist
              var obj = {id:attribute_info['id']};
              obj[type] = event.target.value;
              this.styles[check_exist_section]['properties'].push(obj)
            }
          }else{
            var obj = {id:attribute_info['id']};
            obj[type] = event.target.value;
            this.styles[check_exist_section]['properties'] = [];
            this.styles[check_exist_section]['properties'][0] = obj
          }
        }
      }else{
        //  create new section
        var obj = {title:{id:section_item['id']}}
        if(ele_type == 'section'){
          obj['title'][type] = event.target.value
        }else{
          obj['properties'] = []
          obj['properties'][0] = {id:attribute_info['id']}
          obj['properties'][0][type] =  event.target.value
        }
        this.styles.push(obj)
      }
      console.log($(query).eq(section_index), find)
      console.log($(query).eq(section_index).find(find))
      if(input_number == -1){
        $(query).eq(section_index).find(find).css(css_property, event.target.value)
      }else {
        $(query).eq(section_index).find(find).eq(input_number).css(css_property, event.target.value)
      }
    },

  }
}


