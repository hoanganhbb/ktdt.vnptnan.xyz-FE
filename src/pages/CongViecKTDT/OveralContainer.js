import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../utils/theme';
import { Flex } from 'antd';

function OveralContainer({ count, background = '#fee2e2', color = colors.red[800] }) {
  return (
    <Flex style={{ background, borderRadius: 12, padding: '10px', width: '100%' }} gap={10} align='center'>
      <Flex
        style={{
          background: colors.blackAlpha[100],
          borderRadius: 8,
          fontSize: 28,
          fontWeight: 600,
          color,
          width: 50,
          height: 50,
          minWidth: 50
        }}
        justify="center"
        align="center"
      >
        {count}
      </Flex>
      <div style={{ fontWeight: 600, fontSize: 16, color: '#4a4a4a' }}>Chưa hoàn thành <br></br>quá hạn</div>
    </Flex>
  );
}

OveralContainer.propTypes = {
  count: PropTypes.string
};

export default OveralContainer;
