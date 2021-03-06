<style lang="stylus" scoped>
.content {
  padding: 40px;
}

.footer {
  text-align: right;
}

.slider {
  margin: 0 20px;
  height: 100%;

  &-con {
    height: 100%;
    overflow-y: scroll;
  }

  &-head {
    color: white;
    text-align: center;
    font-size: 18px;
  }
}
</style>

<template>
  <Layout style="height: 100%">
    <Content class="content">
      <Form ref="formData" :model="formData" :rules="formValidate" :label-width="90">
        <FormItem label="采购类别" prop="categoryID">
          <Select v-model="formData.categoryID" placeholder="请选择采购类别" filterable>
            <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="采购商品">
          <Button v-show="formData.goods.length === 0" icon="ios-add" type="dashed" size="small" @click="handleAddClick">添加</Button>
          <Table v-show="formData.goods.length > 0" :data="formData.goods" :columns="goodsColumns2"></Table>
        </FormItem>
        <FormItem label="供货商" prop="supplierID">
          <Select v-model="formData.supplierID" placeholder="请选择供货商" filterable>
            <Option v-for="item in supplierListTemp" :value="item.id" :key="item.id">{{ item.supplierName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="经办人" prop="transactor">
          <Input v-model="formData.transactor" placeholder="请输入经办人姓名"></Input>
        </FormItem>
        <FormItem label="备注(选填)">
          <Input v-model="formData.remark" type="textarea" placeholder="请填写备注"></Input>
        </FormItem>
      </Form>
      <div class="footer">
        <Button type="primary" @click="handleSubmit">确 定</Button>
        <Button @click="handleReset" style="margin-left: 8px">重 置</Button>
      </div>
    </Content>
    <Sider
      breakpoint="md"
      collapsible
      reverse-arrow
      :width="650"
      :collapsed-width="78"
      v-model="isCollapsed">
      <Layout class="slider" v-show="!isCollapsed">
        <Header class="slider-head">
          <label>商品搜索：</label>
          <Input v-model="goodsQuery" clearable placeholder="请输入商品编号/名称" style="width: 250px"></Input>
        </Header>
        <Content class="slider-con">
          <Table :data="goodsListTemp" :columns="goodsColumns" :loading="listLoading" stripe></Table>
        </Content>
      </Layout>
    </Sider>
  </Layout>
</template>

<script>
import { parseSearchField } from '@/libs/util'
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import { InputNumber } from 'iview'
import { purchaseOrderAdd, goodsGet, supplierGet } from '@/api'

const formData = {
  categoryID: '',
  goods: [],
  supplierID: '',
  transactor: '',
  remark: ''
}

export default {
  name: 'purchase-add',

  data () {
    const validate = msg => (rule, value, callback) => {
      return (value).toString() === '' ? callback(new Error(msg)) : callback()
    }

    // const editRowData = this.$route.params

    return {
      // isEdit,
      isCollapsed: true,
      listLoading: false,
      // formData: editRowData ? editRowData : cloneDeep(formData),
      formData: cloneDeep(formData),
      formValidate: {
        categoryID: [
          { validator: validate('请选择采购类别'), trigger: 'change' }
        ],
        goods: [
          { validator: validate('请选择要采购的商品'), trigger: 'change' }
        ],
        supplierID: [
          { validator: validate('请选择供货商'), trigger: 'change' }
        ],
        transactor: [
          { required: true, message: '请填写经办人姓名', trigger: 'blur' }
        ]
      },
      goodsQuery: '',
      goodsList: [], // 获取所有的商品，并缓存起来
      goodsListTemp: [],
      supplierList: [], // 获取所有的供货商信息，并缓存起来
      supplierListTemp: [],
      goodsColumns: [
        {
          type: 'selection',
          width: 60
        }, {
          title: '商品编号',
          key: 'goodsNo',
          align: 'center'
        }, {
          title: '商品名称',
          key: 'goodsName',
          align: 'center'
        }, {
          title: '规格',
          key: 'spec',
          align: 'center'
        }, {
          title: '库存',
          key: 'stockQty',
          align: 'center',
          sortable: true
        }, {
          title: '采购数量',
          key: 'handle',
          align: 'center',
          width: 130,
          render: (h, { row, column, index }) => (
            <div>
              <InputNumber
                min={0}
                v-model={this.goodsListTemp[index].purchaseNum}
                on-on-change={
                  (curVal) => {
                    row = this.goodsListTemp[index]
                    curVal > 0 ? this.__addGoods(row) : this.__removeGoods(row)
                  }
                }>
              </InputNumber>
            </div>
          )
        }
      ],
      goodsColumns2: [
        {
          type: 'index',
          width: 60
        }, {
          title: '商品名称',
          key: 'goodsName',
          align: 'center'
        }, {
          title: '规格',
          key: 'spec',
          align: 'center'
        }, {
          title: '采购数量',
          key: 'purchaseNum',
          align: 'center'
        }, {
          title: '操作',
          key: 'handle',
          align: 'center',
          render: (h, { row, column, index }) => (
            <i-button class="noradius" size="small" type="error" on-click={() => this.__removeGoods(row)}>移 除</i-button>
          )
        }
      ]
    }
  },

  computed: {
    ...mapState(['categoryList'])
  },

  watch: {
    goodsQuery (newVal) {
      this.__updateGoods()
    },
    'formData.categoryID' (newVal) {
      this.formData.goods = []
      this.__updateGoods()
      this.__updateSupplier()
    }
  },

  created () {
    this.__getCategoryList()
    this.__getGoodsList()
    this.__getSupplierList()
  },

  methods: {
    handleSubmit () {
      if (this.formData.goods.length === 0) {
        return this.$Message.error('请选择要采购的商品')
      }

      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.__save(this.formData)
        } else {
          this.$Message.error('填写有误，请检查')
        }
      })
    },
    handleReset () {
      this.$refs['formData'] && this.$refs['formData'].resetFields()
    },
    handleAddClick () {
      if (this.formData.categoryID === '') {
        return this.$Message.info('请先选择采购类别')
      }
      this.isCollapsed = false
    },
    __addGoods (row) {
      row._checked = true
      if (this.formData.goods.indexOf(row) === -1) {
        this.formData.goods.push(row)
      }
    },
    __removeGoods ({ goodsNo }) {
      const curGoods = this.goodsList.find(item => item.goodsNo === goodsNo)
      curGoods._checked = false
      curGoods.purchaseNum = 0
      this.formData.goods = this.formData.goods.filter(item => item.goodsNo !== goodsNo)
    },
    // 筛选符合商品类别的商品
    __updateGoods () {
      const { categoryID } = this.formData
      const goods = this.goodsQuery
      const { goodsNo, goodsName } = parseSearchField({
        query: { goods },
        field: 'goods',
        ID: 'goodsNo',
        name: 'goodsName'
      })

      this.listLoading = true
      setTimeout(() => this.listLoading = false, 1500)

      this.goodsListTemp = this.goodsList.filter(item => {
        const hasCagegorys = categoryID === '' || item.categorys.some(v => v.id === categoryID)
        if (goodsNo === 0) {
          return hasCagegorys && item.goodsName.indexOf(goodsName) > -1
        }
        return hasCagegorys && item.goodsNo.indexOf(goodsNo) > -1
      })
    },
    // 筛除符合商品类别的供货商
    __updateSupplier () {
      const { categoryID } = this.formData
      if (categoryID === '') {
        this.supplierListTemp = this.supplierList
      } else {
        this.supplierListTemp = this.supplierList.filter(item => item.category.id === categoryID)
      }
    },
    __save (formData) {
      purchaseOrderAdd(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success('添加成功')
          this.formData = cloneDeep(formData) // 清空表单数据
          // 关闭当前标签并返回采购列表
          const { name } = this.$route
          this.$store.commit('removeTag', name)
          this.$store.commit('closePage', name)
          this.$router.replace({ name: 'purchase-list', params: { refresh: true } })
          localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList)
        }
      })
    },
    // 获取商品分类列表
    __getCategoryList () {
      if (this.categoryList.length === 0) {
        this.$store.dispatch('updateCategoryList')
      }
    },
    // 获取商品列表
    __getGoodsList () {
      this.listLoading = true
      goodsGet({ disabledPage: true }).then(result => {
        if (result.code === 50000) {
          result.data.list.forEach(item => {
            item.purchaseNum = 0 // 初始采购数量
            item._checked = false // 初始是否选中
            item._disabled = true // 初始是否禁用
          })
          this.goodsList = result.data.list
          this.listLoading = false
        }
      })
    },
    // 获取供货商列表
    __getSupplierList () {
      supplierGet().then(result => {
        if (result.code === 50000) {
          this.supplierList = result.data.list
        }
      })
    }
  }
}
</script>
