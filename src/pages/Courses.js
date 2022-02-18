import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import DemoApp from "../components/CalendarCom";



export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Oku</Breadcrumb.Item>
            <Breadcrumb.Item active>Занятия</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Занятия</h4>
          <p className="mb-0">Здесь будет инграция компонента React timeline scheduler</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Поделиться</Button>
            <Button variant="outline-primary" size="sm">Экспортировать</Button>
          </ButtonGroup>
        </div>
      </div>

      <DemoApp />
    </>
  );
};