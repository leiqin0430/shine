<template>
  <section class="shine-tab-content">
    <el-form :inline="true" :model="roleFilter">
      <el-form-item label="快速查找">
        <el-input v-model="roleFilter.rName" placeholder="请输入角色名称或英文名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoleList">查询</el-button>
        <el-button type="primary" @click="addRole">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="'auto'" size="small" border stripe style="height: calc((100% - 51px) - 32px)">
      <el-table-column prop="rName" label="角色名称" width="200" header-align="center">
      </el-table-column>
      <el-table-column prop="rEname" label="英文名称" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="type" label="角色类型" width="140" header-align="center">
      </el-table-column>
      <el-table-column prop="dataRange" label="数据范围" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="isableText" label="是否可用" width="100" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="255" header-align="center">
        <template slot-scope="scope">
          <el-popover
            ref="roleLookPopover"
            placement="top"
            width="400"
            trigger="click">
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">角色名称：</el-col>
              <el-col :span="18">{{scope.row.rName}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">英文名称：</el-col>
              <el-col :span="18">{{scope.row.rEname}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">角色类型：</el-col>
              <el-col :span="18">{{scope.row.type}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">数据范围：</el-col>
              <el-col :span="18">{{scope.row.dataRange}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">是否可用：</el-col>
              <el-col :span="18">{{scope.row.isableText}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">备注：</el-col>
              <el-col :span="18">{{scope.row.remark}}</el-col>
            </el-row>
            <!--<p>角色名称：{{scope.row.rName}}</p>-->
            <!--<p>英文名称：{{scope.row.rEname}}</p>-->
            <!--<p>角色类型：{{scope.row.type}}</p>-->
            <!--<p>数据范围：{{scope.row.dataRange}}</p>-->
            <!--<p>是否可用：{{scope.row.isableText}}</p>-->
            <!--<p>备注：{{scope.row.remark}}</p>-->
          </el-popover>
          <el-button v-popover:roleLookPopover type="text" size="small">查看</el-button>
          <el-button @click="updateRole(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delRole(scope.row.id)" type="text" size="small">删除</el-button>
          <el-button @click="openMenuAuthDialog(scope.row.id)" type="text" size="small">分配菜单</el-button>
          <el-button @click="openResourceAuthDialog(scope.row.id)" type="text" size="small">分配资源</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="roleFilter.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="roleFilter.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal">
    </el-pagination>
    <!--角色dialog-->
    <el-dialog :title="roleDialogTitle" :visible.sync="roleDialogVisible" :close-on-click-modal="false">
      <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="100px">
        <el-form-item label="角色名称" prop="rName">
          <el-input v-model="roleForm.rName"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="rEname">
          <el-input v-model="roleForm.rEname"></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="rType">
          <el-select v-model="roleForm.rType" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.roleType"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用" prop="isable">
          <el-select v-model="roleForm.isable" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.sf"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据范围" prop="rDataRange">
          <el-select v-model="roleForm.rDataRange" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.dataRange"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
      </div>
    </el-dialog>
    <!--菜单权限dialog-->
    <el-dialog title="菜单权限" :visible.sync="menuAuthDialogVisible" :close-on-click-modal="false" width="30%">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="menuTree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <div slot="footer">
        <el-button @click="menuAuthDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMenuAuth">确 定</el-button>
      </div>
    </el-dialog>
    <!--资源权限dialog-->
    <el-dialog title="资源权限" :visible.sync="resourceAuthDialogVisible" :close-on-click-modal="false">
      <el-table :data="resourceData" height="400" size="small" border stripe ref="resTable" @select="selectRes" @select-all="selectAllRes" @selection-change="selectChange">
        <el-table-column type="selection" width="55" header-align="center" align="center"></el-table-column>
        <el-table-column prop="rTitle" label="资源名称" width="140" header-align="center">
        </el-table-column>
        <el-table-column prop="rUrl" label="资源地址" width="140" header-align="center">
        </el-table-column>
        <el-table-column prop="rClass" label="类名" width="160" header-align="center">
        </el-table-column>
        <el-table-column prop="rMethod" label="方法名" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="isable" label="是否可用" width="70" header-align="center" align="center">
          <template slot-scope="scope">
            <span v-for="item in dictOptions.sf" v-if="item.dCode === scope.row.isable">{{item.dTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="resSizeChange"
        @current-change="resCurrentChange"
        :current-page="resFilter.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="resFilter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resourceDataTotal">
      </el-pagination>
      <div slot="footer">
        <el-button @click="resourceAuthDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveResourceAuth">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  //  import common from '../../utils/common'
  import api from '../../api/settings/role'
  import menuApi from '../../api/settings/menu'
  import resApi from '../../api/settings/resource'
  export default {
    data () {
      return {
        tableData: [],
        tableDataTotal: 0,
        roleFilter: {
          rName: '',
          currentPage: 1,
          pageSize: 10
        },
        dictOptions: {
          sf: this.$store.state.dictList.filter(o => o.dClassify === 'SF'),
          roleType: this.$store.state.dictList.filter(o => o.dClassify === 'ROLE_TYPE'),
          dataRange: this.$store.state.dictList.filter(o => o.dClassify === 'DATA_RANGE')
        },
        roleForm: {
          id: null,
          rName: '',
          rEname: '',
          rType: '',
          rDataRange: '',
          isable: '',
          remark: ''
        },
        roleRules: {
          rName: [
            { required: true, message: '请输入角色名称' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          rEname: [
            { required: true, message: '请输入英文名称' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          rType: [
            { required: true, message: '请选择角色类型', trigger: 'change' }
          ],
          rDataRange: [
            { required: true, message: '请选择数据范围', trigger: 'change' }
          ],
          isable: [
            { required: true, message: '请选择是否可用', trigger: 'change' }
          ],
          remark: [
            { min: 1, max: 40, message: '长度在 1 到 40 个字符' }
          ]
        },
        roleDialogVisible: false,
        roleDialogTitle: '',
        treeData: [],
        menuNodeObj: {
          nodeIds: [],
          leafNodeIds: []
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentRoleId: '',
        menuAuthDialogVisible: false,
        resourceData: [],
        resourceDataTotal: 0,
        resFilter: {
          isable: '1',
          rTitle: '',
          currentPage: 1,
          pageSize: 10
        },
        roleResAuthIds: [],
        resourceAuthDialogVisible: false
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      getRoleList () {
        this.fetchData()
      },
      fetchData () {
        let me = this
        api.getRoleList(this.roleFilter, function (data) {
          me.tableData = data.page.rows
          me.tableDataTotal = data.page.total
        })
      },
      handleSizeChange (val) {
        this.roleFilter.pageSize = val
        this.fetchData()
      },
      handleCurrentChange (val) {
        this.roleFilter.currentPage = val
        this.fetchData()
      },
      addRole () {
        this.roleDialogVisible = true
        this.roleDialogTitle = '新增角色'
        this.$nextTick(function () {
          this.$refs['roleForm'].resetFields()
          this.roleForm.id = null
          this.roleForm.rName = ''
          this.roleForm.rEname = ''
          this.roleForm.rType = ''
          this.roleForm.rDataRange = ''
          this.roleForm.isable = ''
          this.roleForm.remark = ''
        })
      },
      updateRole (row) {
        this.roleDialogVisible = true
        this.roleDialogTitle = '修改角色'
        this.$nextTick(function () {
          this.$refs['roleForm'].resetFields()
          this.roleForm.id = row.id
          this.roleForm.rName = row.rName
          this.roleForm.rEname = row.rEname
          this.roleForm.rType = row.rType
          this.roleForm.rDataRange = row.rDataRange
          this.roleForm.isable = row.isable
          this.roleForm.remark = row.remark
        })
      },
      saveRole () {
        let me = this
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            api.saveRole(this.roleForm, function (data) {
              me.roleDialogVisible = false
              me.fetchData()
            })
          } else {
            return false
          }
        })
      },
      delRole (id) {
        let me = this
        me.$confirm('你确定要删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delRole({id: id}, function (data) {
            me.fetchData()
          })
        }).catch(() => {
          me.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      openMenuAuthDialog (id) {
        this.currentRoleId = id
        let me = this
        // 获取可见菜单列表
        menuApi.getMenuList({visible: '1'}, function (data) {
          me.treeData = data.list
          // 获取角色菜单权限列表
          api.getRoleMenuAuth({rid: id}, function (data) {
            // 清空数组
            me.menuNodeObj.leafNodeIds = []
            // 获取树中所有叶子节点
            me.findLeafNodeIds(me.treeData)
            let set1 = new Set(me.menuNodeObj.leafNodeIds)
            let set2 = new Set(data.list)
            // 取交集
            let intersect = new Set([...set1].filter(x => set2.has(x)))
            me.$refs.menuTree.setCheckedKeys(Array.from(intersect))
          })
        })
        this.menuAuthDialogVisible = true
      },
      findLeafNodeIds (arr) {
        arr.forEach(node => {
          if (node.children.length === 0) {
            this.menuNodeObj.leafNodeIds.push(node.id)
          } else {
            this.findLeafNodeIds(node.children)
          }
        })
      },
      saveMenuAuth () {
        let me = this
        let checkedKeys = this.$refs.menuTree.getCheckedKeys()
        // 清空数组
        this.menuNodeObj.nodeIds = []
        checkedKeys.forEach(id => {
          this.treeData.forEach(node => {
            this.findNodeId(node, id)
          })
        })
        api.saveRoleMenuAuth({id: this.currentRoleId, ids: Array.from(new Set(this.menuNodeObj.nodeIds))}, function (data) {
          me.menuAuthDialogVisible = false
        })
      },
      findNodeId (node, id) {
        if (node.id === id) {
          this.menuNodeObj.nodeIds.push(id)
          return true
        }
        if (node.children.length > 0) {
          node.children.forEach(n => {
            if (this.findNodeId(n, id)) {
              this.menuNodeObj.nodeIds.push(node.id)
              return true
            }
          })
        }
        return false
      },
      openResourceAuthDialog (id) {
        this.currentRoleId = id
        let me = this
        // 获取可见资源列表
        resApi.getResourceList(this.resFilter, function (data) {
          me.resourceData = data.page.rows
          me.resourceDataTotal = data.page.total
          // 获取角色资源权限列表
          api.getRoleResAuth({rid: id}, function (data) {
            me.roleResAuthIds = data.list
            me.resourceData.forEach(row => {
              me.roleResAuthIds.forEach(id => {
                if (row.id === id) {
                  me.$refs.resTable.toggleRowSelection(row)
                }
              })
            })
          })
        })
        this.resourceAuthDialogVisible = true
      },
      saveResourceAuth () {
        let me = this
        api.saveRoleResAuth({id: this.currentRoleId, ids: this.roleResAuthIds}, function (data) {
          me.resourceAuthDialogVisible = false
        })
      },
      resSizeChange (val) {
        this.resFilter.pageSize = val
        this.getResAndResAuthList()
      },
      resCurrentChange (val) {
        this.resFilter.currentPage = val
        this.getResAndResAuthList()
      },
      getResAndResAuthList () {
        let me = this
        // 获取可见资源列表
        resApi.getResourceList(this.resFilter, function (data) {
          me.resourceData = data.page.rows
          me.resourceDataTotal = data.page.total
          // 回显角色资源权限
          me.$nextTick(function () {
            me.resourceData.forEach(row => {
              me.roleResAuthIds.forEach(id => {
                if (row.id === id) {
                  me.$refs.resTable.toggleRowSelection(row)
                }
              })
            })
          })
        })
      },
      selectRes (selection, row) {
        let index = this.roleResAuthIds.findIndex(id => id === row.id)
        if (index !== -1) {
          this.roleResAuthIds.splice(index, 1)
        } else {
          this.roleResAuthIds.push(row.id)
        }
      },
      selectAllRes (selection) {
        // 全部选中
        if (selection.length > 0) {
          selection.forEach(row => {
            let index = this.roleResAuthIds.findIndex(id => id === row.id)
            if (index === -1) {
              this.roleResAuthIds.push(row.id)
            }
          })
        } else { // 全部取消选中
          this.resourceData.forEach(row => {
            let index = this.roleResAuthIds.findIndex(id => id === row.id)
            if (index !== -1) {
              this.roleResAuthIds.splice(index, 1)
            }
          })
        }
      },
      selectChange (selection) {
//        console.log('change')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/_variable";
  .el-pagination {
    border: 1px solid $border-color;
    border-top: none;
  }
</style>
