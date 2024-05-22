import axios from "axios";
import { Col, Container, Form, Row, Button, Table, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hosts, AccessToken } from "../constants/config";

const SubmitClaim = () => {
    const [claimData, setClaimData] = useState({
        customerId: '',
        policyId: '',
        amount: '',
        description: ''
    });
    const [claimDetails, setClaimDetails] = useState(null);

    const CHOREO_BACKEND_HOST = Hosts.choreoBackendHost;
    const NODE_BACKEND_HOST = Hosts.nodeBackendHost;

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
            // Authorization: `Bearer ${AccessToken}`,
            Accept: 'application/json'
        }
    };

    const handleClaimSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(NODE_BACKEND_HOST + '/claims', claimData, headers);
            setClaimDetails(response.data);
            setClaimData({ customerId: '', policyId: '', amount: '', description: '' });
        } catch (error) {
            console.error('There was an error submitting the claim!', error);
        }
    };

    const handleChange = (e) => {
        setClaimData({
            ...claimData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Container className="mt-5">
                        <Row>
                            <h1>Insurance Claims Submission</h1>
                            <hr/>
                        </Row>
                        <div className="card mb-4">
                            <div className="card-header">
                                Submit a New Claim
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleClaimSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="customerId" className="form-label">Customer ID</label>
                                        <input type="text" className="form-control" id="customerId" name="customerId" value={claimData.customerId} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="policyId" className="form-label">Policy ID</label>
                                        <input type="text" className="form-control" id="policyId" name="policyId" value={claimData.policyId} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                        <input type="number" className="form-control" id="amount" name="amount" value={claimData.amount} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="description" name="description" value={claimData.description} onChange={handleChange} required />
                                    </div>
                                    <Button type="submit" variant="dark">Submit Claim</Button>
                                </form>
                            </div>
                        </div>
                        {claimDetails && (
                            <div className="card">
                                <div className="card-header">
                                    Submitted Claim Details
                                </div>
                                <div className="card-body">
                                    <Alert variant="success">Claim submitted successfully! Make sure to note down the <b>Claim ID</b> for future reference.</Alert>
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
        </Container>
    );
};

export default SubmitClaim;