<template>
  <div class="notifications current_page">
    <div class="container mt-4 mb-4">
      <div v-if="lang == 'en'">
        <h2 class="mb-4">About Us</h2>
        <p>
          Welcome to our platform, where creativity meets career advancement! We are dedicated to providing you with the tools and resources you need to craft professional CVs that stand out in today's competitive job market.

          At our website, we offer a user-friendly CV builder with a vast collection of templates designed to suit various industries and career levels. Whether you're a recent graduate, seasoned professional, or career changer, we have the perfect template to showcase your skills and experience.

          What sets us apart is our community-driven approach. Not only can you choose from a wide range of pre-designed templates, but you can also unleash your creativity by designing your own templates and selling them on our marketplace. This empowers individuals to express their unique style and cater to the diverse needs of job seekers worldwide.

          Our mission is to democratize the process of creating professional CVs, making it accessible to everyone. Whether you're an aspiring designer looking to showcase your talent or a job seeker in need of a standout CV, our platform has something for you.

          Join us today and take the first step towards building your professional brand!
        </p>
      </div>
      <div v-else>
        <h2 class="mb-4">من نحن</h2>
        <p>

          مرحبًا بكم في منصتنا، حيث يلتقي الإبداع مع التقدم المهني! نحن ملتزمون بتوفير الأدوات والموارد التي تحتاجونها لصياغة سير ذاتية احترافية تبرز في سوق العمل التنافسي اليوم.

          على موقعنا الإلكتروني، نقدم لكم منشئ سير ذاتية سهل الاستخدام مع مجموعة واسعة من القوالب المصممة لتناسب مختلف الصناعات ومستويات الحياة المهنية. سواء كنت خريجًا حديثًا، أو محترفًا ذو خبرة، أو شخصًا يرغب في تغيير مسار حياته المهنية، لدينا القالب المثالي لعرض مهاراتك وخبراتك.

          ما يميزنا هو نهجنا القائم على المجتمع. لا يمكنك فقط اختيار القوالب المصممة مسبقًا من مجموعة واسعة، ولكن يمكنك أيضًا إظهار إبداعك من خلال تصميم قوالبك الخاصة وبيعها في سوقنا. يتيح هذا للأفراد التعبير عن أنماطهم الفريدة وتلبية احتياجات الباحثين عن عمل في جميع أنحاء العالم.

          مهمتنا هي تحقيق عملية إنشاء السير الذاتية المهنية للجميع، مما يجعلها متاحة للجميع. سواء كنت مصممًا طموحًا تبحث عن عرض موهبتك، أو باحث عن عمل في حاجة إلى سيرة ذاتية متميزة، فإن منصتنا تقدم لكم كل ما تحتاجون إليه.

          انضموا إلينا اليوم وخطوة الأولى نحو بناء علامتكم المهنية
        </p>
      </div>

      <pre v-else></pre>
    </div>
  </div>
</template>

<script>
import WordsLang from "../mixins/WordsLang";
export default {
  name: 'about-us',
  mixins:[WordsLang],
  data(){
    return {
      lang:'ar',
    }
  },
  head() {
    return {
      title: 'من نحن | about us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'تعريف بموقع الوصف الوظيفي ومن صاحب الفكرة ومن مؤسسة ومزيد من المعلومات الاخري',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'about us , من نحن ',
        }
      ],

    }
  },

  mounted() {
    if(localStorage.hasOwnProperty('lang') && localStorage.lang == 'en'){
      this.lang = 'en';
    }
  }
}
</script>

<style lang="scss">
@import "~style/variables";

</style>
