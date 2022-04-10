import React, {useContext, useState} from "react";
import InnerTopBar from "../components/InnerTopBar";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button, ButtonGroup, Card, Dropdown, Image, Nav, Pagination, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisH, faEye, faTrashAlt, faU} from "@fortawesome/free-solid-svg-icons";
import StudentModal from "../../components/Modals/StudentModal";
import groups from "../Groups";

const Students = observer(() => {
    const {board} = useContext(Context);
    const totalStudents = board.students.length;
    const [studentVisible, setStudentVisible] = useState(false);

    board.students.map((el) => {
        // console.log(el.groups[0].regular_classes[0].course.name);
        // console.log(el.groups[0].regular_classes[0].level.name);
        // console.log(el.groups[0].regular_classes[0].room.name);
        console.log(el)
    })

    // board.students.map((el) => {
    //     // console.log(Array.isArray(el)); // false
    //     // console.log(Array.isArray(el.groups)); // true
    //     el.groups.forEach((t) => {
    //         // console.log(Array.isArray(t));
    //         // console.log(Array.isArray(t.regular_classes)); // true
    //         t.regular_classes.forEach((k) => {
    //             console.log(k.course.name);
    //         });
    //     });
    // });


    const StudentRow = (student) => {

        const statusName = student.studentStatusId === 1 ? "Обучается"
            : student.studentStatusId === 2 ? "Пауза" :  "Завершили";

        const statusVariant = statusName === "Обучается" ? "success"
            : statusName === "Пауза" ? "warning"
                : statusName === "Завершили" ? "danger" : "primary";

        return (
            <tr>
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
                <td>
                    <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                        {student.id}
                    </Card.Link>
                </td>
                <td className="teacher_photo_td">
                    <Image src={process.env.REACT_APP_API_URL + student.img} className="rounded-circle" />
                </td>
                <td>
                  <span className="fw-normal">
                    {student.name}
                  </span>
                </td>
                <td>
                    {student.groups.map((el) =>
                        <span className="fw-normal" key={el.id}>{el.name}</span>
                    )}
                </td>
                <td>
                    {student.groups.map((t) =>
                        t.regular_classes.map((k) =>
                            <span key={k.id}>
                                <span className="fw-normal">
                                    {k.scheduleStart.substring(0,5)}-{k.scheduleEnd.substring(0,5)}
                                </span>
                                <br/>
                                <span>
                                    {k.weekDays.map((l, i) =>
                                        <span className="fw-normal inner__week-day" key={i}>
                                            {l}
                                        </span>
                                    )}
                                </span>
                            </span>
                        )
                    )}
                </td>
                <td>
                  <span className={`fw-normal text-${statusVariant}`}>
                    {statusName}
                  </span>
                </td>
                <td>
                  <span className="fw-normal">
                    {student.gender.name}
                  </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {student.subscription.name}
                    </span>
                </td>
                <td>
                  <span className="fw-normal">
                    {student.phone}
                  </span>
                    <br/>
                    <span className="fw-normal">
                    {student.email}
                  </span>
                </td>
                <td>
                    { student.teachers.length ?
                        student.teachers.map((el) =>
                            <span className="fw-normal" key={el.id}>{el.name}</span>
                        ) : <span className="fw-normal">Set teacher</span>
                    }
                </td>

                <td>
                    {student.groups.map((t) =>
                        t.regular_classes.map((k) =>
                            <span className="fw-normal" key={k.course.id}>
                                {k.course.name}
                            </span>
                        )
                    )}
                </td>

                <td>
                    {student.groups.map((t) =>
                        <span className="fw-normal" key={t.id}>
                            {t.branch.name}
                        </span>
                    )}
                </td>

                <td>
                    {student.groups.map((t) =>
                        t.regular_classes.map((k) =>
                            <span className="fw-normal" key={k.room.id}>
                                {k.room.name}
                            </span>
                        )
                    )}
                </td>

                <td>
                    {student.groups.map((t) =>
                        t.regular_classes.map((k) =>
                            <span className="fw-normal"key={k.level.id}>
                                {k.level.name}
                            </span>
                        )
                    )}
                </td>
                <td>
                  <span className="fw-normal">
                    {student.discount}%
                  </span>
                </td>
            </tr>
        );
    };

    return (
        <>
            <InnerTopBar />
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setStudentVisible(true)}
            >
                Добавить
            </Button>
            <Card border="light" className="table-wrapper table-responsive shadow-sm student__table-wrapper">
                <Card.Body className="pt-0 position-relative pb-6   ">
                    <Table hover className="user-table align-items-center">
                        <thead>
                        <tr>
                            <th className="border-bottom"><FontAwesomeIcon icon={faU} className="icon-dark ml__5px" /></th>
                            <th className="border-bottom">ID</th>
                            <th className="border-bottom">Фото</th>
                            <th className="border-bottom">ФИО</th>
                            <th className="border-bottom">Группы</th>
                            <th className="border-bottom">Расписание</th>
                            <th className="border-bottom">Статус</th>
                            <th className="border-bottom">Пол</th>
                            <th className="border-bottom">Абонемент</th>
                            <th className="border-bottom">Контакты</th>
                            <th className="border-bottom">Отв.Педагог</th>
                            <th className="border-bottom">Курсы</th>
                            <th className="border-bottom">Филиал</th>
                            <th className="border-bottom">Аудитории</th>
                            <th className="border-bottom">Уровень</th>
                            <th className="border-bottom">Cкидка</th>
                        </tr>
                        </thead>
                        <tbody>
                        {board.students.map((t, i) => <StudentRow key={i} {...t} />)}
                        </tbody>
                    </Table>
                    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between position-absolute bottom-0">
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
                            Показано <b>{totalStudents}</b> из <b>25</b> строк
                        </small>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <StudentModal show={studentVisible} onHide={() => setStudentVisible(false)}/>
        </>
    );
});

export default Students;