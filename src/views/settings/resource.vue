<template>
  <section class="shine-tab-content">
    <el-form :inline="true" :model="resourceFilter">
      <el-form-item label="快速查找">
        <el-input v-model="resourceFilter.rTitle" placeholder="请输入资源名称或类名或方法名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getResourceList">查询</el-button>
        <el-button type="primary" @click="addResource">新增资源</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="'auto'" size="small" border stripe style="height: calc((100% - 51px) - 32px)">
      <el-table-column prop="rTitle" label="资源名称" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="rUrl" label="资源地址" width="120" header-align="center">
      </el-table-column>
      <el-table-column prop="rClass" label="类名" width="120" header-align="center">
      </el-table-column>
      <el-table-column prop="rMethod" label="方法名" width="120" header-align="center">
      </el-table-column>
      <el-table-column prop="isable" label="是否可用" width="120" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="200" header-align="center">
        <template slot-scope="scope">
          <el-popover
            ref="resourceLookPopover"
            placement="top"
            width="400"
            trigger="click">
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">资源名称：</el-col>
              <el-col :span="18">{{scope.row.rTitle}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">资源地址：</el-col>
              <el-col :span="18">{{scope.row.rUrl}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">类名：</el-col>
              <el-col :span="18">{{scope.row.rClass}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">是否可用：</el-col>
              <el-col :span="18">{{scope.row.isable}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" style="text-align: right;">备注：</el-col>
              <el-col :span="18">{{scope.row.remark}}</el-col>
            </el-row>
          </el-popover>
          <el-button v-popover:resourceLookPopover type="text" size="small">查看</el-button>
          <el-button @click="updateResource(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delResource(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="resourceFilter.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="resourceFilter.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal">
    </el-pagination>
    <!--资源dialog-->
    <el-dialog :title="resourceDialogTitle" :visible.sync="resourceDialogVisible" :close-on-click-modal="false">
      <el-form :model="resourceForm" :label-width="formLabelWidth">
        <el-form-item label="资源名称">
          <el-input v-model="resourceForm.rTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源地址">
          <el-input v-model="resourceForm.rUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="resourceForm.rClass"></el-input>
        </el-form-item>
        <el-form-item label="方法名">
          <el-input v-model="resourceForm.rMethod"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="resourceForm.isable" placeholder="请选择">
            <el-option
              v-for="item in dictOptions.sf"
              :key="item.dCode"
              :label="item.dTitle"
              :value="item.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="resourceForm.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="resourceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveResource">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import common from '../../utils/common'
  import api from '../../api/settings/resource'
  export default {
    data () {
      return {
        tableData: [],
        tableDataTotal: 0,
        resourceFilter: {
          rTitle: '',
          currentPage: 1,
          pageSize: 10
        },
        dictOptions: {
          sf: []
        },
        resourceForm: {
          id: null,
          rTitle: '',
          rUrl: '',
          rClass: '',
          rMethod: '',
          isable: '',
          remark: ''
        },
        resourceDialogVisible: false,
        resourceDialogTitle: '',
        formLabelWidth: '100px'
      }
    },
    created () {
      let me = this
      this.fetchData()
      // 获取下拉字典：是否可用
      common.getDictList({dClassify: 'SF'}, function (data) {
        me.dictOptions.sf = data.page.rows
      })
    },
    methods: {
      getResourceList () {
        this.fetchData()
      },
      fetchData () {
        let me = this
        api.getResourceList(this.resourceFilter, function (data) {
          me.tableData = data.page.rows
          me.tableDataTotal = data.page.total
        })
      },
      handleSizeChange (val) {
        this.resourceFilter.pageSize = val
        this.fetchData()
      },
      handleCurrentChange (val) {
        this.resourceFilter.currentPage = val
        this.fetchData()
      },
      addResource () {
        this.resourceDialogTitle = '新增资源'
        this.resourceDialogVisible = true
        this.resourceForm.id = null
        this.resourceForm.rTitle = ''
        this.resourceForm.rUrl = ''
        this.resourceForm.rClass = ''
        this.resourceForm.rMethod = ''
        this.resourceForm.isable = ''
        this.resourceForm.remark = ''
      },
      updateResource (row) {
        this.resourceDialogTitle = '修改资源'
        this.resourceDialogVisible = true
        this.resourceForm.id = row.id
        this.resourceForm.rTitle = row.rTitle
        this.resourceForm.rUrl = row.rUrl
        this.resourceForm.rClass = row.rClass
        this.resourceForm.rMethod = row.rMethod
        this.resourceForm.isable = row.isable
        this.resourceForm.remark = row.remark
      },
      saveResource () {
        let me = this
        api.saveResource(this.resourceForm, function (data) {
          me.resourceDialogVisible = false
          me.fetchData()
        })
      },
      delResource (id) {
        let me = this
        me.$confirm('你确定要删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delResource({id: id}, function (data) {
            me.fetchData()
          })
        }).catch(() => {
          me.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<style>

</style>
