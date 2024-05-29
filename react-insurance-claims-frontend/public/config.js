window.configs = {
    apiUrl: '/choreo-apis/brkz/insuranceclaims/v1',
    hosts: {
        // backendHost: 'http://localhost:3000',
        backendHost: 'https://b48cc93e-fa33-4420-a155-bc653b4d46be-dev.e1-us-east-azure.choreoapis.dev/brkz/insuranceclaims/v1.0',
        // backendHostBal: 'http://localhost:8080'
        backendHostBal: 'https://b48cc93e-fa33-4420-a155-bc653b4d46be-dev.e1-us-east-azure.choreoapis.dev/brkz/demo-ballerina-store-claims-api/v1.0',
    },
    asgardeoConfig: {
        clientID: 'kijZfyncfVZsNtYR6vt4aHFM3osa',
        // clientID: 'KJsUpohw5Vi9jJYY7mTGfZrxvJ4a',
        baseUrl: 'https://api.asgardeo.io/t/viggnah',
        signInRedirectURL: 'https://14f77ed5-1da5-47fc-b623-a5fff369b50c.e1-us-east-azure.choreoapps.dev',
        // signInRedirectURL: 'http://localhost:3001',
        signOutRedirectURL: 'https://14f77ed5-1da5-47fc-b623-a5fff369b50c.e1-us-east-azure.choreoapps.dev',
        // signOutRedirectURL: 'http://localhost:3001',
        scope: ['openid', 'profile', 'groups', 'roles', 'app_roles', 'submit-claims', 'read-claims']
    },
    accessToken: ''
};
