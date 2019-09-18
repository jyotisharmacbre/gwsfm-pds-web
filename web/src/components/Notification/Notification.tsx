import React, { useEffect } from 'react';
import NotificationsIconImage from '@material-ui/icons/Notifications';
import { IconButton, Badge } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { IApplicationState } from '../../session/rootReducer';
import {  INotificationProps } from '../../props/AppProps';
import { getNotificationActionCreator } from '../../session/Notification/Action';

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    handleClick: () => { window.location.href = "/Notifications"; },
    getNotificationCount: () => dispatch(getNotificationActionCreator())
  }
};

const mapStateToProps = (state: IApplicationState) => {
  return {
    data: state.notificationState
  }
};

const Notification: React.FC<INotificationProps> = (props) => {

  useEffect(() => {
    props.getNotificationCount();
  }, []);

  return (
    <IconButton color="inherit" onClick={props.handleClick}>
      <Badge badgeContent="5" >
        <NotificationsIconImage id="BellIcon" name="BellIcon" color="secondary" />
        
      </Badge>
    </IconButton>
  );


}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
