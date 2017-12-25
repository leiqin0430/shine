<template>
  <section class="shine-tab-content">
    <el-form :inline="true" :model="dictFilter">
      <el-form-item label="快速查找">
        <el-input v-model="dictFilter.dTitle" placeholder="请输入字典名称或标识符"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDictList">查询</el-button>
        <el-button type="primary" @click="addDict">新增字典</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="'auto'" size="small" border stripe style="height: calc((100% - 51px) - 32px)">
      <el-table-column prop="dName" label="字典名称" width="220" header-align="center">
      </el-table-column>
      <el-table-column prop="dClassify" label="标识符" width="200" header-align="center">
      </el-table-column>
      <el-table-column prop="dTitle" label="显示值" width="220" header-align="center">
      </el-table-column>
      <el-table-column prop="dCode" label="实际值" width="150" header-align="center">
      </el-table-column>
      <el-table-column prop="isable" label="是否可用" width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-for="item in dictOptions.sf" v-if="item.dCode === scope.row.isable">{{item.dTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="150" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="updateDict(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delDict(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="dictFilter.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="dictFilter.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal">
    </el-pagination>
    <!--新增字典dialog-->
    <el-dialog title="新增字典" :visible.sync="dictDialogVisible" :close-on-click-modal="false">
      <el-form :model="dictForm" :rules="addDictRules" ref="addDictForm" :label-width="formLabelWidth">
        <!--<el-form-item label="上级字典">-->
        <!--<el-select-->
        <!--v-model="dictForm.pname"-->
        <!--filterable-->
        <!--remote-->
        <!--reserve-keyword-->
        <!--placeholder="请输入关键词"-->
        <!--:remote-method="remoteMethod"-->
        <!--:loading="loading">-->
        <!--<el-option-->
        <!--v-for="item in options4"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="字典名称" prop="dName">
          <el-input v-model="dictForm.dName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标识符" prop="dClassify">
          <el-input v-model="dictForm.dClassify" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典值">
          <span class="el-icon-circle-plus icon-addDictItem" @click.prevent="addItem"></span>
          <el-row v-for="(item, index) in dictForm.items" :key="item.value">
            <el-col :span="22">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="显示值" label-width="68px">
                    <el-input v-model="item.dTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="实际值" label-width="68px">
                    <el-input v-model="item.dCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item label="是否可用" label-width="68px">
                    <el-select v-model="item.isable" placeholder="请选择">
                      <el-option
                        v-for="i in dictOptions.sf"
                        :key="i.dCode"
                        :label="i.dTitle"
                        :value="i.dCode">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="排序" label-width="54px">
                    <el-input-number v-model="item.dOrder" controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注" label-width="68px">
                    <el-input v-model="item.remark" type="textarea" :rows="1" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2">
              <span class="el-icon-remove icon-removeDictItem" @click.prevent="removeItem(item)"></span>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dictDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDict('addDictForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改字典dialog-->
    <el-dialog title="修改字典" :visible.sync="uDictDialogVisible" :close-on-click-modal="false" width="30%">
      <el-form :model="uDictForm" :rules="updateDictRules" ref="updateDictForm" :label-width="formLabelWidth">
        <el-form-item label="字典名称">
          <el-input v-model="uDictForm.dName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="标识符">
          <el-input v-model="uDictForm.dClassify" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="显示值" prop="dTitle">
          <el-input v-model="uDictForm.dTitle"></el-input>
        </el-form-item>
        <el-form-item label="实际值" prop="dCode">
          <el-input v-model="uDictForm.dCode"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="uDictForm.dOrder" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="uDictForm.isable" placeholder="请选择">
            <el-option
              v-for="i in dictOptions.sf"
              :key="i.dCode"
              :label="i.dTitle"
              :value="i.dCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="uDictForm.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="uDictDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDict('updateDictForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import common from '../../utils/common'
  import api from '../../api/settings/dict'
  export default {
    data () {
      return {
        tableData: [],
        tableDataTotal: 0,
        dictFilter: {
          dTitle: '',
          currentPage: 1,
          pageSize: 10
        },
        dictOptions: {
          sf: this.$store.state.dictList.filter(o => o.dClassify === 'SF')
        },
        dictForm: {
          id: null,
          dName: '',
          dClassify: '',
          items: [{dCode: '', dTitle: '', dOrder: '', isable: '', remark: ''}]
        },
        addDictRules: {
          dName: [
            { required: true, message: '请输入字典名称' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ],
          dClassify: [
            { required: true, message: '请输入标识符' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符' }
          ]
        },
        dictDialogVisible: false,
        formLabelWidth: '80px',
        uDictForm: {
          id: null,
          dName: '',
          dClassify: '',
          dCode: '',
          dTitle: '',
          dOrder: '',
          isable: '',
          remark: ''
        },
        updateDictRules: {
          dTitle: [
            { required: true, message: '请输入显示值' },
            { min: 1, max: 40, message: '长度在 1 到 40 个字符' }
          ],
          dCode: [
            { required: true, message: '请输入实际值' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
          ]
        },
        uDictDialogVisible: false
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      getDictList () {
        this.fetchData()
      },
      fetchData () {
        let me = this
        common.getDictList(this.dictFilter, function (data) {
          me.tableData = data.page.rows
          me.tableDataTotal = data.page.total
        })
      },
      handleSizeChange (val) {
        this.dictFilter.pageSize = val
        this.fetchData()
      },
      handleCurrentChange (val) {
        this.dictFilter.currentPage = val
        this.fetchData()
      },
      addDict () {
        this.dictDialogVisible = true
        this.$nextTick(function () {
          this.$refs['addDictForm'].resetFields()
          this.dictForm.id = null
          this.dictForm.dName = ''
          this.dictForm.dClassify = ''
          this.dictForm.items = [{dCode: '', dTitle: '', dOrder: '', isable: '1', remark: ''}]
        })
      },
      removeItem (item) {
        let index = this.dictForm.items.indexOf(item)
        if (index !== -1) {
          this.dictForm.items.splice(index, 1)
        }
      },
      addItem () {
        this.dictForm.items.push({dCode: '', dTitle: '', dOrder: '', isable: '1', remark: ''})
      },
      saveDict (formName) {
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let arr = []
            if (formName === 'addDictForm') {
              if (this.dictForm.items.length > 0) {
                this.dictForm.items.forEach((item, index) => {
                  arr.push({
                    id: null,
                    dName: this.dictForm.dName,
                    dClassify: this.dictForm.dClassify,
                    dCode: item.dCode,
                    dTitle: item.dTitle,
                    dOrder: item.dOrder,
                    isable: item.isable,
                    remark: item.remark
                  })
                })
              } else {
                arr.push({
                  id: null,
                  dName: this.dictForm.dName,
                  dClassify: this.dictForm.dClassify,
                  dCode: '',
                  dTitle: '',
                  dOrder: '',
                  isable: '',
                  remark: ''
                })
              }
            } else {
              arr.push(this.uDictForm)
            }
            api.saveDict(arr, function (data) {
              me.dictDialogVisible = false
              me.uDictDialogVisible = false
              me.fetchData()
              // 更新store中的字典数据
              me.$store.commit('getAllDict')
            })
          } else {
            console.log('表单校验失败！')
            return false
          }
        })
      },
      updateDict (row) {
        this.uDictDialogVisible = true
        this.$nextTick(function () {
          this.$refs['updateDictForm'].resetFields()
          this.uDictForm.id = row.id
          this.uDictForm.dName = row.dName
          this.uDictForm.dClassify = row.dClassify
          this.uDictForm.dCode = row.dCode
          this.uDictForm.dTitle = row.dTitle
          this.uDictForm.dOrder = row.dOrder
          this.uDictForm.isable = row.isable
          this.uDictForm.remark = row.remark
        })
      },
      delDict (id) {
        let me = this
        me.$confirm('你确定要删除该字典吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delDict({id: id}, function (data) {
            me.fetchData()
            // 更新store中的字典数据
            me.$store.commit('getAllDict')
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
<style lang="scss" scoped>
  .icon-addDictItem {
    color: green;
    font-size: 24px;
    line-height: 32px;
    opacity: .7;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
  .icon-removeDictItem {
    color: orangered;
    font-size: 24px;
    line-height: 84px;
    margin-left: 10px;
    opacity: .7;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
</style>
