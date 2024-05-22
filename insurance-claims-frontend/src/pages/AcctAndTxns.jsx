import axios from "axios";
import { Col, Container, Form, Row, Button, Table, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hosts, AccessToken } from "../constants/config";

const AcctAndTxns = () => {
    const [fetchData, setFetchData] = useState(false);
    const [acctId, setAcctId] = useState('');
    const [acctInfo, setAcctInfo] = useState({});
    const [txnInfo, setTxnInfo] = useState([]);

    const MI_ACCT_HOST = Hosts.miAcctHost;
    const APIM_ACCT_HOST = Hosts.apimAcctHost;
    const MI_TXN_HOST = Hosts.miTxnHost;
    const APIM_TXN_HOST = Hosts.apimTxnHost;

    const headers = {
        headers: { 
            // Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
            Authorization: `Bearer ${AccessToken}`, 
            Accept: 'application/json' 
        }
    };

    useEffect(() => {
        if (fetchData === false) {
            return;
        }
        axios.get(APIM_ACCT_HOST + acctId, headers).then(responseData => {
            setAcctInfo(responseData.data);
        }).catch(error => {
            if (error.response.status === 429 || error.response.status === 403 || error.response.status === 401) {
                setAcctInfo({ERROR: error.response.data});
            }
        });
        axios.get(APIM_TXN_HOST + acctId, headers).then(responseData => {
            if (responseData.data.transactions.transaction !== undefined) {
                setTxnInfo(responseData.data.transactions.transaction);
            } else {
                setTxnInfo([]);
            }
        }).catch(error => {
            if (error.response.status === 429 || error.response.status === 403 || error.response.status === 401) {
                setTxnInfo([{ERROR: error.response.data}]);
            }
        });
        setFetchData(false);
    }, [fetchData]);

    return (
        <Container>
        <Row>
            <Col>
                <Container className="mt-5">
                    <Row>
                        <h1>Personal Financial Data</h1>
                        <Alert variant="success">Data fetched for <b>Account_ID={acctId}</b> at <i>Time={new Date().toLocaleTimeString()}</i></Alert>
                    </Row>
                    <Row className="mt-2">
                        <Col md="4">Acct Id : </Col>
                        <Col md="5"><Form.Control size="sm" type="text" placeholder="Enter acct Id"
                            value={acctId} onChange={event => setAcctId(event.target.value)} /></Col>
                    </Row>
                    <Row className="mt-2" >
                        <Col md="4" />
                        <Col md="3" className="d-flex flex-row-reverse" >
                            <Button variant="dark" onClick={e => setFetchData(true)}>Fetch Data</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Container className="mt-5">
                            <Row>
                                <h1>Account Info</h1>
                            </Row>
                            <Row>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={1}>
                                            <td>{1}</td>
                                            <td>
                                                <pre>{JSON.stringify(acctInfo, null, 4)}</pre>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                        </Container>
                    </Row>
                    <Row>
                        <Container className="mt-5">
                            <Row>
                                <h1>Txn Info</h1>
                            </Row>
                            <Row>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {txnInfo.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                {item.transaction_id ? (
                                                    <>
                                                        <td>
                                                            Transaction ID:<br/>
                                                            Transaction Date:<br/>
                                                            Account ID:<br/>
                                                            Transaction Amount:<br/>
                                                            Comment:<br/>
                                                            Merchant ID:<br/>
                                                            Transaction Type:<br/>
                                                        </td>
                                                        <td>
                                                            {item.transaction_id}<br/>
                                                            {item.transaction_date}<br/>
                                                            {item.account_id}<br/>
                                                            USD {item.transaction_amount}<br/>
                                                            {item.comment}<br/>
                                                            {item.merchant_id}<br/>
                                                            {item.transaction_type}
                                                        </td>
                                                    </>
                                                ) : 
                                                    <td>
                                                        <pre>{JSON.stringify(txnInfo, null, 4)}</pre>
                                                    </td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </Col>
        </Row>
        </Container>
    );
};

export default AcctAndTxns;