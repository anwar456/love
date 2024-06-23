import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ANALYTIC_DATA from '../../Dummy/analytic-dummy';
import { Card, Container } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserRegistrationChart = () => {
    const processData = (data) => {
        const monthCounts = Array(12).fill(0);
        data.forEach(item => {
            const month = new Date(item.registered_at).getMonth();
            monthCounts[month]++;
        });
        return monthCounts;
    };

    const monthCounts = processData(ANALYTIC_DATA);

    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'User Registrations',
                data: monthCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <Container className='mt-3'>
            <h1 className='text-center mb-3'>Analytic</h1>

            <Card>
                <Card.Header className='p-3'>
                    <Card.Title>
                        User Registrations Per Month in 2024
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Bar data={data} options={options} />
                </Card.Body>
            </Card>
        </Container>
    )
};

export default UserRegistrationChart;
