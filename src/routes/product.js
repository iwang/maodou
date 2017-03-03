import React from 'react';
import { connect } from 'dva';
import styles from './product.css';
import { Input } from 'antd';
function Product() {
  return (
    <div className={styles.normal}>
       <Input placeholder="product name" />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Product);
