import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../utils/theme';

function Progress({ tien_do_du_an }) {
  return (
    <div
      style={{
        background: colors.orange[100],
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: '10px 16px 20px 16px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      }}
    >
      <div style={{ fontWeight: 600, color: colors.primary, fontSize: 18 }}>TIẾN ĐỘ DỰ ÁN ({tien_do_du_an.length})</div>
    </div>
  );
}

Progress.propTypes = {
  tien_do_du_an: PropTypes.object
};

export default Progress;
