<style lang="stylus">
</style>

<template>
  <div>
    <Modal
      :value="show"
      title="创建优惠券"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="优惠券名称" prop="couponName">
          <Input v-model="formValidate.couponName" placeholder="请输入优惠券名称"></Input>
        </FormItem>
        <FormItem label="优惠券类型" prop="couponType">
          <Select v-model="formValidate.couponType">
            <Option v-for="item in couponTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="优惠券面额">
          <InputNumber
            :max="500"
            v-model="formValidate.couponMoney"
            :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')">
          </InputNumber>
        </FormItem>
        <FormItem label="最低消费金额">
          <InputNumber
            :max="1000"
            v-model="formValidate.spendMoney"
            :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')">
          </InputNumber>
        </FormItem>
        <FormItem label="活动描述" prop="couponDes">
          <Input type="textarea" v-model="formValidate.couponDes" placeholder="如：月饼节专享"></Input>
        </FormItem>
        <FormItem label="发放数量">
          <InputNumber :min="1" v-model="formValidate.sendNum"></InputNumber>
        </FormItem>
        <FormItem label="发放时间" prop="sendTime">
          <DatePicker
            v-model="sendTime"
            @on-change="handleTimeChange1"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm"
            placeholder="请选择发放时间"
            style="width: 250px">
          </DatePicker>
        </FormItem>
        <FormItem label="活动时间" prop="validTime">
          <DatePicker
            v-model="validTime"
            @on-change="handleTimeChange2"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm"
            placeholder="请选择活动时间"
            style="width: 250px">
          </DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit">确 定</Button>
        <Button @click="handleReset" style="margin-left: 8px">重 置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import couponTypeList from './CouponType'

const formValidate = {
  couponName: '',
  couponType: '',
  couponMoney: 10,
  spendMoney: 99,
  couponDes: '',
  sendNum: 1000,
  sendStartTime: '',
  sendEndTime: '',
  validStartTime: '',
  validEndTime: ''
}

export default {
  name: 'ModalAddCoupon',

  props: {
    show: Boolean,
    categoryList: Array,
    defaultModalData: [Boolean, Object]
  },

  data () {
    const validate = msg => (rule, value, callback) => {
      return (value).toString() === '' ? callback(new Error(msg)) : callback()
    }
    const validateField = (msg, field) => (rule, value, callback) => {
      if (this[field].toString() === ',') {
        callback(new Error(msg))
      } else {
        callback()
      }
    }

    return {
      isEdit: false,
      couponTypeList,
      sendTime: null,
      validTime: null,
      formValidate,
      ruleValidate: {
        couponName: [
          { validator: validate('请填写优惠券名称'), trigger: 'blur' }
        ],
        couponType: [
          { validator: validate('请选择优惠券类型'), trigger: 'change' }
        ],
        couponDes: [
          { required: true, message: '优惠券描述不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '优惠券描述为50个字符以内', trigger: 'blur' }
        ],
        sendTime: [
          { validator: validateField('请选择发放时间', 'sendTime'), trigger: 'change' }
        ],
        validTime: [
          { validator: validateField('请选择活动时间', 'validTime'), trigger: 'change' }
        ]
      }
    }
  },

  watch: {
    defaultModalData (val) {
      if (val) {
        val = cloneDeep(val)
        this.isEdit = true // 标记为编辑模式
        this.formValidate = val
      } else {
        this.isEdit = false // 标记为新增模式
        this.formValidate = cloneDeep(formValidate)
      }
    }
  },

  methods: {
    handleTimeChange1 ([sendStartTime, sendEndTime]) {
      this.formValidate.sendStartTime = sendStartTime
      this.formValidate.sendEndTime = sendEndTime
    },
    handleTimeChange2 ([validStartTime, validEndTime]) {
      this.formValidate.validStartTime = validStartTime
      this.formValidate.validEndTime = validEndTime
    },
    handleVisibleChange (val) {
      if (!val) {
        this.$emit('update:show', false)
        this.handleReset()
      }
    },
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.$emit('on-save', this.formValidate)
        } else {
          this.$Message.error('存在不符合格式的内容, 填写有误，请检查!')
        }
      })
    },
    handleReset () {
      this.$refs['formValidate'].resetFields()
    }
  }
}
</script>
