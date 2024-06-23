import React, { useState } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import DATA_USER from '../../Dummy/user-dummy';
import DotDotIcon from '../../components/Icons/DotdotIcon';
import { nanoid } from 'nanoid';

export default function UserPage() {
    const [users, setUsers] = useState(DATA_USER);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <Container className='mt-3'>
            <h1 className='text-center mb-3'>Data User</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <Dropdown drop='down'>
                                    <Dropdown.Toggle className="bg-transparent border-0 p-0 text-body" id={`dropdown-act-${nanoid()}`}>
                                        <DotDotIcon />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className='text-danger' onClick={() => handleDelete(item.id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
