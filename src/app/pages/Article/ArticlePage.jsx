import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import truncateText from '../../Helpers/text-helper';
import LazyImage from '../../components/LazyImage/LazyImage';
import PaginationComponent from '../../components/Pagination/Pagination';
import SearchComponent from '../../components/Search/SearchInput';

const SearchableArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const apiKey = 'b13c4cd5f35941328639865bb033213f';
    const url = `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`;

    useEffect(() => {
        let source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                setArticles(response.data.articles);
                setLoading(false);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    setError(error);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            source.cancel('Component unmounted. Cancelling request.');
        };
    }, [url]); // Only re-run the effect if url changes

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            return article.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [articles, searchTerm]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Logic to paginate filtered articles
    const indexOfLastArticle = currentPage * perPage;
    const indexOfFirstArticle = indexOfLastArticle - perPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    if (loading) {
        return <div className='text-center mt-5'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container className='mt-3'>
            <h1 className='text-center mb-3'>Technology News</h1>
            
            {/* Search input */}
            <div className="mb-3">
                <SearchComponent searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
            
            {/* Display articles */}
            <Row className='g-3'>
                {currentArticles.map((article, index) => (
                    <Col md={3} key={index}>
                        <Card className='h-100'>
                            <Card.Body>
                                <LazyImage src={article?.urlToImage} alt="article-image" className='w-100 rounded mb-3'/>
                                <h3 className='text-truncate elipsis'>{article.title}</h3>
                                <p>{truncateText(article?.description, 100)}</p>
                                <Link to={article?.url} target='_blank'>Read more</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredArticles.length / perPage)}
                    onPageChange={handlePageChange}
                />
            </div>
        </Container>
    );
};

export default SearchableArticleList;
