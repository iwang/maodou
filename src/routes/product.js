import React from 'react';
import { connect } from 'dva';
import styles from './product.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;

function Product({
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

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        dispatch({
          type: 'products/create',
          payload: values
        });
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem  {...formItemLayout} label='Product Name'>
        {getFieldDecorator('name', {
          initialValue: 'productA',
          rules: [{
            required: true, message: 'Please input Product Name'
          }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label='SPU'>
        {
          getFieldDecorator('spu', {
            initialValue: 'A378944',
            rules: [{
              required: true, message: 'Please input SPU Name'
            }],
          })(
            <Input />
          )
        }
      </FormItem>
      <FormItem {...formItemLayout} label='Description'>
        {
          getFieldDecorator('desc', {})(
            <Input type='textarea' />
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

export default connect(mapStateToProps)(Form.create()(Product));
