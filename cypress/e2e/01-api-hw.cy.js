import { postRequestBody, putRequestBody } from "../fixtures/test-data.json"

describe('API HW - CRUD Operations', () => {
    after(() => {
        cy.request({
            method: 'DELETE',
            url: 'https://tech-global-training.com/students/deleteAll',
        })
    })
    let studentId;

    it('Create a new user', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('baseUrl'),
            body: postRequestBody,
        }).then(response => {
            studentId = response.body.id
            console.log(JSON.stringify(response.body, null, 2))

            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

            Object.entries(postRequestBody).forEach(([key, value]) => {
                expect(response.body[key]).to.equal(value)
            })
        })
    })


    it('Retrieve a specific user-created', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
            body: postRequestBody,
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

            cy.validateResponse(response, postRequestBody)
        })
    })

    /**Make a PUT call to update ANY details of a created TechGlobal student you want to update. 
   
   - Verify that the updates made through the PUT request are accurately reflected and match the 
   corresponding user data in the Database */
    it('Update an existing user', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
            body: putRequestBody,
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

            cy.validateResponse(response, putRequestBody)
        })
    })


    it('Retrieve a specific user created to confirm the update', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

            expect(response.body.firstName).to.equal(putRequestBody.firstName)
            /// did not get this part : 
            //Validate that the information in the response body of a specific user’s GET call is matching 
            //with the values you updated, and it is reflected on the Database
        })
    })

    it('Delete the the student using DELETE', () => {

        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    })
})