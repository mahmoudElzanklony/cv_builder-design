import {h} from "vue";
import $ from "jquery";

export default {
  name:'DynamicPagesCv',
  data(){
    return {
      page_height:1040 ,//940,
      currentHeight:0,
      cv_pages:[],
      pages_elements:1,
    }
  },
  methods:{
    detectPages(section_contents,com , test = false){
      for(let section of section_contents){
        let section_height = $(section).outerHeight()
        if(test == true){
          com.cv_pages = []
        }
        let last_page = com.cv_pages[com.cv_pages.length-1];

        if(last_page && last_page.hasOwnProperty('content')){
          if(com.max_height_per_page - last_page['height'] >= section_height){
            last_page['content'].push($section[0].outerHTML)
            last_page['sections'].push($section.index())
          }else{
            var new_page = {
              height:$(section).outerHeight(),
              content:[$(section)[0].outerHTML],
              sections:[$(section).index()],
            }
            com.cv_pages.push(new_page)
          }
        }else{
          var new_page = {
            height:$(section).outerHeight(),
            content:[$(section)[0].outerHTML],
            sections:[$(section).index()],
          }
          com.cv_pages.push(new_page)
        }
      }

    },
    cloneElement(element,sec_name){
      let el = document.createElement(element.tagName.toLocaleLowerCase());
      el.className = element.className;
      el.setAttribute('sec_id',sec_name != undefined ? sec_name:'')
      el.style = element.style.cssText
      el.innerHTML = element.innerHTML
      return el;
    },
    getHeightOfChildren(el){
      let height = 0;
      for(let child of el.children){
        height += Number(child.clientHeight)
      }
      return height;
    },
    make_pages(page_style){
      let cv_layout = $('.dynamic-content');
      let section_contents = cv_layout.find('>div');
      let page = document.createElement('div');
      let page_height = 0;
      let final_lock = document.querySelector('.simulation');
      final_lock.innerHTML = '';
      page.className = 'page';


      page.style = page_style
      page.innerHTML = '<div class="body"></div>';
      for(let sec of section_contents){
        for(let header_body of sec.children){
          for(let inside_head_body of header_body.children){
            let num = inside_head_body.getAttribute('number')
            if(num == null){
              num = header_body.getAttribute('number')
            }
            if(this.page_height - page_height >= Number(inside_head_body.clientHeight)){
              let el = this.cloneElement(inside_head_body,sec.className.replace('sec_id_',''));
              el.setAttribute('number',num ?? null);
              page.firstChild.append(el)
            }else{
              // make new page
              page = document.createElement('div')
              page.className = 'page';
              page.style = page_style
              page.innerHTML = '<div class="body"></div>';
              page_height = 0
              let el = this.cloneElement(inside_head_body,sec.className.replace('sec_id_',''));
              el.setAttribute('number',num ?? null);
              page.firstChild.append(el);

            }
            final_lock.append(page)
            page_height = this.getHeightOfChildren(page);

          }

        }
      }
    },
    get_template_style(){
      let page_style = '';
      for(let key of Object.keys(this.template_style)){
        page_style += (key+':'+(key === 'background-image' ? 'url("'+this.template_style[key]+'");':(isNaN(this.template_style[key])?this.template_style[key]:this.template_style[key]+'px')+';'))
      }
      return page_style;
    },
    // control page active
    getPages(){
      // get pages
      let com = this;
      const observer = new MutationObserver(mutationsList => {
        for(const mutation of mutationsList) {
          let pages = document.querySelectorAll('.simulation > div').length;
          if(pages !== com.pages_elements){
            com.pages_elements = pages;
          }
          $('.simulation .page').hide();
          $('.simulation .page').eq($('.pages.controls > span.active').index()).show()
        }
      });
      observer.observe(document.querySelector('.simulation'),{childList:true});


    }
  },
  mounted(){

    setTimeout(()=>{
      this.getPages();
      this.make_pages(this.get_template_style())
    },1000)
    this.currentHeight = this.$refs.dynamicContentWatch.clientHeight;
    let com = this;
    this.detectPages($('.dynamic-content').find('>div'),com)

    window.addEventListener('keyup', function (){
      com.make_pages(com.get_template_style())
    });
    $('#__nuxt').on('change', 'input[type="file"],input[type="date"]', function(event) {
      com.make_pages(com.get_template_style())
    })


  }
}
