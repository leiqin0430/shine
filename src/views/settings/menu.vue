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
      <el-form :model="form" :rules="menuRules" ref="menuForm" label-width="100px">
        <el-form-item label="上级菜单">
          <el-input v-model="form.parentLabel" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="label">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <span v-if="form.icon" :class="'fa fa-'+form.icon"></span>
          <span>{{form.icon ? form.icon : '无'}}</span>
          <el-button @click="tempIcon = form.icon; innerIconVisible = true">选 择</el-button>
          <el-button type="text" v-if="form.icon" @click="form.icon = ''; tempIcon = ''">清除</el-button>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="可见">
          <el-radio-group v-model="form.visible">
            <el-radio :label="'1'">显示</el-radio>
            <el-radio :label="'2'">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <!--选择图标Dialog-->
      <el-dialog
        width="45%"
        title="选择图标"
        :visible.sync="innerIconVisible"
        :close-on-click-modal="false"
        append-to-body>
        <icons :has-selected="tempIcon" @watchIconsDialog="getSelectedIcon"></icons>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerIconVisible = false">取 消</el-button>
          <el-button type="primary" @click="form.icon = tempIcon; innerIconVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMenu()">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import icons from '../../components/icons.vue'
  import api from '../../api/settings/menu'
  export default {
    data () {
      return {
        data: [{
          id: null,
          label: '菜单树根节点',
          url: '',
          order: 1,
          visible: '1',
          icon: '',
          remark: '根节点，不能删除',
          children: []
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
          icon: '',
          order: -1,
          visible: '',
          remark: ''
        },
        menuRules: {
          label: [
            { required: true, message: '请输入菜单名称' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符' }
          ],
          remark: [
            { min: 1, max: 40, message: '长度在 1 到 40 个字符' }
          ]
        },
        tempIcon: ''
      }
    },
    components: { icons },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        let me = this
        api.getMenuList(null, function (data) {
          me.data[0].children = data.list
        })
      },
      handleNodeClick () {
//        console.log('handleNodeClick')
      },
      renderContent (h, { node, data, store }) {
        let me = this
        let str = 'menuColCls' + node.level
        let clsObj = {}
        clsObj[str] = true

        let btnArr = [
          h('el-button', {attrs: {size: 'mini', type: 'text'},
            on: {
              click: function (event) {
                me.dialogFormVisible = true
                me.dialogTitle = '修改菜单'
                me.$nextTick(function () {
                  me.$refs['menuForm'].resetFields()
                  me.form.parentLabel = node.parent.data.label
                  me.form.parentId = node.parent.data.id
                  me.form.id = data.id
                  me.form.label = data.label
                  me.form.url = data.url
                  me.form.icon = data.icon
                  me.form.order = data.order
                  me.form.visible = data.visible
                  me.form.remark = data.remark
                })
                event.stopPropagation()
              }
            }}, '修改'),
          h('el-button', {attrs: {size: 'mini', type: 'text'},
            on: {
              click: function (event) {
                let msg = (data.children.length > 0) ? '你确定要删除该菜单及其子菜单吗?' : '你确定要删除该菜单吗?'
                me.$confirm(msg, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  api.delMenu({id: data.id}, function (data) {
                    me.fetchData()
                  })
                }).catch(() => {
                  me.$message({
                    type: 'info',
                    message: '已取消删除'
                  })
                })
                event.stopPropagation()
              }
            }}, '删除'),
          h('el-button', {attrs: {size: 'mini', type: 'text'},
            on: {
              click: function (event) {
                me.dialogFormVisible = true
                me.dialogTitle = '新增菜单'
                me.$nextTick(function () {
                  me.$refs['menuForm'].resetFields()
                  me.form.parentLabel = data.label
                  me.form.parentId = data.id
                  me.form.id = null
                  me.form.label = ''
                  me.form.url = ''
                  me.form.icon = ''
                  me.form.order = 1
                  me.form.visible = '1'
                  me.form.remark = ''
                })
                event.stopPropagation()
              }
            }}, '添加下级菜单')
        ]
        if (node.level === 1) {
          btnArr = [
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  me.dialogFormVisible = true
                  me.dialogTitle = '新增菜单'
                  me.$nextTick(function () {
                    me.$refs['menuForm'].resetFields()
                    me.form.parentLabel = data.label
                    me.form.parentId = data.id
                    me.form.id = null
                    me.form.label = ''
                    me.form.url = ''
                    me.form.icon = ''
                    me.form.order = 1
                    me.form.visible = '1'
                    me.form.remark = ''
                  })
                  event.stopPropagation()
                }
              }}, '添加下级菜单')
          ]
        }
        return h('span', {'class': {menuRowCls: true}}, [
          h('span', {'class': clsObj}, node.label),
          h('span', {'class': clsObj}, data.url),
          h('span', {'class': clsObj, style: {textAlign: 'center'}}, data.order),
          h('span', {'class': clsObj, style: {textAlign: 'center'}}, data.visible === '1' ? '显示' : '隐藏'),
          h('span', {'class': {operateCls: true}}, btnArr)
        ])
      },
      saveMenu () {
        let me = this
        this.$refs['menuForm'].validate((valid) => {
          if (valid) {
            api.saveMenu(this.form, function (data) {
              me.dialogFormVisible = false
              me.fetchData()
            })
          } else {
            return false
          }
        })
      },
      getSelectedIcon (data) {
        this.tempIcon = data
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/_variable";
  $tree-row-height: 40px;
  .grid-header {
    flex: 1;
    display: flex;
    align-items: center;
    color: #878d99;
    font-size: 12px;
    font-weight: bold;
    height: $tree-row-height;
    line-height: $tree-row-height;
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
    height: $tree-row-height;
  }
  .menuRowCls {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .menuColCls1 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% - 180px) / 4);
  }
  .menuColCls2 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 18px - 180px) / 4);
  }
  .menuRowCls .menuColCls2:first-of-type {
    width: calc(((100% + 18px - 180px) / 4) - 18px);
  }
  .menuColCls3 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 2 * 18px - 180px) / 4);
  }
  .menuRowCls .menuColCls3:first-of-type {
    width: calc(((100% + 2 * 18px - 180px) / 4) - 2 * 18px);
  }
  .menuColCls4 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 3 * 18px - 180px) / 4);
  }
  .menuRowCls .menuColCls4:first-of-type {
    width: calc(((100% + 3 * 18px - 180px) / 4) - 3 * 18px);
  }
  .menuColCls5 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 4 * 18px - 180px) / 4);
  }
  .menuRowCls .menuColCls5:first-of-type {
    width: calc(((100% + 4 * 18px - 180px) / 4) - 4 * 18px);
  }
  .operateCls {
    width: 180px;
    text-align: center;
  }
</style>
