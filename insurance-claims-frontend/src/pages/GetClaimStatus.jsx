import axios from "axios";
import { Col, Container, Form, Row, Button, Table, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hosts, AccessToken } from "../constants/config";

const GetClaimStatus = () => {
    const [claimDetails, setClaimDetails] = useState(null);
    const [claimId, setClaimId] = useState('');

    const MI_ACCT_HOST = Hosts.miAcctHost;
    const APIM_ACCT_HOST = Hosts.apimAcctHost;
    const MI_TXN_HOST = Hosts.miTxnHost;
    const APIM_TXN_HOST = Hosts.apimTxnHost;
    const CHOREO_BACKEND_HOST = Hosts.choreoBackendHost;

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
            // Authorization: `Bearer ${AccessToken}`,
            Accept: 'application/json'
        }
    };

    const handleClaimRetrieve = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(CHOREO_BACKEND_HOST + `/claims/${claimId}`, headers);
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
                    </Container>
                </Col>
            </Row>
        </Container >
    );
};

export default GetClaimStatus;