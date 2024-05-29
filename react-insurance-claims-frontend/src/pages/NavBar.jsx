import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import { useState } from 'react';

const LoginStatusBar = props => {
    const { state, signIn, signOut, getDecodedIDToken, getAccessToken } = useAuthContext();
    let authenticated = localStorage.getItem('authenticated');

    const decodedToken = async () => {
        if (state.isAuthenticated === true) {
            let token = await getDecodedIDToken();
            props.setDecodedToken(token);
            console.log("ID Token: " + JSON.stringify(token));
            localStorage.setItem('decodedId', token);
        }
    };

    const accessToken = async () => {
        if (state.isAuthenticated === true) {
            let token = await getAccessToken();
            console.log("Access Token: " + token);
            localStorage.setItem('accessToken', token);
        }
    };

    if (authenticated != null
        || state?.isAuthenticated === true) {
        if (authenticated == null) {
            console.log("State: " + JSON.stringify(state));
            localStorage.setItem('authenticated', true);
            localStorage.setItem('userName', state.username); // Asgardeo, IS
            // localStorage.setItem('userName', state.sub); // APIM
            decodedToken();
            accessToken();
        }
        return (
            <div>
                <Navbar.Text>
                    {localStorage.getItem('userName')}
                </Navbar.Text>
                <Nav.Link onClick={() => logout(signOut)}>Logout</Nav.Link>
            </div>
        );
    } else {
        return <></>
        return <Nav.Link onClick={() => signIn()}>Login</Nav.Link>
    }
}

const logout = signOut => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('decodedId');
    localStorage.removeItem('accessToken');
    signOut();
};

const Navigation = () => {
    const [decodedToken, setDecodedToken] = useState(localStorage.getItem('decodedId'));
    const { state } = useAuthContext();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Nav.Link as={Link} to="/"><Navbar.Brand>InsuranceClaimsApp</Navbar.Brand></Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            // state?.allowedScopes?.split(' ').includes('submit-claims') &&
                            <Nav.Link as={Link} to="/submitClaim">Submit Claim</Nav.Link >
                        }
                        {
                            // state?.allowedScopes?.split(' ').includes('read-claims') &&
                            <Nav.Link as={Link} to="/getClaimStatus">Claim Status</Nav.Link >
                        }
                        {
                            // state?.allowedScopes?.split(' ').includes('record-claims') &&
                            // <Nav.Link as={Link} to="/recordClaim">Record Claim</Nav.Link >
                        }
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <LoginStatusBar setDecodedToken={setDecodedToken} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;