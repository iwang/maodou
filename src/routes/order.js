import React, { PropTypes }from 'react'
import {connect} from 'dva'
import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function Order({
  orders,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 6,
    },
  };

  const {products, vendors} = orders

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // dispatch({
        //   type: 'products/create',
        //   payload: values
        // });
      }
    })
  }

  function productChange(value) {
    console.log(value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem  {...formItemLayout} label='Choose Product'>
        <Select
            combobox
            optionLabelProp="children"
            placeholder="Select Product"
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            onChange={productChange}
            >
          {products.map(p => <Option key={p._id} >{p.name}</Option>)}
        </Select>
      </FormItem>

      <FormItem  {...formItemLayout} label='Choose Vendor'>
        <Select
            combobox
            optionLabelProp="children"
            placeholder="Select Product"
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            onChange={productChange}
            >
          {vendors.map(p => <Option key={p._id} >{p.name}</Option>)}
        </Select>
      </FormItem>

      <FormItem {...formItemLayout} label='Purchase Price'>
        {
          getFieldDecorator('purchase_price', {
            rules: [{
              required: true, message: 'Please input purchase price',
            }, {
              pattern: /^[\d\.]+$/, message: 'Please input valid price'
            }]
          })(
            <Input />
          )
        }
      </FormItem>

      <FormItem {...formItemLayout} label='Selling Price'>
        {
          getFieldDecorator('selling_price', { 
            rules: [{
              required: true, message: 'Please input selling price',
            }, {
              pattern: /^[\d\.]+$/, message: 'Please input valid price'
            }]
          })(
            <Input />
          )
        }
      </FormItem>

      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large">Submit</Button>
      </FormItem>
    </Form>
  );
}

function mapStateToProps() {
  return {};
}

Order.propTypes = {
  orders: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({orders})=>({orders}))(Form.create()(Order));
