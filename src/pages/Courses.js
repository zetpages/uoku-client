import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import DemoApp from "../components/CalendarCom";
import InnerTopBar from "./components/InnerTopBar";



export default () => {
  return (
    <>
    <InnerTopBar />

      <DemoApp />
    </>
  );
};