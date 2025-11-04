import { Carousel } from 'antd';
import React from 'react';

export default function ImageViewer({ element }) {
  const onChange = () => {
  };
  return (
    <div>
      <Carousel afterChange={onChange}>
        {element.photoyeucaubaithi &&
          element.photoyeucaubaithi.map(ele => <img key={ele.id} src={ele.url} alt=""></img>)}
      </Carousel>
    </div>
  );
}
