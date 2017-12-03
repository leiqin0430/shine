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
      <el-table-column prop="rName" label="角色名称" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="rEname" label="英文名称" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="type" label="角色类型" width="120" header-align="center">
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
      <el-form :model="roleForm" :label-width="formLabelWidth">
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.rName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="roleForm.rEname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="roleForm.rType" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.roleType"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="roleForm.isable" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.sf"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据范围">
          <el-select v-model="roleForm.rDataRange" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.dataRange"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
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
      <el-table :data="resourceData" height="400" size="small" border stripe ref="resTable">
        <el-table-column type="selection" width="55" header-align="center" align="center"></el-table-column>
        <el-table-column prop="rTitle" label="资源名称" width="100" header-align="center">
        </el-table-column>
        <el-table-column prop="rUrl" label="资源地址" width="100" header-align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="rClass" label="类名" width="100" header-align="center">
        </el-table-column>
        <el-table-column prop="rMethod" label="方法名" width="100" header-align="center">
        </el-table-column>
        <el-table-column prop="isable" label="是否可用" width="100" header-align="center" align="center">
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
  import common from '../../utils/common'
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
          sf: [],
          roleType: [],
          dataRange: []
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
        roleDialogVisible: false,
        roleDialogTitle: '',
        formLabelWidth: '100px',
        treeData: [],
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
      let me = this
      this.fetchData()
      // 获取下拉字典：是否可用、角色类型、数据范围
      common.getDictList({dClassify: 'SF'}, function (data) {
        me.dictOptions.sf = data.page.rows
      })
      common.getDictList({dClassify: 'ROLE_TYPE'}, function (data) {
        me.dictOptions.roleType = data.page.rows
      })
      common.getDictList({dClassify: 'DATA_RANGE'}, function (data) {
        me.dictOptions.dataRange = data.page.rows
      })
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
        this.roleDialogTitle = '新增角色'
        this.roleDialogVisible = true
        this.roleForm.id = null
        this.roleForm.rName = ''
        this.roleForm.rEname = ''
        this.roleForm.rType = ''
        this.roleForm.rDataRange = ''
        this.roleForm.isable = ''
        this.roleForm.remark = ''
      },
      updateRole (row) {
        this.roleDialogTitle = '修改角色'
        this.roleDialogVisible = true
        this.roleForm.id = row.id
        this.roleForm.rName = row.rName
        this.roleForm.rEname = row.rEname
        this.roleForm.rType = row.rType
        this.roleForm.rDataRange = row.rDataRange
        this.roleForm.isable = row.isable
        this.roleForm.remark = row.remark
      },
      saveRole () {
        let me = this
        api.saveRole(this.roleForm, function (data) {
          me.roleDialogVisible = false
          me.fetchData()
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
            me.$refs.menuTree.setCheckedKeys(data.list)
          })
        })
        this.menuAuthDialogVisible = true
      },
      saveMenuAuth () {
        let me = this
        api.saveRoleMenuAuth({id: this.currentRoleId, ids: this.$refs.menuTree.getCheckedKeys()}, function (data) {
          me.menuAuthDialogVisible = false
        })
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
        let resIds = []
        this.$refs.resTable.selection.forEach(row => {
          resIds.push(row.id)
        })
        api.saveRoleResAuth({id: this.currentRoleId, ids: resIds}, function (data) {
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
          me.resourceData.forEach(row => {
            me.roleResAuthIds.forEach(id => {
              if (row.id === id) {
                me.$refs.resTable.toggleRowSelection(row)
              }
            })
          })
        })
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
