<template>
  <footer class="p-3 mt-3" id="footer">
    <div class="container"  v-if="Object.keys($attrs).length > 0  &&  Object.keys($attrs.words).length > 0">
      <div class="row align-items-center">
        <div class="col-lg-3 col-6">
          <nuxt-link to="/" class="cursor-pointer" tag="img" src="/images/logo.png"></nuxt-link>
        </div>
        <div class="col-lg-3 col-6">
          <div class="links">
            <p>{{ $attrs.words.footer.quick_links }}</p>
            <ul>
              <li><nuxt-link to="/jobs" class="line-hover position-relative">{{ $attrs.words.footer.jobs }}</nuxt-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="links">
            <p>{{ $attrs.words.footer.resources }}</p>
            <ul>
              <li><nuxt-link to="/privacy" class="line-hover position-relative">{{ $attrs.words.footer.privacy }}</nuxt-link></li>
              <li><nuxt-link to="/terms" class="line-hover position-relative">{{ $attrs.words.footer.terms_of_service }}</nuxt-link></li>
              <li><nuxt-link to="/conditions" class="line-hover position-relative">{{ $attrs.words.footer.user_condition }}</nuxt-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="links contact">
            <p>{{ $attrs.words.footer.contact }}</p>
            <ul>
              <li>
                <nuxt-link to="#" class="position-relative">
                  <span class="mrl-1"><i class="bi bi-envelope"></i></span>
                  <span>info@skillar.com</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="#" class="position-relative">
                  <span class="mrl-1"><i class="bi bi-telephone-forward"></i></span>
                  <span>+9021312312</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="#" class="position-relative">
                  <span class="mrl-1"><i class="bi bi-phone"></i></span>
                  <span>+9021312312</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name:'Footer',
    data(){
      return {
        file_name:'footer',
      }
    },
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";
footer{
  background-color: white;
  img{
    height: 100px;
  }
  .links{
    p{
      font-weight: bold;
      margin-bottom: 15px;
    }
    ul{
      li{
        margin-bottom: 10px;
      }
    }
  }
  .links.contact{
    ul{
      li{
        span:first-of-type{
          color:$gray;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  footer{
    img{
      max-width: 100%;
      height: fit-content;
    }
  }
}
</style>
