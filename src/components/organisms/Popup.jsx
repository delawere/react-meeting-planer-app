import React, { Component } from "react";
import fire from "../../config/Fire";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";

import PopupListItem from "../molecules/PopupListItem";
import AddForm from "../molecules/AddForm";
import DeleteAllTasksButton from "../atoms/DeleteAllTasksButton";

const Wrapper = styled.div`
  position: fixed;
  height: 80%;
  width: 60vw;
  z-index: 999;
  top: 8%;
  left: 25vw;
  background: #fff;
  color: #242425;
`;

const PopupContainer = styled.div`
  width: 80%;
  max-width: 950px;
  background-color: inherit;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: auto;
  margin-top: 50px;
  padding: 40px 15px;
  padding-top: 0;
`;

const PopupHeader = styled.header`
  width: 100%;
  padding: 20px 0;
  font-size: 1.8rem;
  font-weight: 450;
`;

const database = fire.database();
const userId = localStorage.getItem("user");

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullDate: "",
      date: "",
      activeTask: [],
      doneTask: [],
      removeList: []
    };
  }

  static getDerivedStateFromProps(props) {
    const activeTasksArray = [];
    const doneTasksArray = [];

    if (typeof props.tasks.activeTasks === "object") {
      for (let key in props.tasks.activeTasks) {
        activeTasksArray.push({
          key: key,
          text: props.tasks.activeTasks[key]
        });
      }
    } else {
      props.tasks.activeTasks && activeTasksArray.push(props.tasks.activeTasks);
    }

    if (typeof props.tasks.doneTasks === "object") {
      for (let key in props.tasks.doneTasks) {
        doneTasksArray.push({
          key: key,
          text: props.tasks.doneTasks[key]
        });
      }
    } else {
      props.tasks.doneTasks && doneTasksArray.push(props.tasks.doneTasks);
    }

    return {
      fullDate: props.date,
      date: moment(props.tasks.date).format("D MMMM"),
      activeTask: activeTasksArray,
      doneTask: doneTasksArray
    };
  }

  refreshDataSet = newTask => {
    debugger;
    const { key, task } = newTask;
    const currentTasks = this.state.activeTask;
    currentTasks.push({
      key,
      text: task
    });
    this.setState({
      activeTask: currentTasks
    });
    this.props.onAfterSubmit();
  };

  removeTask = key => {
    try {
      const currentDate = moment(this.props.tasks.date).format("MM-DD-YYYY");
      database
        .ref(`users/${userId}/tasks/active/${currentDate}/${key}`)
        .remove();
      const removedElemIndex = this.state.activeTask.findIndex(
        task => task.key === key
      );
      const currentTasks = this.state.activeTask;
      currentTasks.splice(removedElemIndex, 1);
      this.setState({
        activeTask: currentTasks
      });
      this.props.onAfterSubmit();
    } catch (e) {
      console.error(`Task doesn't remove. Error: ${e}`);
    }
  };

  addTaskToRemoveGroup = (key, checked) => {
    const { removeList } = this.state;

    if (checked) {
      removeList.push(key);
    } else {
      const removedElemIndex = this.state.removeList.findIndex(
        taskKey => taskKey === key
      );
      removeList.splice(removedElemIndex, 1);
    }

    this.setState({
      removeList
    });
  };

  deleteMarkedTasks = () => {
    if (this.state.removeList.length > 0) {
      this.state.removeList.forEach(taskKey => this.removeTask(taskKey));
    }
  };

  moveTaskToDone = async (taskKey, text) => {
    try {
      const currentDate = moment(this.props.tasks.date).format("MM-DD-YYYY");
      const dayRef = database
        .ref(`users/${userId}/tasks/done`)
        .child(currentDate);
      const newTaskKey = dayRef.push().key;
      const update = {};
      update[newTaskKey] = text;
      await dayRef.update(update).then(() => this.removeTask(taskKey));
    } catch (error) {
      console.error(`Move failed. Error: ${error}`);
    }
  };

  render() {
    return (
      <Wrapper>
        <span>{this.props.tasks === "String" ? this.props.tasks : null}</span>
        <PopupContainer>
          <PopupHeader>
            {moment(this.props.tasks.date).format("D MMMM")}
          </PopupHeader>
          <DeleteAllTasksButton
            deleteMarkedTasks={this.deleteMarkedTasks}
            visible={this.state.removeList.length > 0}
          />
          <fieldset>
            <legend>Active</legend>
            {this.state.activeTask.map(({ text, key }) => (
              <PopupListItem
                text={text}
                key={key}
                taskKey={key}
                onRemove={this.removeTask}
                addTaskToRemoveGroup={this.addTaskToRemoveGroup}
                moveTaskToDone={this.moveTaskToDone}
              />
            ))}
          </fieldset>
          <fieldset>
            <legend>Done</legend>
            {this.state.doneTask.map(({ text, key }) => (
              <PopupListItem text={text} key={key} taskKey={key} />
            ))}
          </fieldset>
          <AddForm
            date={moment(this.props.tasks.date).format("MM-DD-YYYY")}
            refreshDataSet={this.refreshDataSet}
          />
        </PopupContainer>
      </Wrapper>
    );
  }
}

Popup.propTypes = {
  closePopup: PropTypes.func,
  onAfterSubmit: PropTypes.func
};

export default Popup;
