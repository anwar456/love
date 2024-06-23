import React from 'react'
import { Button } from 'react-bootstrap'

export default function DashboardPage({ onLogout }) {
    return (
        <div>
            <h1>DASHBOARD</h1>
            <Button onClick={onLogout} variant='danger' className='mt-3'>Logout</Button>
        </div>
    )
}
