import React from 'react';
import { UploadImageWrapper } from './styled';
import PropTypes from 'prop-types';
import { Upload } from 'react-feather';
export default function UploadImage({ id, onUpload }) {
  return (
    <UploadImageWrapper>
      <input
        className="file-input"
        type="file"
        accept="image/*"
        hidden
        id={id}
        onChange={e => {
          onUpload(e.target.files[0]);
        }}
      ></input>
      <label htmlFor={id}>
        <Upload size={20} color=" #0C356A"></Upload>
      </label>
    </UploadImageWrapper>
  );
}

UploadImage.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onUpload: PropTypes.func
};
