import moment from 'moment';

export const checkIsDealine = data => {
  const deadline = moment(data.ngay_het_han).diff(moment(new Date()), 'minutes');
  const isQuaHan = deadline + 1 === 0 || deadline + 1 < 0;
  return {
    deadline: deadline,
    quahan: isQuaHan,
    isComplete: data.status
  };
};

export const exportCVHetHan = data => {
  const dataTemp = data.filter(ele => {
    const deadline = moment(ele.ngay_het_han).diff(moment(new Date()), 'minutes');
    if (deadline + 1 === 0 || deadline + 1 < 0) return ele
  });

  return {
    count: dataTemp.length,
    data: dataTemp
  };
};
