describe("Blog app", function () {
  beforeEach(function () {
    // cy.request("POST", "http://localhost:3001/api/testing/reset");
    const testUser = {
      username: "root",
      password: "maokai",
    };
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      // ...
    });

    it("fails with wrong credentials", function () {
      // ...
    });
  });
});
