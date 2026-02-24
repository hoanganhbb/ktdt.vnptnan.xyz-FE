import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { Button, Col, Flex, Input, Modal, Row } from 'antd';
import { BsFileEarmarkPdfFill } from 'react-icons/bs';
import { colors } from '../../utils/theme';
import { MdCloudUpload } from 'react-icons/md';
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';

function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function UploadFile({ data, refresh, onClose }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    if (!fileName) return toast.error('Vui lòng nhập tên tài liệu');
    setIsLoading(true);
    const formData = new FormData();
    formData.append('ten_tai_lieu', fileName);
    formData.append('du_an_cntt', data.id);
    formData.append('url', file);

    requestAPI
      .post(`api/duancntt/tailieu/`, formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      .then(() => {
        refresh();
      })
      .catch(e => toast.error(JSON.stringify(e)))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal open title="Cập nhật tài liệu" width={600} footer={null} onCancel={onClose}>
      <div
        style={{
          borderRadius: 10,
          background: colors.white,
          border: '1px solid #eee',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 10px'
        }}
      >
        {file ? (
          <div style={{ position: 'relative', flexDirection: 'column', padding: 8 }}>
            <Input
              placeholder="Tên tài liệu"
              style={{ border: 0, borderRadius: 0, borderBottom: '1px solid #ccc' }}
              value={fileName}
              onChange={e => setFileName(e.target.value)}
            />
            <Flex align="center" justify="space-between" style={{ padding: 5 }}>
              <div style={{ color: colors.blue[800] }}>{file.name}</div>
              <div style={{ color: colors.blue[800] }}>{getReadableFileSizeString(file.size)}</div>
            </Flex>
            <Flex justify="flex-end">
              <Button type="primary" onClick={() => handleUploadFile()} loading={isLoading}>
                Upload
              </Button>
            </Flex>
          </div>
        ) : (
          <>
            <input
              id="file"
              type="file"
              onChange={e => onFileChange(e)}
              style={{
                height: 40,
                width: 80,
                position: 'absolute',
                background: 'red',
                maxWidth: 80,
                right: 0,
                zIndex: -1
              }}
            />
            <label htmlFor="file" style={{ width: '100%' }}>
              <Flex
                style={{
                  width: '100%',
                  height: 100,
                  background: colors.gray[200],
                  borderRadius: 10,
                  border: '1px dashed #AC7872',
                  cursor: 'pointer'
                }}
                justify="center"
                align="center"
              >
                <MdCloudUpload size={50} color={colors.blue[900]} />
              </Flex>
            </label>
          </>
        )}
      </div>
      <div style={{ height: 10 }}></div>
      <Row gutter={16}>
        {data.tai_lieu.map((item, idx) => (
          <Col span={24} key={idx}>
            <Flex
              style={{ marginBottom: 10, borderBottom: `1px solid ${colors.gray[200]}`, paddingBottom: 5 }}
              align="center"
            >
              <BsFileEarmarkPdfFill size={30} color={colors.blue[800]} style={{ marginRight: 4 }} />{' '}
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.ten_tai_lieu ? item.ten_tai_lieu : 'File không có tên'}
              </a>
            </Flex>
          </Col>
        ))}
      </Row>
    </Modal>
  );
}

// UploadFile.propTypes = {}

export default UploadFile;
