import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  faCheckCircle,
  faClock,
  faExclamationTriangle,
  faUser,
  faTimes,
  faCheck,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import ProjectApprovalActivityType from '../../../enums/ProjectApprovalActivityType';

interface IProps {
  activityType: ProjectApprovalActivityType;
  approvedBy: string;
  query: string;
}

const ActivityFeed: React.FC<IProps> = props => {
  return (
    <div className="feed-block">
      {props.activityType == ProjectApprovalActivityType.UserQuery ? (
        <div className="feed-block-img feed-icon">
          <FontAwesomeIcon className="" icon={faUser} />
        </div>
      ) : (
        <div className="feed-block-img check-icon">
          <FontAwesomeIcon className="" icon={faCheck} />
        </div>
      )}
      <div className="feed-block-content">
        <h2>
          <FormattedMessage id="LABEL_APPROVED_BY" />{' '}
          <span>{props.approvedBy}</span>
        </h2>
        <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
        <p>{props.query}</p>
      </div>
    </div>
  );
};

export default ActivityFeed;
