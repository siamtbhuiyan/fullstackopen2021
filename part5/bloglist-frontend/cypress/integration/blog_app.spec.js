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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('siam')
      cy.get('#password').type('bhuiyan')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#add-blog').click()
      cy.get('#title').type('Blog created by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://somerandomurl.com')
      cy.get('#submit-blog').click()

      cy.contains('Blog created by Cypress added by Cypress')
    })
  })

  describe('Users can', function() {
    beforeEach(function() {
      cy.get('#username').type('siam')
      cy.get('#password').type('bhuiyan')
      cy.get('#login-button').click()

      cy.get('#add-blog').click()
      cy.get('#title').type('Blog created by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://somerandomurl.com')
      cy.get('#submit-blog').click()
    })

    it('Like a blog', function() {
      cy.get('.visibility-button').click()
      cy.get('.like-button').click()

      cy.contains('Likes: 1')
    })
  })
})