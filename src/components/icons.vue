<template>
  <div class="icons">
    <template v-for="icon in icons">
      <h2 class="page-header">{{icon.type}}</h2>
      <el-row :gutter="10" class="icon-row" v-for="count in (Math.floor(icon.items.length / countInRow))" :key="icon.type+count">
        <el-col :span="6" v-for="item in icon.items.slice((count-1)*countInRow,count*countInRow)" :key="item">
          <span class="icon-item" :class="{selected: hasSelected===item}" @click="selectIcon(item)"><span :class="'fa fa-'+item"></span>{{item}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="icon-row" v-if="(icon.items.length % countInRow) !== 0">
        <el-col :span="6" v-for="item in icon.items.slice(icon.items.length - (icon.items.length % countInRow),icon.items.length)" :key="item">
          <span class="icon-item" :class="{selected: hasSelected===item}" @click="selectIcon(item)"><span :class="'fa fa-'+item"></span>{{item}}</span>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
  export default {
    props: {hasSelected: String},
    data () {
      return {
        countInRow: 4,
        icons: [
          { type: '网页应用图标',
            items: [
              'address-book', 'address-book-o', 'address-card', 'address-card-o',
              'adjust', 'anchor', 'archive', 'area-chart', 'arrows', 'arrows-h', 'arrows-v',
              'asterisk', 'at', 'balance-scale', 'ban', 'bar-chart', 'bars', 'bath', 'battery', 'battery-0',
              'bed', 'beer', 'bell', 'bell-o', 'bell-slash', 'bell-slash-o'
            ]
          },
          { type: '可访问性图标',
            items: [
              'assistive-listening-systems', 'audio-description', 'blind', 'braille', 'cc', 'deaf'
            ]
          },
          { type: '手势动作图标',
            items: [
              'hand-grab-o', 'hand-lizard-o', 'hand-o-down', 'hand-o-left', 'hand-o-right', 'hand-o-up',
              'hand-paper-o', 'hand-peace-o', 'hand-pointer-o'
            ]
          },
          { type: '交通运输图标',
            items: [
              'ambulance', 'automobile', 'bicycle', 'bus', 'cab', 'car', 'fighter-jet', 'motorcycle',
              'plane', 'rocket', 'ship', 'space-shuttle', 'subway', 'taxi', 'train', 'truck', 'wheelchair', 'wheelchair-alt'
            ]
          },
          { type: '性别类图标',
            items: [
              'genderless', 'intersex', 'mars', 'mars-double'
            ]
          },
          { type: '文件类型图标',
            items: [
              'file', 'file-archive-o', 'file-audio-o', 'file-code-o', 'file-excel-o', 'file-image-o', 'file-movie-o'
            ]
          },
          { type: '旋转类图标',
            items: [
              'circle-o-notch', 'cog', 'gear', 'refresh', 'spinner'
            ]
          }
        ]
      }
    },
    methods: {
      selectIcon (item) {
        this.$emit('watchIconsDialog', item)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .icons {
    .page-header {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
    .icon-row {
      margin-bottom: 5px;
      .icon-item {
        display: block;
        cursor: pointer;
        & span:first-child {
          margin-right: 5px;
        }
        &:hover:not(.selected) {
          background-color: #efefef;
          & span:first-child {
            font-size: 18px;
          }
        }
      }
      .selected {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
