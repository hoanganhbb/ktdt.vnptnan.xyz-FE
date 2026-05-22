import React, { useEffect } from 'react';
import requestAPI from '../../../utils/requestAPI';

function VanbanDieuHanheOffice() {
  const fetchData = async () => {
    const response = await requestAPI.get(`api/congviec/vanbandieuhanh`);
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>VanbanDieuHanheOffice</div>;
}

export default VanbanDieuHanheOffice;
