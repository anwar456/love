import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const AnalysisPage = () => {
    const [sentence, setSentence] = useState('');
    const [sentimentCache, setSentimentCache] = useState({});
    const [sentiment, setSentiment] = useState('');
    const [loading, setLoading] = useState(false);
    const dummyAPIEndpoint = 'https://jsonplaceholder.typicode.com/posts';

    const generateDummyData = (text) => {
        return {
            userId: 1,
            id: Math.floor(Math.random() * 1000) + 1,
            title: 'Dummy Post',
            body: text,
        };
    };

    const analyzeSentiment = async () => {
        setLoading(true);
        if (sentimentCache[sentence]) {
            setSentiment(sentimentCache[sentence]);
            setLoading(false);
            return;
        }
        try {
            const dummyData = generateDummyData(sentence);
            const response = await fetch(dummyAPIEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dummyData),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            const sentimentResult = simulateSentimentAnalysis(data);
            setSentimentCache({ ...sentimentCache, [sentence]: sentimentResult });
            setSentiment(sentimentResult);
        } catch (error) {
            console.error('Error analyzing sentiment:', error.message);
            alert('Terjadi kesalahan saat mengambil hasil sentimen.');
        } finally {
            setLoading(false);
        }
    };

    const simulateSentimentAnalysis = (data) => {
        const sentimentScore = Math.random();
        if (sentimentScore < 0.3) {
            return 'negative 😡';
        } else if (sentimentScore < 0.7) {
            return 'neutral 🙂';
        } else {
            return 'positive 😀';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        analyzeSentiment();
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Container className='mt-3'>
            <h1 className='text-center mb-3'>Analisis Sentimen</h1>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                {sentiment && (
                    <div>
                        <p className='fs-4'>Sentimen Result: {sentiment}</p>
                    </div>
                )}
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Text>Analyze Here</Card.Text>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Control
                                    type="text"
                                    value={sentence}
                                    onChange={(e) => setSentence(e.target.value)}
                                    required
                                    as={'textarea'}
                                    rows={3}
                                />
                            </Form.Group>
                            <div className='d-flex gap-1'>
                                <Button type="submit">
                                    {loading ? 'Loading...' : 'Analyze'}
                                </Button>
                                <Button type='button' variant='success' onClick={handleRefresh} className='text-white font-weight-700'>
                                    <i className="bi bi-arrow-clockwise"></i>
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default AnalysisPage;
