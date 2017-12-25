<template>
  <section class="shine-tab-content">
    <el-form :inline="true" :model="userFilter">
      <el-form-item label="用户名">
        <el-input v-model="userFilter.uUsername" placeholder="请输入工号\姓名\登录名"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input v-model="userFilter.deptName" placeholder="请选择" :readonly="true">
          <el-button slot="append" icon="el-icon-search" @click="openSelectDeptDialog"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList">查询</el-button>
        <el-button type="primary" @click="addUser">新增用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="'auto'" size="small" border stripe style="height: calc((100% - 51px) - 32px)">
      <el-table-column prop="uAccount" label="工号" width="140" header-align="center">
      </el-table-column>
      <el-table-column prop="uName" label="姓名" width="140" header-align="center">
      </el-table-column>
      <el-table-column prop="uUsername" label="登录名" width="140" header-align="center">
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="uTel" label="联系电话" width="120" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="300" header-align="center">
        <template slot-scope="scope">
          <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delUser(scope.row.id)" type="text" size="small">删除</el-button>
          <el-button @click="openDeptAuthDialog(scope.row.id)"  type="text" size="small">分配部门</el-button>
          <el-button @click="openRoleAuthDialog(scope.row.id)" type="text" size="small">分配角色</el-button>
          <el-button @click="resetPwd(scope.row.id)" type="text" size="small">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userFilter.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="userFilter.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal">
    </el-pagination>
    <!--部门选择dialog-->
    <el-dialog title="选择部门" :visible.sync="selectDeptDialogVisible" :close-on-click-modal="false" width="30%">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        :data="treeData"
        default-expand-all
        node-key="id"
        ref="selectDeptTree"
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode">
      </el-tree>
      <div slot="footer">
        <el-button @click="selectDeptDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectDeptOk">确 定</el-button>
      </div>
    </el-dialog>
    <!--用户基本信息dialog-->
    <el-dialog :title="userDialogTitle" :visible.sync="userDialogVisible" :close-on-click-modal="false" width="35%">
      <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="110px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="fileUploadPath"
            accept="image/*"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="userForm.uHeadUrl" :src="userForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="text" v-if="userForm.uHeadUrl" @click="userForm.uHeadUrl = '';userForm.imageUrl = ''" style="margin-top: 15px; margin-left: 8px;">清除</el-button>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="userForm.uAccount" :readonly="true" placeholder="由后台生成"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="uName">
          <el-input v-model="userForm.uName"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="uUsername">
          <el-input v-model="userForm.uUsername"></el-input>
        </el-form-item>
        <el-form-item label="助记码" prop="uInputCode">
          <el-input v-model="userForm.uInputCode"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="uEmail">
          <el-input v-model="userForm.uEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="uTel">
          <el-input v-model="userForm.uTel"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="uType">
          <el-select v-model="userForm.uType" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.userType"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否允许登录" prop="isable">
          <el-select v-model="userForm.isable" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.sf"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="userForm.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="userDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--部门权限dialog-->
    <el-dialog title="部门权限" :visible.sync="deptAuthDialogVisible" :close-on-click-modal="false" width="30%">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="deptTree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <div slot="footer">
        <el-button @click="deptAuthDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDeptAuth">确 定</el-button>
      </div>
    </el-dialog>
    <!--角色权限dialog-->
    <el-dialog title="角色权限" :visible.sync="roleAuthDialogVisible" :close-on-click-modal="false">
      <el-table :data="roleData" height="400" size="small" border stripe ref="roleTable" @select="selectRes" @select-all="selectAllRes">
        <el-table-column type="selection" width="55" header-align="center" align="center"></el-table-column>
        <el-table-column prop="rName" label="角色名称" width="150" header-align="center">
        </el-table-column>
        <el-table-column prop="rEname" label="英文名称" width="150" header-align="center">
        </el-table-column>
        <el-table-column prop="type" label="角色类型" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="dataRange" label="数据范围" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="roleSizeChange"
        @current-change="roleCurrentChange"
        :current-page="roleFilter.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="roleFilter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleDataTotal">
      </el-pagination>
      <div slot="footer">
        <el-button @click="roleAuthDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleAuth">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import common from '../../utils/common'
  import api from '../../api/settings/user'
  import deptApi from '../../api/settings/dept'
  import roleApi from '../../api/settings/role'
  export default {
    data () {
      return {
        tableData: [],
        tableDataTotal: 0,
        userFilter: {
          uUsername: '',
          uDeptId: '',
          deptName: '',
          currentPage: 1,
          pageSize: 10
        },
        dictOptions: {
          sf: this.$store.state.dictList.filter(o => o.dClassify === 'SF'),
          userType: this.$store.state.dictList.filter(o => o.dClassify === 'USER_TYPE')
        },
        filterText: '',
        selectDeptDialogVisible: false,
        userForm: {
          id: null,
          imageUrl: '',
          uHeadUrl: '',
          uAccount: '',
          uName: '',
          uUsername: '',
          uInputCode: '',
          uEmail: '',
          uTel: '',
          uType: '',
          isable: '',
          remark: ''
        },
        userRules: {
          uName: [
            { required: true, message: '请输入姓名' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          uUsername: [
            { required: true, message: '请输入登录名' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          uInputCode: [
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          uEmail: [
            { type: 'email', message: '请输入格式正确的邮箱' }
          ],
          uTel: [
            { pattern: /^(1[34578]\d{9})|(0\d{2}-\d{8})|(0\d{3}-\d{7})$/, message: '请输入格式正确的手机或电话号码' }
          ],
          uType: [
            { required: true, message: '请选择用户类型', trigger: 'change' }
          ],
          isable: [
            { required: true, message: '请选择是否允许登录', trigger: 'change' }
          ],
          remark: [
            { min: 1, max: 40, message: '长度在 1 到 40 个字符' }
          ]
        },
        userDialogVisible: false,
        userDialogTitle: '',
        treeData: [],
        deptNodeObj: {
          nodeIds: [],
          leafNodeIds: []
        },
        defaultProps: {
          children: 'children',
          label: 'dName'
        },
        currentUserId: '',
        deptAuthDialogVisible: false,
        roleData: [],
        roleDataTotal: 0,
        roleFilter: {
          isable: '1',
          rName: '',
          currentPage: 1,
          pageSize: 10
        },
        userRoleAuthIds: [],
        roleAuthDialogVisible: false,
        fileUploadPath: common.constObj.fileUploadPath,
        defaultPassword: common.constObj.defaultPassword
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      filterText (val) {
        this.$refs.selectDeptTree.filter(val)
      }
    },
    methods: {
      getUserList () {
        this.fetchData()
      },
      fetchData () {
        let me = this
        api.getUserList(this.userFilter, function (data) {
          me.tableData = data.page.rows
          me.tableDataTotal = data.page.total
        })
      },
      handleSizeChange (val) {
        this.userFilter.pageSize = val
        this.fetchData()
      },
      handleCurrentChange (val) {
        this.userFilter.currentPage = val
        this.fetchData()
      },
      openSelectDeptDialog () {
        let me = this
        if (this.treeData.length === 0) {
          // 获取可见菜单列表
          deptApi.getDeptList({isable: '1'}, function (data) {
            me.treeData = data.list
          })
        } else {
          // 清空选中节点
          this.$refs.selectDeptTree.setCurrentNode([])
        }
        this.filterText = ''
        this.selectDeptDialogVisible = true
      },
      filterNode (value, data) {
        if (!value) return true
        return data.dName.indexOf(value) !== -1
      },
      selectDeptOk () {
        let currentNode = this.$refs.selectDeptTree.getCurrentNode()
        if (currentNode) {
          if (currentNode.children.length > 0) {
            this.$message({
              message: '不能选择父节点（' + currentNode.dName + '）请重新选择',
              type: 'warning'
            })
          } else {
            this.userFilter.deptName = currentNode.dName
            this.userFilter.uDeptId = currentNode.id
            this.selectDeptDialogVisible = false
          }
        } else {
//          this.$message({
//            message: '请先选择一个子节点',
//            type: 'warning'
//          })
          this.userFilter.deptName = ''
          this.userFilter.uDeptId = ''
          this.selectDeptDialogVisible = false
        }
      },
      addUser () {
        this.userDialogVisible = true
        this.userDialogTitle = '新增用户'
        this.$nextTick(function () {
          this.$refs['userForm'].resetFields()
          this.userForm.id = null
          this.userForm.imageUrl = ''
          this.userForm.uHeadUrl = ''
          this.userForm.uAccount = ''
          this.userForm.uName = ''
          this.userForm.uUsername = ''
          this.userForm.uInputCode = ''
          this.userForm.uEmail = ''
          this.userForm.uTel = ''
          this.userForm.uType = ''
          this.userForm.isable = ''
          this.userForm.remark = ''
        })
      },
      updateUser (row) {
        this.userDialogVisible = true
        this.userDialogTitle = '修改用户'
        this.$nextTick(function () {
          this.$refs['userForm'].resetFields()
          this.userForm.id = row.id
          this.userForm.imageUrl = process.env.BASE_URL + row.uHeadUrl
          this.userForm.uHeadUrl = row.uHeadUrl
          this.userForm.uAccount = row.uAccount
          this.userForm.uName = row.uName
          this.userForm.uUsername = row.uUsername
          this.userForm.uInputCode = row.uInputCode
          this.userForm.uEmail = row.uEmail
          this.userForm.uTel = row.uTel
          this.userForm.uType = row.uType
          this.userForm.isable = row.isable
          this.userForm.remark = row.remark
        })
      },
      saveUser () {
        let me = this
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            api.saveUser(this.userForm, function (data) {
              me.userDialogVisible = false
              me.fetchData()
            })
          } else {
            return false
          }
        })
      },
      delUser (id) {
        let me = this
        me.$confirm('你确定要删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delUser({id: id}, function (data) {
            me.fetchData()
          })
        }).catch(() => {
          me.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleAvatarSuccess (res, file) {
        this.userForm.imageUrl = URL.createObjectURL(file.raw)
        this.userForm.uHeadUrl = res.obj.fileUrl
      },
      beforeAvatarUpload (file) {
//        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!')
//        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
//        return isJPG && isLt2M
        return isLt2M
      },
      resetPwd (id) {
        let me = this
        me.$confirm('你确定要重置该用户登录密码吗?重置后默认登录密码为\'' + me.defaultPassword + '\'', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.resetPwd({id: id})
        }).catch(() => {
          me.$message({
            type: 'info',
            message: '已取消重置密码'
          })
        })
      },
      openDeptAuthDialog (id) {
        this.currentUserId = id
        let me = this
        // 获取可见部门列表
        deptApi.getDeptList({isable: '1'}, function (data) {
          me.treeData = data.list
          // 获取用户部门权限列表
          api.getUserDeptAuth({uid: id}, function (data) {
            // 清空数组
            me.deptNodeObj.leafNodeIds = []
            // 获取树中所有叶子节点
            me.findLeafNodeIds(me.treeData)
            let set1 = new Set(me.deptNodeObj.leafNodeIds)
            let set2 = new Set(data.list)
            // 取交集
            let intersect = new Set([...set1].filter(x => set2.has(x)))
            me.$refs.deptTree.setCheckedKeys(Array.from(intersect))
          })
        })
        this.deptAuthDialogVisible = true
      },
      findLeafNodeIds (arr) {
        arr.forEach(node => {
          if (node.children.length === 0) {
            this.deptNodeObj.leafNodeIds.push(node.id)
          } else {
            this.findLeafNodeIds(node.children)
          }
        })
      },
      saveDeptAuth () {
        let me = this
        let checkedKeys = this.$refs.deptTree.getCheckedKeys()
        // 清空数组
        this.deptNodeObj.nodeIds = []
        checkedKeys.forEach(id => {
          this.treeData.forEach(node => {
            this.findNodeId(node, id)
          })
        })
        api.saveUserDeptAuth({id: this.currentUserId, ids: Array.from(new Set(this.deptNodeObj.nodeIds))}, function (data) {
          me.deptAuthDialogVisible = false
          me.fetchData()
        })
      },
      findNodeId (node, id) {
        if (node.id === id) {
          this.deptNodeObj.nodeIds.push(id)
          return true
        }
        if (node.children.length > 0) {
          node.children.forEach(n => {
            if (this.findNodeId(n, id)) {
              this.deptNodeObj.nodeIds.push(node.id)
              return true
            }
          })
        }
        return false
      },
      openRoleAuthDialog (id) {
        this.currentUserId = id
        let me = this
        // 获取可见角色列表
        roleApi.getRoleList(this.roleFilter, function (data) {
          me.roleData = data.page.rows
          me.roleDataTotal = data.page.total
          // 获取用户角色权限列表
          api.getUserRoleAuth({uid: id}, function (data) {
            me.userRoleAuthIds = data.list
            me.roleData.forEach(row => {
              me.userRoleAuthIds.forEach(id => {
                if (row.id === id) {
                  me.$refs.roleTable.toggleRowSelection(row)
                }
              })
            })
          })
        })
        this.roleAuthDialogVisible = true
      },
      saveRoleAuth () {
        let me = this
        api.saveUserRoleAuth({id: this.currentUserId, ids: this.userRoleAuthIds}, function (data) {
          me.roleAuthDialogVisible = false
        })
      },
      roleSizeChange (val) {
        this.roleFilter.pageSize = val
        this.getRoleAndRoleAuthList()
      },
      roleCurrentChange (val) {
        this.roleFilter.currentPage = val
        this.getRoleAndRoleAuthList()
      },
      getRoleAndRoleAuthList () {
        let me = this
        // 获取可见资源列表
        roleApi.getRoleList(this.roleFilter, function (data) {
          me.roleData = data.page.rows
          me.roleDataTotal = data.page.total
          // 回显角色资源权限
          me.$nextTick(function () {
            me.roleData.forEach(row => {
              me.userRoleAuthIds.forEach(id => {
                if (row.id === id) {
                  me.$refs.roleTable.toggleRowSelection(row)
                }
              })
            })
          })
        })
      },
      selectRes (selection, row) {
        let index = this.userRoleAuthIds.findIndex(id => id === row.id)
        if (index !== -1) {
          this.userRoleAuthIds.splice(index, 1)
        } else {
          this.userRoleAuthIds.push(row.id)
        }
      },
      selectAllRes (selection) {
        // 全部选中
        if (selection.length > 0) {
          selection.forEach(row => {
            let index = this.userRoleAuthIds.findIndex(id => id === row.id)
            if (index === -1) {
              this.userRoleAuthIds.push(row.id)
            }
          })
        } else { // 全部取消选中
          this.resourceData.forEach(row => {
            let index = this.userRoleAuthIds.findIndex(id => id === row.id)
            if (index !== -1) {
              this.userRoleAuthIds.splice(index, 1)
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .avatar-uploader {
    float: left;
    height: 62px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
