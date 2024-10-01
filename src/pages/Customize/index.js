import React, { useEffect, useState } from 'react';

// import MoneyMonth from './MoneyMonth';
import HomeCustomizeWrapper from './HomeCustomizeWrapper';
import MoneyMonth from './MoneyMonth';
import GhiChep from './GhiChep';

// import PropTypes from 'prop-types'

function CustomizePage() {
  const [tabIndex, setTabIndex] = useState(2); // 1: Home, 2: Ghichep
  console.log(tabIndex, setTabIndex);

  const fetchData = async () => { };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomeCustomizeWrapper setTabIndex={setTabIndex}>
      {tabIndex === 2 && <GhiChep />}
      {tabIndex === 1 && <MoneyMonth />}
    </HomeCustomizeWrapper>
  );
}

// CustomizePage.propTypes = {}

export default CustomizePage;
