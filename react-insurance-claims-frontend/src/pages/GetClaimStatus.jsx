import axios from "axios";
import { Col, Container, Form, Row, Button, Table, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

const GetClaimStatus = () => {
    const [claimDetails, setClaimDetails] = useState(null);
    const [claimId, setClaimId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const BACKEND_HOST = window.configs.hosts.backendHost;

    const headers = {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            Authorization: `Bearer ${window.configs.accessToken}`,
            Accept: 'application/json'
        }
    };

    const handleClaimRetrieve = async (e) => {
        e.preventDefault();
        setClaimDetails(null);
        setErrorMsg('');
        try {
            await axios.get(BACKEND_HOST + `/claims/${claimId}`, headers).then(response => {
                setClaimDetails(response.data);
            }).catch(error => {
                if (error.response.status === 429 || error.response.status === 403 || error.response.status === 401 || error.response.status === 404) {
                    setErrorMsg([{ ERROR: error.response.data }]);
                }
            });

        } catch (error) {
            console.error('There was an error retrieving the claim!', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Container className="mt-5">
                        <Row>
                            <h1>See Claim Status</h1>
                            <hr />
                        </Row>
                        <Row className="mt-2">
                            <Col md="4">Claim ID : </Col>
                            <Col md="5"><Form.Control size="sm" type="text" placeholder="Enter Claim ID"
                                value={claimId} onChange={event => setClaimId(event.target.value)} /></Col>
                        </Row>
                        <Row className="mt-2" >
                            <Col md="4" />
                            <Col md="3" className="d-flex flex-row-reverse" >
                                <Button variant="dark" onClick={handleClaimRetrieve}>See Status</Button>
                            </Col>
                        </Row>
                        {claimDetails && (
                            <div className="card">
                                <div className="card-header">
                                    Claim Details
                                </div>
                                <div className="card-body">
                                    <p><strong>Claim ID:</strong> {claimDetails.id}</p>
                                    <p><strong>Status:</strong> {claimDetails.status}</p>
                                    <p><strong>Customer ID:</strong> {claimDetails.customerId}</p>
                                    <p><strong>Policy ID:</strong> {claimDetails.policyId}</p>
                                    <p><strong>Amount:</strong> {claimDetails.amount}</p>
                                    <p><strong>Description:</strong> {claimDetails.description}</p>
                                </div>
                            </div>
                        )}
                        {errorMsg && (
                            <div className="card">
                                <div className="card-header">
                                    Claim Details
                                </div>
                                <div className="card-body">
                                    <pre>{JSON.stringify(errorMsg, null, 4)}</pre>
                                </div>
                            </div>
                        )}
                    </Container>
                </Col>
            </Row>
        </Container >
    );
};

export default GetClaimStatus;