
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import teachers from "../data/teachers";
import axios from "axios";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, clients, issueDate, level, teacher, scedule, status } = props;
    const statusVariant = status === "Обучается" ? "success"
      : status === "Пауза" ? "warning"
        : status === "Завершили" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {subscription}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issueDate}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {clients}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {level}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {teacher}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {scedule}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Детали
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Изменить
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Удалить
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Название</th>
              <th className="border-bottom">Начало Обучения</th>
              <th className="border-bottom">Статус</th>
              <th className="border-bottom">Клиенты</th>
              <th className="border-bottom">Уровень</th>
              <th className="border-bottom">Отв.Педагог</th>
              <th className="border-bottom">Расписание</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Назад
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Вперед
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Показано <b>{totalTransactions}</b> из <b>25</b> строк
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};



export const TeachersTable = () => {
  const totalTeachers = teachers.length;

  const TableRow = (props) => {
    const { teacherId, teacherPhoto, teacherName, teacherGender, teacherBirth, teacherContact, teacherStatus, teacherBranch } = props;
    const statusVariant = teacherStatus === "Активен" ? "success"
      : teacherStatus === "Отпуск" ? "warning"
        : teacherStatus === "Уволился" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {teacherId}
          </Card.Link>
        </td>
        <td className="teacher_photo_td">
          <Image src={teacherPhoto} className="rounded-circle" />
        </td>
        <td>
          <span className="fw-normal">
            {teacherName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {teacherGender}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {teacherBirth}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {teacherContact}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {teacherStatus}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {teacherBranch}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Детали
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Изменить
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Удалить
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Фото</th>
              <th className="border-bottom">ФИО</th>
              <th className="border-bottom">Пол</th>
              <th className="border-bottom">Дата рож.</th>
              <th className="border-bottom">Контакты</th>
              <th className="border-bottom">Статус</th>
              <th className="border-bottom">Филиалы</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => <TableRow key={`transaction-${t.teacherId}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Назад
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Вперед
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Показано <b>{totalTeachers}</b> из <b>25</b> строк
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};















export const StudentTable = () => {
    const totalTransactions = transactions.length;

    const TableRow = (props) => {
        const { invoiceNumber, subscription, clients, issueDate, level, teacher, scedule, status } = props;
        const statusVariant = status === "Обучается" ? "success"
            : status === "Пауза" ? "warning" : status === "Завершили" ? "danger" : "primary";

        const [student, setStudent] = useState([]);
        useEffect(() => {
            const getStudent = async ()  => {
                try {
                    const res = await  axios.get('http://localhost:5000/api/student');
                    console.log(res);
                    const allStudents = res.data;
                    const exaxtData = res.data[0].role;
                    console.log(exaxtData)
                    setStudent(allStudents);
                } catch (e) {
                    console.log(e);
                }
            };
            getStudent();
        }, []);


        return (
            <>
                {student.map((el)  => (
                    <tr>
                        <td>
                            <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                                {el.id}
                            </Card.Link>
                        </td>
                        <td>
                  <span className="fw-normal">
                    {el.subscription}
                  </span>
                        </td>
                        <td>
                  <span className="fw-normal">
                  </span>
                        </td>
                        <td>
                  <span className="fw-normal">
                    {el.name}
                  </span>
                        </td>
                        <td>
                  <span className={`fw-normal text-${statusVariant}`}>
                    {el.status}
                  </span>
                        </td>
                        <td>
                  <span className="fw-normal">
                    {el.password}
                  </span>
                        </td>
                        <td>
          <span className="fw-normal">
            {el.role}
          </span>
                        </td>
                        <td>
          <span className="fw-normal">
            {el.phone}
          </span>
                        </td>
                        <td>
          <span className="fw-normal">
            {el.email}
          </span>
                        </td>
                        <td>
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <FontAwesomeIcon icon={faEye} className="me-2" /> Детали
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Изменить
                                    </Dropdown.Item>
                                    <Dropdown.Item className="text-danger">
                                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Удалить
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                    <tr>
                        <th className="border-bottom">ID</th>
                        <th className="border-bottom">Название</th>
                        <th className="border-bottom">Начало Обучения</th>
                        <th className="border-bottom">Статус</th>
                        <th className="border-bottom">Клиенты</th>
                        <th className="border-bottom">Уровень</th>
                        <th className="border-bottom">Отв.Педагог</th>
                        <th className="border-bottom">Расписание</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}*/}
                    <TableRow />
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <Pagination className="mb-2 mb-lg-0">
                            <Pagination.Prev>
                                Назад
                            </Pagination.Prev>
                            <Pagination.Item active>1</Pagination.Item>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            <Pagination.Item>4</Pagination.Item>
                            <Pagination.Item>5</Pagination.Item>
                            <Pagination.Next>
                                Вперед
                            </Pagination.Next>
                        </Pagination>
                    </Nav>
                    <small className="fw-bold">
                        Показано <b>{totalTransactions}</b> из <b>25</b> строк
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};