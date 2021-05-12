/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

// 2021/05/12 14:36:39 H.C. Chen 
// Breakpoint at react-msal-demo\src\utils\azureHelpers.js trace and found these values from Tony's example:
// They are from following files:
//     react-msal-demo\src\config\config.dev.js
//     react-msal-demo\src\config\config.prd.js
//     react-msal-demo\src\config\config.qas.js 
const CLIENT_ID           = "b4c29cea-96c4-4a46-85dd-42637e359167"
const AUTH_HOST_SERVER    = "https://login.microsoftonline.com"
const TENANT_ID           = "de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b"
const MICROSOFT_GRAPH_URL = "https://graph.microsoft.com/v1.0"
 
export const msalConfig = {
    auth: {
        // clientId: "Enter_the_Application_Id_Here",
        // authority: "Enter_the_Cloud_Instance_Id_HereEnter_the_Tenant_Info_Here",
        // redirectUri: "Enter_the_Redirect_Uri_Here"
        clientId: CLIENT_ID,
        authority: `${AUTH_HOST_SERVER}/${TENANT_ID}`,
        redirectUri: `${window.location.origin}`,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
// debugger; // H.C. Chen 
export const loginRequest = {
    scopes: ["User.Read"]  // original 
    // H.C. Chen 試過了，不需要。scopes: ["user.read", "user.readbasic.all"],  // from Tony's sample code react-msal-demo\src\utils\azureHelpers.js 
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    // graphMeEndpoint: "Enter_the_Graph_Endpoint_Herev1.0/me"
    graphMeEndpoint: `${MICROSOFT_GRAPH_URL}/me`
};
