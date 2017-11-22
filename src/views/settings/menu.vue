<template>
  <section>
    <div class="grid-header">
      <div class="col">名称</div>
      <div class="col">链接</div>
      <div class="col">排序</div>
      <div class="col">可见</div>
      <div class="col">操作</div>
    </div>
    <el-tree :data="data"
             :props="defaultProps"
             class="menu-tree"
             node-key="id"
             default-expand-all
             @node-click="handleNodeClick"
             :expand-on-click-node="false"
             :render-content="renderContent">
    </el-tree>
    <!--新增/修改菜单Dialog-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-input v-model="form.parentLabel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.label" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
        <el-input v-model="form.url" auto-complete="off"></el-input>
      </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <span :class="'fa fa-'+form.icon"></span>
          <span>{{form.icon}}</span>
          <el-button @click="innerIconVisible = true">选择</el-button>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number v-model="form.order" controls-position="right" :min="1" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="可见" :label-width="formLabelWidth">
          <el-radio-group v-model="form.visible">
            <el-radio :label="'1'">显示</el-radio>
            <el-radio :label="'0'">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <!--选择图标Dialog-->
      <el-dialog
        width="40%"
        title="选择图标"
        :visible.sync="innerIconVisible"
        append-to-body>
        <icons></icons>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerIconVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerIconVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import icons from '../../components/icons.vue'
  export default {
    data () {
      return {
        data: [{
          id: '1',
          label: '一级 1',
          url: '',
          order: 1,
          visible: '1',
          children: [{
            id: '4',
            label: '二级 1-1',
            url: '',
            order: 1,
            visible: '1',
            children: [{
              id: '9',
              label: '三级 1-1-1',
              url: '/sys/user/info',
              order: 1,
              visible: '1',
              children: []
            }]
          }]
        }, {
          id: '2',
          label: '一级 2',
          url: '',
          order: 2,
          visible: '0',
          children: [{
            id: '5',
            label: '二级 2-1',
            url: '/sys/user/info',
            order: 1,
            visible: '0',
            children: []
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogFormVisible: false,
        innerIconVisible: false,
        dialogTitle: '',
        form: {
          parentId: '',
          parentLabel: '',
          id: null,
          label: '',
          url: '',
          icon: 'camera-retro',
          order: -1,
          visible: '',
          remark: ''
        },
        formLabelWidth: '100px'
      }
    },
    components: { icons },
    methods: {
      handleNodeClick () {
        console.log('handleNodeClick')
      },
      renderContent (h, { node, data, store }) {
        let me = this
        let str = 'menuColCls' + node.level
        let clsObj = {}
        clsObj[str] = true

        return h('span', {'class': {menuRowCls: true}}, [
          h('span', {'class': clsObj}, node.label),
          h('span', {'class': clsObj}, data.url),
          h('span', {'class': clsObj, style: {textAlign: 'center'}}, data.order),
          h('span', {'class': clsObj, style: {textAlign: 'center'}}, data.visible === '1' ? '显示' : '隐藏'),
          h('span', {'class': {operateCls: true}}, [
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  console.log('data', data)
                  console.log('node', node)
                  console.log('store', store)
                  me.dialogFormVisible = true
                  me.dialogTitle = '修改菜单'
                  me.form.parentLabel = node.parent.data.label
                  me.form.parentId = node.parent.data.id
                  me.form.id = data.id
                  me.form.label = data.label
                  me.form.url = data.url
                  me.form.order = data.order
                  me.form.visible = data.visible
                  me.form.remark = data.remark
                  event.stopPropagation()
                }
              }}, '修改'),
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  store.remove(data)
                  event.stopPropagation()
                }
              }}, '删除'),
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
//                  store.append({id: id++, label: 'new', children: []}, data)
                  me.dialogFormVisible = true
                  me.dialogTitle = '新增菜单'
                  me.form.parentLabel = data.label
                  me.form.parentId = data.id
                  me.form.id = null
                  me.form.label = ''
                  me.form.url = ''
                  me.form.order = 1
                  me.form.visible = '1'
                  me.form.remark = ''
                  event.stopPropagation()
                }
              }}, '添加下级菜单')
          ])
        ])
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/_variable";
  .grid-header {
    flex: 1;
    display: flex;
    align-items: center;
    color: #878d99;
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-top: 1px solid $border-color;
    border-right: 1px solid $border-color;
    .col {
      width: calc((100% - 25px - 180px) / 4);
      border-left: 1px solid $border-color;
    }
    .col:first-of-type {
      width: calc(((100% - 25px - 180px) / 4) + 24px)
    }
    .col:last-of-type {
      width: 180px
    }
  }
  .menu-tree {
    border: 1px solid $border-color;
    border-bottom: none;
  }
  .menu-tree .el-tree-node__content {
    border-bottom: 1px solid $border-color;
    height: 30px;
  }
  .menuRowCls {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .menuColCls1 {
    border-right: 1px solid $border-color;
    height: 30px;
    line-height: 30px;
    width: calc((100% - 180px) / 4);
  }
  .menuColCls2 {
    border-right: 1px solid $border-color;
    height: 30px;
    line-height: 30px;
    width: calc((100% + 18px - 180px) / 4);
  }
  .menuRowCls .menuColCls2:first-of-type {
    width: calc(((100% + 18px - 180px) / 4) - 18px);
  }
  .menuColCls3 {
    border-right: 1px solid $border-color;
    height: 30px;
    line-height: 30px;
    width: calc((100% + 2 * 18px - 180px) / 4);
  }
  .menuRowCls .menuColCls3:first-of-type {
    width: calc(((100% + 2 * 18px - 180px) / 4) - 2 * 18px);
  }
  .operateCls {
    width: 180px;
    text-align: center;
  }
</style>
