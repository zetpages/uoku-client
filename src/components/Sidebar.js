
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket, faPersonBooth, faPeopleArrows, faUserPlus, faUserGraduate, faUserTie, faUserFriends, faUserAstronaut, faSuitcase, faKey, faWallet, faCreditCard, faUsers, faIdCard, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/oku-hero-logo-dark.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import NavItem from "./NavItem";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem className="sidebar-custom_nav-item" title="" link={Routes.Presentation.path} image={ReactHero} />

              <NavItem title="Аналитика" link={Routes.DashboardOverview.path} icon={faChartPie} />
              <NavItem title="Группы" icon={faUsers} link={Routes.Groups.path} />
              <NavItem title="Занятия" icon={faTable} link={Routes.Courses.path} />
              <NavItem title="Профиль" icon={faIdCard} link={Routes.ProfileSettings.path} />

              <CollapsableNavItem eventKey="finance/" title="Финансы" icon={faHandHoldingUsd} >
                <NavItem title="Все" icon={faWallet} link={Routes.AllTransactions.path} />
                <NavItem title="Абонементы" icon={faCreditCard} link={Routes.Subscriptions.path} />
              </CollapsableNavItem>

              {/* <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={faFileAlt}>
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem> */}

              {/* <NavItem external title="Plugins" link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable" target="_blank" badgeText="Pro" icon={faChartPie} /> */}
              <CollapsableNavItem eventKey="users/" title="Пользователи" icon={faUserPlus}>
                <NavItem title="Педагоги" icon={faUserTie} link={Routes.Teachers.path} />
                <NavItem title="Ученики" icon={faUserGraduate} link={Routes.Pupils.path} />
                <NavItem title="Родители" icon={faUserFriends} link={Routes.Parents.path} />
                {/* <NavItem title="Юр. лица" icon={faSuitcase} link={Routes.Legals.path} /> */}
                <NavItem title="Лиды" icon={faUserAstronaut} link={Routes.Leads.path} />
              </CollapsableNavItem>

              <NavItem title="Доступ" icon={faKey} link={Routes.Access.path} />


              <Dropdown.Divider className="my-3 border-indigo" />

              <CollapsableNavItem eventKey="documentation/" title="Документация" icon={faBook}>
                <NavItem title="Быстрый старт" link={Routes.DocsOverview.path} />
                <NavItem title="Разделы" link={Routes.DocsDownload.path} />
                <NavItem title="Для админа" link={Routes.DocsQuickStart.path} />
                <NavItem title="Для педагога" link={Routes.DocsLicense.path} />
                <NavItem title="Для родителя" link={Routes.DocsFolderStructure.path} />
              </CollapsableNavItem>


              {/*<CollapsableNavItem eventKey="components/" title="Components" icon={faBoxOpen}>*/}
              {/*  <NavItem title="Accordion" link={Routes.Accordions.path} />*/}
              {/*  <NavItem title="Alerts" link={Routes.Alerts.path} />*/}
              {/*  <NavItem title="Badges" link={Routes.Badges.path} />*/}
              {/*  <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />*/}
              {/*  <NavItem title="Buttons" link={Routes.Buttons.path} />*/}
              {/*  <NavItem title="Forms" link={Routes.Forms.path} />*/}
              {/*  <NavItem title="Modals" link={Routes.Modals.path} />*/}
              {/*  <NavItem title="Navbars" link={Routes.Navbars.path} />*/}
              {/*  <NavItem title="Navs" link={Routes.Navs.path} />*/}
              {/*  <NavItem title="Pagination" link={Routes.Pagination.path} />*/}
              {/*  <NavItem title="Popovers" link={Routes.Popovers.path} />*/}
              {/*  <NavItem title="Progress" link={Routes.Progress.path} />*/}
              {/*  <NavItem title="Tables" link={Routes.Tables.path} />*/}
              {/*  <NavItem title="Tabs" link={Routes.Tabs.path} />*/}
              {/*  <NavItem title="Toasts" link={Routes.Toasts.path} />*/}
              {/*  <NavItem title="Tooltips" link={Routes.Tooltips.path} />*/}
              {/*</CollapsableNavItem>*/}

              {/* <Button as={Link} to={Routes.Upgrade.path} variant="secondary" className="upgrade-to-pro"><FontAwesomeIcon icon={faCodeBranch} className="me-1" />OkuCRM</Button> */}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
