<!--<template>-->
  <!--<el-tree-->
    <!--:data="data4"-->
    <!--:props="defaultProps"-->
    <!--show-checkbox-->
    <!--node-key="id"-->
    <!--default-expand-all-->
    <!--:expand-on-click-node="false"-->
    <!--:render-content="renderContent">-->
  <!--</el-tree>-->
<!--</template>-->

<!--<script>-->
  <!--let id = 1000-->

  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--data4: [{-->
          <!--id: 1,-->
          <!--label: '一级 1',-->
          <!--children: [{-->
            <!--id: 4,-->
            <!--label: '二级 1-1',-->
            <!--children: [{-->
              <!--id: 9,-->
              <!--label: '三级 1-1-1'-->
            <!--}, {-->
              <!--id: 10,-->
              <!--label: '三级 1-1-2'-->
            <!--}]-->
          <!--}]-->
        <!--}, {-->
          <!--id: 2,-->
          <!--label: '一级 2',-->
          <!--children: [{-->
            <!--id: 5,-->
            <!--label: '二级 2-1'-->
          <!--}, {-->
            <!--id: 6,-->
            <!--label: '二级 2-2'-->
          <!--}]-->
        <!--}, {-->
          <!--id: 3,-->
          <!--label: '一级 3',-->
          <!--children: [{-->
            <!--id: 7,-->
            <!--label: '二级 3-1'-->
          <!--}, {-->
            <!--id: 8,-->
            <!--label: '二级 3-2'-->
          <!--}]-->
        <!--}],-->
        <!--defaultProps: {-->
          <!--children: 'children',-->
          <!--label: 'label'-->
        <!--}-->
      <!--}-->
    <!--},-->

    <!--methods: {-->
      <!--append (data) {-->
        <!--const newChild = { id: id++, label: 'testtest', children: [] }-->
        <!--if (!data.children) {-->
          <!--this.$set(data, 'children', [])-->
        <!--}-->
        <!--data.children.push(newChild)-->
      <!--},-->

      <!--remove (node, data) {-->
        <!--const parent = node.parent-->
        <!--const children = parent.data.children || parent.data-->
        <!--const index = children.findIndex(d => d.id === data.id)-->
        <!--children.splice(index, 1)-->
      <!--},-->

      <!--renderContent (h, { node, data, store }) {-->
        <!--console.log(h)-->
        <!--return (-->
          <!--'<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">' +-->
          <!--'<span>' +-->
          <!--'<span>{node.label}</span>' +-->
          <!--'</span>' +-->
          <!--'<span>' +-->
          <!--'<el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>' +-->
          <!--'<el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>' +-->
          <!--'</span>' +-->
          <!--'</span>')-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<template>
  <section>
    <el-tree :data="data"
             :props="defaultProps"
             class="menu-tree"
             node-key="id"
             default-expand-all
             @node-click="handleNodeClick"
             :expand-on-click-node="false"
             :render-content="renderContent">
    </el-tree>
    <el-switch
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="ON"
      inactive-text="OFF">
    </el-switch>
  </section>
</template>
<script>
  let id = 1000
  export default {
    data () {
      return {
        value2: true,
        data: [{
          id: 1,
          label: '一级 1',
          url: '',
          order: 1,
          visible: true,
          children: [{
            id: 4,
            label: '二级 1-1',
            url: '',
            order: 1,
            visible: true,
            children: [{
              id: 9,
              label: '三级 1-1-1',
              url: '/sys/user/info',
              order: 1,
              visible: true,
              children: []
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          url: '',
          order: 2,
          visible: true,
          children: [{
            id: 5,
            label: '二级 2-1',
            url: '/sys/user/info',
            order: 1,
            visible: false,
            children: []
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick () {
        console.log('handleNodeClick')
      },
//      renderContent (h, { node, data, store }) {
//        return (
//          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
//          <span>
//          <span>{node.label}</span>
//          <span>{data.url}</span>
//          <span>{data.order}</span>
//        <el-switch
//          v-model="data.visible"
//                value="true"
//          active-color="#409eff"
//            inactive-color="#d8dce5"
//            on-click={ () => this.statusChange(data.visible)}>
//              </el-switch>
//        </span>
//        <span>
//        <el-button type="text" on-click={ () => this.append(data) }>Append</el-button>
//        <el-button type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
//        </span>
//        </span>)
//      },
      renderContent (h, { node, data, store }) {
//        let self = this
        return h('span', {'class': {operateCls: true}}, [
          h('span', node.label),
          h('span', data.url),
          h('span', data.order),
          h('el-switch', {}),
//          h('input', {domProps: {value: data.visible},
//            on: {
//              input: function (event) {
//                data.visible = event.target.value
//                this.$emit('input', event.target.value)
//              }
//            }
//          }),
          h('span', [
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  console.log('data', data)
                  console.log('node', node)
                  console.log('store', store)
                  event.stopPropagation()
                }
              }}, 'edit'),
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  store.append({id: id++, label: 'new', children: []}, data)
                  event.stopPropagation()
                }
              }}, 'add'),
            h('el-button', {attrs: {size: 'mini', type: 'text'},
              on: {
                click: function (event) {
                  store.remove(data)
                  event.stopPropagation()
                }
              }}, 'remove')
          ])
        ])
      },
      append (data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },
      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      statusChange (value) {
        console.log('switch: ' + value)
      }
    }
  }
</script>

<style lang="scss">
  .menu-tree {
    border: 1px solid #ddd;
    border-bottom: none;
  }
  .menu-tree .el-tree-node__content {
    border-bottom: 1px solid #ddd;
    height: 30px;
  }
  .operateCls {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
