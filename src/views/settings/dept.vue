<template>
  <section>
    <div class="dept-grid-header">
      <div class="col">部门名称</div>
      <div class="col">部门编码</div>
      <div class="col">部门类型</div>
      <div class="col">部门级别</div>
      <div class="col">备注</div>
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
    <!--新增/修改部门Dialog-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="deptRules" ref="deptForm" label-width="100px">
        <el-form-item label="上级部门">
          <el-input v-model="form.dPname" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="dName">
          <el-input v-model="form.dName"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" prop="dCode">
          <el-input v-model="form.dCode"></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="dType">
          <el-select v-model="form.dType" placeholder="请选择">
            <el-option
              v-for="i in dictOptions.deptType"
              :key="i.dCode"
              :label="i.dTitle"
              :value="i.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门级别" prop="dLevel">
          <el-select v-model="form.dLevel" placeholder="请选择">
            <el-option
              v-for="i in dictOptions.deptLevel"
              :key="i.dCode"
              :label="i.dTitle"
              :value="i.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用" prop="isable">
          <el-select v-model="form.isable" placeholder="请选择">
            <el-option
              v-for="i in dictOptions.sf"
              :key="i.dCode"
              :label="i.dTitle"
              :value="i.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.dConnectId"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="dTel">
          <el-input v-model="form.dTel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="dEmail">
          <el-input v-model="form.dEmail"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDept()">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  //  import common from '../../utils/common'
  import api from '../../api/settings/dept'
  export default {
    data () {
      return {
        data: [{
          id: null,
          dName: '部门树根节点',
          dCode: '',
          level: '',
          type: '',
          remark: '根节点，不能删除',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'dName'
        },
        dictOptions: {
          sf: this.$store.state.dictList.filter(o => o.dClassify === 'SF'),
          deptType: this.$store.state.dictList.filter(o => o.dClassify === 'DEPT_TYPE'),
          deptLevel: this.$store.state.dictList.filter(o => o.dClassify === 'DEPT_LEVEL')
        },
        dialogFormVisible: false,
        dialogTitle: '',
        form: {
          dPid: '',
          dPname: '',
          id: null,
          dName: '',
          dCode: '',
          dLevel: '',
          dType: '',
          dConnectId: '',
          dEmail: '',
          dTel: '',
          isable: '',
          remark: ''
        },
        deptRules: {
          dName: [
            { required: true, message: '请输入部门名称' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          dCode: [
            { required: true, message: '请输入部门编号' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          dLevel: [
            { required: true, message: '请选择部门级别', trigger: 'change' }
          ],
          dType: [
            { required: true, message: '请选择部门类型', trigger: 'change' }
          ],
          dEmail: [
            { type: 'email', message: '请输入格式正确的邮箱' }
          ],
          dTel: [
            { pattern: /^(1[34578]\d{9})|(0\d{2}-\d{8})|(0\d{3}-\d{7})$/, message: '请输入格式正确的手机或电话号码' }
          ],
          isable: [
            { required: true, message: '请选择是否可用', trigger: 'change' }
          ],
          remark: [
            { min: 1, max: 40, message: '长度在 1 到 40 个字符' }
          ]
        }
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        let me = this
        api.getDeptList(null, function (data) {
          me.data[0].children = data.list
        })
      },
      handleNodeClick () {
//        console.log('handleNodeClick')
      },
      renderContent (h, { node, data, store }) {
        let me = this
        let str = 'deptColCls' + node.level
        let clsObj = {}
        clsObj[str] = true

        let btnArr = [
          h('el-button', {attrs: {size: 'mini', type: 'text'},
            on: {
              click: function (event) {
                me.dialogFormVisible = true
                me.dialogTitle = '修改部门'
                me.$nextTick(function () {
                  me.$refs['deptForm'].resetFields()
                  me.form.dPid = node.parent.data.id
                  me.form.dPname = node.parent.data.dName
                  me.form.id = data.id
                  me.form.dName = data.dName
                  me.form.dCode = data.dCode
                  me.form.dLevel = data.dLevel
                  me.form.dType = data.dType
                  me.form.dConnectId = data.dConnectId
                  me.form.dEmail = data.dEmail
                  me.form.dTel = data.dTel
                  me.form.isable = data.isable
                  me.form.remark = data.remark
                })
                event.stopPropagation()
              }
            }}, '修改'),
          h('el-button', {attrs: {size: 'mini', type: 'text'},
            on: {
              click: function (event) {
                let msg = (data.children.length > 0) ? '你确定要删除该部门及其子部门吗?' : '你确定要删除该部门吗?'
                me.$confirm(msg, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  api.delDept({id: data.id}, function (data) {
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
                me.dialogTitle = '新增部门'
                me.$nextTick(function () {
                  me.$refs['deptForm'].resetFields()
                  me.form.dPid = data.id
                  me.form.dPname = data.dName
                  me.form.id = null
                  me.form.dName = ''
                  me.form.dCode = ''
                  me.form.dLevel = ''
                  me.form.dType = ''
                  me.form.dConnectId = ''
                  me.form.dEmail = ''
                  me.form.dTel = ''
                  me.form.isable = ''
                  me.form.remark = ''
                })
                event.stopPropagation()
              }
            }}, '添加下级部门')
        ]
        if (node.level === 1) {
          btnArr = [
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  me.dialogFormVisible = true
                  me.dialogTitle = '新增部门'
                  me.$nextTick(function () {
                    me.$refs['deptForm'].resetFields()
                    me.form.dPid = data.id
                    me.form.dPname = data.dName
                    me.form.id = null
                    me.form.dName = ''
                    me.form.dCode = ''
                    me.form.dLevel = ''
                    me.form.dType = ''
                    me.form.dConnectId = ''
                    me.form.dEmail = ''
                    me.form.dTel = ''
                    me.form.isable = ''
                    me.form.remark = ''
                  })
                  event.stopPropagation()
                }
              }}, '添加下级部门')
          ]
        }
        return h('span', {'class': {deptRowCls: true}}, [
          h('span', {'class': clsObj}, data.dName),
          h('span', {'class': clsObj}, data.dCode),
          h('span', {'class': clsObj, style: {textAlign: 'center'}}, data.type),
          h('span', {'class': clsObj, style: {textAlign: 'center'}}, data.level),
          h('span', {'class': clsObj}, data.remark),
          h('span', {'class': {operateCls: true}}, btnArr)
        ])
      },
      saveDept () {
        let me = this
        this.$refs['deptForm'].validate((valid) => {
          if (valid) {
            api.saveDept(this.form, function (data) {
              me.dialogFormVisible = false
              me.fetchData()
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/_variable";
  $tree-row-height: 40px;
  .dept-grid-header {
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
    width: calc((100% - 25px - 180px) / 5);
    border-left: 1px solid $border-color;
  }
  .col:first-of-type {
    width: calc(((100% - 25px - 180px) / 5) + 24px)
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
  .deptRowCls {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .deptColCls1 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% - 180px) / 5);
  }
  .deptColCls2 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 18px - 180px) / 5);
  }
  .deptRowCls .deptColCls2:first-of-type {
    width: calc(((100% + 18px - 180px) / 5) - 18px);
  }
  .deptColCls3 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 2 * 18px - 180px) / 5);
  }
  .deptRowCls .deptColCls3:first-of-type {
    width: calc(((100% + 2 * 18px - 180px) / 5) - 2 * 18px);
  }
  .deptColCls4 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 3 * 18px - 180px) / 5);
  }
  .deptRowCls .deptColCls4:first-of-type {
    width: calc(((100% + 3 * 18px - 180px) / 5) - 3 * 18px);
  }
  .deptColCls5 {
    border-right: 1px solid $border-color;
    height: $tree-row-height;
    line-height: $tree-row-height;
    width: calc((100% + 4 * 18px - 180px) / 5);
  }
  .deptRowCls .deptColCls5:first-of-type {
    width: calc(((100% + 4 * 18px - 180px) / 5) - 4 * 18px);
  }
  .operateCls {
    width: 180px;
    text-align: center;
  }
</style>
