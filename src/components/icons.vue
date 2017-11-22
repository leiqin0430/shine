<template>
  <div class="icons">
    <h2 class="page-header"> Web 应用的图标</h2>
    <el-row :gutter="10" class="icon-row">
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
    </el-row>
    <el-row :gutter="10" class="icon-row">
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
      <el-col :span="6"><span class="icon-item"><span class="fa fa-camera-retro"></span> fa-camera-retro</span></el-col>
    </el-row>
    <h2 class="page-header">文本编辑器图标</h2>
    <h2 class="page-header">指示方向的图标</h2>
    <h2 class="page-header">视频播放器图标</h2>
    <h2 class="page-header">SNS图标</h2>
    <h2 class="page-header">医疗图标</h2>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .icons {
    .page-header {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .icon-row {
      margin-bottom: 5px;
      .icon-item {
        display: block;
        cursor: pointer;
        &:hover {
          background-color: #efefef;
          & span:first-child {
            font-size: 16px;
          }
        }
      }
    }

  }
</style>
