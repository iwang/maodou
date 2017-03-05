import React from 'react';
import { connect } from 'dva';
import styles from './product.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function Product() {
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

  return (
    <Form>
      <FormItem  {...formItemLayout} label='Product Name'>
        <Input />
      </FormItem>
      <FormItem {...formItemLayout} label='SPU'>
        <Input />
      </FormItem>
      <FormItem {...formItemLayout} label='Description'>
        <Input type='textarea' />
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

export default connect(mapStateToProps)(Product);
