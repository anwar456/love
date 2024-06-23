import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post('http://192.168.107.28:8220/api/v1/public/user/login', {
                username: data.username,
                password: data.password
            });

            if (response.data) {
                localStorage.setItem('token', JSON.stringify(response.data.auth?.token));
                localStorage.setItem('logginData', JSON.stringify(response.data.user));
                window.location.href = '/dashboard';
            }
        } catch (error) {
            setLoading(false)
            console.error('Login gagal:', error.response.data.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <ContainerCustom>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='font-weight-600 mb-3'>Login Form</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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
                        <p className='my-3'>Belum punya akun ? <Link to={'/register'}>Daftar</Link></p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type='submit'>
                                {loading ? (
                                    <Spinner animation="border" size='sm'/>
                                ) : 'Login'}
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
