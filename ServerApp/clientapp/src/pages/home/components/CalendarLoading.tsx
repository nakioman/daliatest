import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from '../styles/Calendar.module.css';

library.add(faCircleNotch);

const CalendarLoadingComponent = () => (
  <tr style={{ border: 0 }}>
    <td colSpan={7} className="text-center">
      <FontAwesomeIcon
        className={styles.loadingIcon}
        spin={true}
        size="5x"
        icon="circle-notch"
      />
    </td>
  </tr>
);

export default CalendarLoadingComponent;
