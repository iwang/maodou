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

  console.log(orders)

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

  function handleChange(e) {
    e.preventDefault();
  }

  const options = <Option key='aa'>Full</Option>

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem  {...formItemLayout} label='Choose Product'>
        <Select
            combobox
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            onChange={handleChange}
            >
          {options}
        </Select>
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

export default connect(mapStateToProps)(Form.create()(Order));
