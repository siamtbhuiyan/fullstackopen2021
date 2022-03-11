describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Siam T. Bhuiyan',
      username: 'siam',
      password: 'bhuiyan'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('siam')
      cy.get('#password').type('bhuiyan')
      cy.get('#login-button').click()

      cy.contains('Siam T. Bhuiyan is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('siam')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })
})