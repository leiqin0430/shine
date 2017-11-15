<template>
  <div style="background:#f0f2f5;">
    <div class="wscn-http404">
      <div class="pic-404" style="text-align: center;">
        <img class="pic-404__parent" :src="img404" alt="404">
        <!--<img class="pic-404__child left" :src="img404Cloud" alt="404">-->
        <!--<img class="pic-404__child mid" :src="img404Cloud" alt="404">-->
        <!--<img class="pic-404__child right" :src="img404Cloud" alt="404">-->
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">版权所有
          <!--<a class='link-type' href='https://wallstreetcn.com' target='_blank'>华尔街见闻</a>-->
        </div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a href="/grid" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
  import img404 from '@/assets/404_images/404.png'
  import img404Cloud from '@/assets/404_images/404_cloud.png'

  export default {
    data () {
      return {
        img404,
        img404Cloud
      }
    },
    computed: {
      message () {
        return '特朗普说这个页面你不能进......'
      }
    }
  }
</script>
