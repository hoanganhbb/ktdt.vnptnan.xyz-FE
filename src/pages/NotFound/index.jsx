import { Flex } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Flex className="page_404" style={{ width: '100%', height: '100%' }} align="center" justify="center">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">{`Look like you're lost`}</h3>
                <p>the page you are looking for not avaible!</p>
                <Link to="/">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  );
}
