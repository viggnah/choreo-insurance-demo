import ballerina/http;
import ballerina/os;
import ballerinax/googleapis.sheets as sheets;

type ClaimIdData record {|
    string claimId;
|};

type ClaimData record {|
    string id;
    string status;
    string customerId;
    string policyId;
    float amount;
    string description;
|};

sheets:ConnectionConfig spreadsheetConfig = {
    auth: {
        clientId: os:getEnv("CLIENT_ID"),
        clientSecret: os:getEnv("CLIENT_SECRET"),
        refreshUrl: sheets:REFRESH_URL,
        refreshToken: os:getEnv("REFRESH_TOKEN")
    }
};
sheets:Client spreadsheetClient = check new (spreadsheetConfig);

listener http:Listener httpListener = new (8080);

service /storeclaims on httpListener {
    resource function post .(ClaimIdData claimIdData) returns error|http:Created {
        http:Client insuranceClaimClient = check new (os:getEnv("INSURANCE_CLAIM_API_EP"));

        ClaimData claimData = check insuranceClaimClient->/claims/[claimIdData.claimId];

        string spreadsheetId = "1X1FlQvHSo5FrbpEVW1yT3kyPw07demPtdQ0haaKyaOs";
        sheets:A1Range a1Range = {
            sheetName: "Sheet1"
        };
        string[] claimDataStrArray = claimData.toArray().'map(c => c.toString());
        string[][] values = [
            claimDataStrArray
        ];
        _ = check spreadsheetClient->appendValues(spreadsheetId, values, a1Range, "USER_ENTERED");

        return <http:Created>{ 
            body: claimDataStrArray
        };
    }
}
