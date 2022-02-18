
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faDownload, faRocket } from "@fortawesome/free-solid-svg-icons";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import LaravelLogo from "../assets/img/technologies/laravel-logo.svg";
import GitHubButton from 'react-github-btn';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";

export default (props) => {
  const currentYear = moment().get("year");
  const showSettings = props.showSettings;

  const toggleSettings = (toggle) => {
    props.toggleSettings(toggle);
  }

  return (
    <div>
      <footer className="footer section py-3">
        <Row className="text-center justify-content-center align-items-center">
          <Col xs={12} lg={6} className="mb-2 mb-lg-0">
            <p className="mb-0 text-center">
              © OkuCRM {`${currentYear} `}
              <Card.Link href="https://skilland.site" target="_blank" className="text-blue text-decoration-none fw-normal">
                Skilland
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
