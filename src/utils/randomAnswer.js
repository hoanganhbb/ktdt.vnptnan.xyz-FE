import _ from 'lodash';

const randomAnswer = (listAnswer, idQuestion) => {
  const result = listAnswer.filter(ele => ele.cau_hoi !== idQuestion);
  const filterAnswer = _.sampleSize(result, 3);
  filterAnswer.push(listAnswer.find(ele => ele.cau_hoi === idQuestion));
  return _.shuffle(filterAnswer);
};
export default randomAnswer;
