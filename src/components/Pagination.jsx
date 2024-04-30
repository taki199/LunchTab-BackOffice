import React from 'react';
import { Pagination } from 'antd';

const CenteredPaginationButton = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Adjust this value based on your button's height
    marginTop: '60px',
  };

  return (
    <div style={containerStyle}>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default CenteredPaginationButton;
