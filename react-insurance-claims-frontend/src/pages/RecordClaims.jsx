import axios from "axios";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useState } from "react";

const RecordClaim = () => {
    const [claimDetails, setClaimDetails] = useState(null);
    const [claimIdData, setClaimIdData] = useState({
        claimId: ''
    });

    const BACKEND_HOST_BAL = window.configs.hosts.backendHostBal;

    const headers = {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            Authorization: `Bearer ${window.configs.accessToken}`,
            Accept: 'application/json'
        }
    };

    const handleClaimRecord = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BACKEND_HOST_BAL + `/storeclaims`, claimIdData, headers);
            setClaimDetails(response.data);
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
                                value={claimIdData.claimId} onChange={event => setClaimIdData({ claimId: event.target.value })} /></Col>
                        </Row>
                        <Row className="mt-2" >
                            <Col md="4" />
                            <Col md="3" className="d-flex flex-row-reverse" >
                                <Button variant="dark" onClick={handleClaimRecord}>Send Claim to Spreadsheet</Button>
                            </Col>
                        </Row>
                        {claimDetails && (
                            <div className="card">
                                <div className="card-header">
                                    Recorded Claim Details
                                </div>
                                <div className="card-body">
                                    <p><strong>Claim ID:</strong> {claimDetails[0]}</p>
                                    <p><strong>Status:</strong> {claimDetails[1]}</p>
                                    <p><strong>Customer ID:</strong> {claimDetails[2]}</p>
                                    <p><strong>Policy ID:</strong> {claimDetails[3]}</p>
                                    <p><strong>Amount:</strong> {claimDetails[4]}</p>
                                    <p><strong>Description:</strong> {claimDetails[5]}</p>
                                </div>
                            </div>
                        )}
                    </Container>
                </Col>
            </Row>
        </Container >
    );
};

export default RecordClaim;