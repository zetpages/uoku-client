
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import Board from 'react-trello';
const data = require('../../data/todo.json');
// const data = {
//   lanes: [
//     {
//       id: 'lane1',
//       title: 'Planned Tasks',
//       label: '2/2',
//       cards: [
//         {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
//         {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins'}
//       ]
//     },
//     {
//       id: 'lane2',
//       title: 'Completed',
//       label: '0/0',
//       cards: []
//     }
//   ]
// }

const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

export default class DashboardOverview extends Component {
  state = { boardData: { lanes: [] } }

  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    })
    this.state.eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    })
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }
  render() {
    return (
        <>
          <div className="App">
            <div className="App-header">
              <h3>React Trello</h3>
            </div>
            <div className="App-intro">
              <Button onClick={this.completeCard} style={{ margin: 5 }}>
                Complete Buy Milk
              </Button>
              <Button onClick={this.addCard} style={{ margin: 5 }}>
                Add Blocked
              </Button>
              <Board
                  editable
                  onCardAdd={this.handleCardAdd}
                  data={this.state.boardData}
                  draggable
                  onDataChange={this.shouldReceiveNewData}
                  eventBusHandle={this.setEventBus}
                  handleDragStart={handleDragStart}
                  handleDragEnd={handleDragEnd}
              />
            </div>
          </div>
          {/*<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">*/}
          {/*  <Dropdown className="btn-toolbar">*/}
          {/*    <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">*/}
          {/*      <FontAwesomeIcon icon={faPlus} className="me-2" />New Task*/}
          {/*    </Dropdown.Toggle>*/}
          {/*    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">*/}
          {/*      <Dropdown.Item className="fw-bold">*/}
          {/*        <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task*/}
          {/*      </Dropdown.Item>*/}
          {/*      <Dropdown.Item className="fw-bold">*/}
          {/*        <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files*/}
          {/*      </Dropdown.Item>*/}
          {/*      <Dropdown.Item className="fw-bold">*/}
          {/*        <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security*/}
          {/*      </Dropdown.Item>*/}

          {/*      <Dropdown.Divider />*/}

          {/*      <Dropdown.Item className="fw-bold">*/}
          {/*        <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro*/}
          {/*      </Dropdown.Item>*/}
          {/*    </Dropdown.Menu>*/}
          {/*  </Dropdown>*/}

          {/*  <ButtonGroup>*/}
          {/*    <Button variant="outline-primary" size="sm">Share</Button>*/}
          {/*    <Button variant="outline-primary" size="sm">Export</Button>*/}
          {/*  </ButtonGroup>*/}
          {/*</div>*/}

          {/*<Row className="justify-content-md-center">*/}
          {/*  <Col xs={12} className="mb-4 d-none d-sm-block">*/}
          {/*    <SalesValueWidget*/}
          {/*        title="Sales Value"*/}
          {/*        value="10,567"*/}
          {/*        percentage={10.57}*/}
          {/*    />*/}
          {/*  </Col>*/}
          {/*  <Col xs={12} className="mb-4 d-sm-none">*/}
          {/*    <SalesValueWidgetPhone*/}
          {/*        title="Sales Value"*/}
          {/*        value="10,567"*/}
          {/*        percentage={10.57}*/}
          {/*    />*/}
          {/*  </Col>*/}
          {/*  <Col xs={12} sm={6} xl={4} className="mb-4">*/}
          {/*    <CounterWidget*/}
          {/*        category="Customers"*/}
          {/*        title="345k"*/}
          {/*        period="Feb 1 - Apr 1"*/}
          {/*        percentage={18.2}*/}
          {/*        icon={faChartLine}*/}
          {/*        iconColor="shape-secondary"*/}
          {/*    />*/}
          {/*  </Col>*/}

          {/*  <Col xs={12} sm={6} xl={4} className="mb-4">*/}
          {/*    <CounterWidget*/}
          {/*        category="Revenue"*/}
          {/*        title="$43,594"*/}
          {/*        period="Feb 1 - Apr 1"*/}
          {/*        percentage={28.4}*/}
          {/*        icon={faCashRegister}*/}
          {/*        iconColor="shape-tertiary"*/}
          {/*    />*/}
          {/*  </Col>*/}

          {/*  <Col xs={12} sm={6} xl={4} className="mb-4">*/}
          {/*    <CircleChartWidget*/}
          {/*        title="Traffic Share"*/}
          {/*        data={trafficShares} />*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          {/*<Row>*/}
          {/*  <Col xs={12} xl={12} className="mb-4">*/}
          {/*    <Row>*/}
          {/*      <Col xs={12} xl={8} className="mb-4">*/}
          {/*        <Row>*/}
          {/*          <Col xs={12} className="mb-4">*/}
          {/*            <PageVisitsTable />*/}
          {/*          </Col>*/}

          {/*          <Col xs={12} lg={6} className="mb-4">*/}
          {/*            <TeamMembersWidget />*/}
          {/*          </Col>*/}

          {/*          <Col xs={12} lg={6} className="mb-4">*/}
          {/*            <ProgressTrackWidget />*/}
          {/*          </Col>*/}
          {/*        </Row>*/}
          {/*      </Col>*/}

          {/*      <Col xs={12} xl={4}>*/}
          {/*        <Row>*/}
          {/*          <Col xs={12} className="mb-4">*/}
          {/*            <BarChartWidget*/}
          {/*                title="Total orders"*/}
          {/*                value={452}*/}
          {/*                percentage={18.2}*/}
          {/*                data={totalOrders} />*/}
          {/*          </Col>*/}

          {/*          <Col xs={12} className="px-0 mb-4">*/}
          {/*            <RankingWidget />*/}
          {/*          </Col>*/}

          {/*          <Col xs={12} className="px-0">*/}
          {/*            <AcquisitionWidget />*/}
          {/*          </Col>*/}
          {/*        </Row>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </>
    );
  }
};
