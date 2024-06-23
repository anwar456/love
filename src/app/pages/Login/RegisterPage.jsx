import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post('http://192.168.107.28:8220/api/v1/public/user/register/klien', {
                username: data.username,
                password: data.password,
                password: data.nama,
            });

            if (response.data) {
                window.location.href = '/login';
            }
        } catch (error) {
            setLoading(false)
            console.error('Register gagal:', error.response.data.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <ContainerCustom>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='font-weight-600 mb-3'>Register Form</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' {...register('nama', { required: true })} />
                            {errors.nama && <span className="text-danger">Name is required</span>}
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' {...register('username', { required: true })} />
                            {errors.username && <span className="text-danger">Username is required</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' {...register('password', { required: true })} />
                            {errors.password && <span className="text-danger">Password is required</span>}
                        </Form.Group>
                        <p className='my-3'>Sudah punya akun ? <Link to={'/login'}>Login</Link></p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type='submit'>
                                {loading ? (
                                    <Spinner animation="border" size='sm' />
                                ) : 'Register'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </ContainerCustom>
    );
}

const ContainerCustom = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
