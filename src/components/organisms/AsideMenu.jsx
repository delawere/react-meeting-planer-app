import React, { Component } from "react";
import styled from "styled-components";
import UserSchedule from "./UserSchedule";
import Popup from "./Popup";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AsideContainer = styled.aside`
  position: relative;
  flex: 1;
  margin-top: 2em;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  justify-self: self-end;
`;

const putStateToProps = state => {
  return {
    activeTasks: state.tasks
  };
};

class AsideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTasks: {}
    };
  }

  static getDerivedStateFromProps(props) {
    const { activeTasks } = props;
    return {
      activeTasks
    };
  }

  render() {
    const { activeTasks, onAfterSubmit } = this.props;
    return (
      <AsideContainer>
        <Popup onAfterSubmit={onAfterSubmit}/>
        <UserSchedule
          onClickDay={this.props.onClickDay}
          activeTasks={activeTasks}
        />
      </AsideContainer>
    );
  }
}

AsideMenu.propTypes = {
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object
};

AsideMenu = connect(putStateToProps)(AsideMenu);

export default AsideMenu;
