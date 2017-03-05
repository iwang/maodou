import React from 'react';
import { connect } from 'dva';
import styles from './product.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function Vendor({
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue
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

  //const { getFieldDecorator } = props.form;

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const data = {
      ...getFieldsValue()
    };
    dispatch({
      type: 'vendors/create',
      payload: data
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem  {...formItemLayout} label='Vendor Name'>
        {getFieldDecorator('name', {
          initialValue: 'pesudo',
          rules: [{
            required: true, message: 'Please input Vendor Name',
          }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label='Link'>
      {getFieldDecorator('url', {
        initialValue: 'http://www.baidu.com',
        rules: [{
          type: 'url', message: 'Please input valid url',
        }, {
          required: true, message: 'Please input Vendor URL',
        }],
      })(
        <Input />
      )}
      </FormItem>
      <FormItem {...formItemLayout} label='Address'>
      {getFieldDecorator('address',{
        initialValue: 'shanghai'
      })(
        <Input />
      )}
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

export default connect(mapStateToProps)(Form.create()(Vendor));
