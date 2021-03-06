import React from "react";
import styled from "styled-components";
import ShowListButton from "../atoms/ShowListButton";

const List = styled.ul`
  padding: 0;
  list-style: none;
  padding-top: 22px;
`;

const ButtonsText = ["All", "Active", "Done"];

const ShowListControls = ({ hideList, activeButton }) => {
  return (
    <List>
      {ButtonsText.map(text => (
        <ShowListButton
          key={text}
          text={text}
          hideList={hideList}
          active={activeButton === text.toLowerCase() ? true : false}
        />
      ))}
    </List>
  );
};

export default ShowListControls;
