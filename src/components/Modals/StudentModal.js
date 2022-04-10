import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Row, Col, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {
    createStudent,
    fetchTeacher,
    fetchStudent,
    fetchGroup,
    fetchSubscription,
    fetchStStatus, fetchGender, fetchAdmin
} from "../../http/boardAPI";
import {observer} from "mobx-react-lite";

const StudentModal = observer(({show, onHide}) => {
    const {board} = useContext(Context);
    const [name, setName] = useState('');
    const [parentName, setParentName] = useState('');
    const [discount, setDiscount] = useState(0);
    const [phone, setPhone] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log(board.gender)

    useEffect(() => {
        fetchAdmin().then(data => board.setAdmins(data));
        fetchStudent().then(data => board.setStudents(data));
        fetchTeacher().then(data => board.setTeachers(data));
        fetchGroup().then(data => board.setGroups(data));
        fetchSubscription().then(data => board.setSubscriptions(data));
        fetchGender().then(data => board.setGender(data));
        fetchStStatus().then(data => board.setStudentStatus(data));
    }, []);



    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addStudent = () => {
        const formData = new FormData()
        formData.append('name', name);
        formData.append('parentName', parentName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('discount', `${discount}`);
        formData.append('phone', phone);
        formData.append('parentPhone', parentPhone);
        formData.append('img', file);
        formData.append('groupId', board.selectedGroup.id);
        formData.append('adminId', board.selectedAdmin.id);
        formData.append('teacherId', board.selectedTeacher.id);
        formData.append('subscriptionId', board.selectedSubs.id);
        formData.append('genderId', board.selectedGender.id);
        formData.append('studentStatusId', board.selectedStudentStatus.id);
        createStudent(formData).then(data => onHide());
    }

    // console.log(board.studentStatus);

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle >{board.selectedAdmin.name || "Admin"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.admins.map(admin =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedAdmin(admin)}
                                        key={admin.id}
                                    >
                                        {admin.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle>{board.selectedTeacher.name || "Responsible teacher"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.teachers.map(teacher =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedTeacher(teacher)}
                                        key={teacher.id}
                                    >
                                        {teacher.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle >{board.selectedSubs.name || "Subscription"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.subscriptions.map(subs =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedSubs(subs)}
                                        key={subs.id}
                                    >
                                        {subs.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>

                    <Row>
                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle>{board.selectedGroup.name || "Group"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.groups.map(group =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedGroup(group)}
                                        key={group.id}
                                    >
                                        {group.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle >{board.selectedGender.name || "Student gender"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.gender.map(gender =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedGender(gender)}
                                        key={gender.id}
                                    >
                                        {gender.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle >{board.selectedStudentStatus.name || "Student status"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.studentStatus.map(status =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedStudentStatus(status)}
                                        key={status.id}
                                    >
                                        {status.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Student name"
                    />
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Email"
                    />
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="Password"
                    />
                    <Form.Control
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Enter phone"
                        type="text"
                    />
                    <Form.Control
                        value={discount}
                        onChange={e => setDiscount(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Enter discount"
                        type="number"
                    />
                    <Form.Control
                        value={parentName}
                        onChange={e => setParentName(e.target.value)}
                        className="mt-3"
                        placeholder="Parent name"
                        type="text"
                    />
                    <Form.Control
                        value={parentPhone}
                        onChange={e => setParentPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Enter parent phone"
                        type="text"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addStudent}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default StudentModal;