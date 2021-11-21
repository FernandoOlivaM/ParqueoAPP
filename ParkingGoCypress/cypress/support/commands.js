// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// import Amplify, { Auth } from 'aws-amplify';
// Amplify.configure({
//     Auth: {
//         mandatorySignIn: true,
//         region: "us-east-2",
//         userPoolId: Cypress.env("us-east-2_KHIgPFtfc"),
//         identityPoolId: Cypress.env("us-east-2:d9831d97-0e31-457c-8187-d6dffbac7efc"),
//         userPoolWebClientId: Cypress.env("66jkaep24smid6iod9v31clq87"),
//         oauth: {
//             domain: Cypress.env("domain"),
//             scope: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
//             redirectSignIn: Cypress.env("redirect"),
//             redirectSignOut: Cypress.env("redirect"),
//             responseType: 'code',
//             options: {
//                 AdvancedSecurityDataCollectionFlag: false
//             }
//         }
//     }
// });
// Cypress.Commands.add("login", (email, password) => {
//     return Auth.signIn(email, password)
//         .then(user => {
//             console.log('===> user', user);

//             let session = Auth.currentSession();

//             console.log('===> session', session);
//         })
//         .catch(err => console.log('===> err', err));
// })