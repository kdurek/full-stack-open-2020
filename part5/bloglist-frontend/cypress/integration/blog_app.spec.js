describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "superuser",
      username: "root",
      password: "maokai",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#loginform__username").type("root");
      cy.get("#loginform__password").type("maokai");
      cy.get("#loginform__submit").click();
      cy.contains("superuser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#loginform__username").type("root");
      cy.get("#loginform__password").type("wrong");
      cy.get("#loginform__submit").click();
      cy.contains("Wrong username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)",
      );
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "root",
        password: "maokai",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(response.body),
        );
        cy.visit("http://localhost:3000");
      });
      // cy.get("#loginform__username").type("root");
      // cy.get("#loginform__password").type("maokai");
      // cy.get("#loginform__submit").click();
    });

    it("a blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#blogform__title").type("test title");
      cy.get("#blogform__author").type("test author");
      cy.get("#blogform__url").type("test url");
      cy.get("#blogform__submit").click();
      cy.contains("a new blog test title added");
    });

    describe("and a blog exist", function () {
      beforeEach(function () {
        cy.contains("create new blog").click();
        cy.get("#blogform__title").type("like test title");
        cy.get("#blogform__author").type("like test author");
        cy.get("#blogform__url").type("like test url");
        cy.get("#blogform__submit").click();
      });

      it("it can be liked", function () {
        cy.contains("show").click();
        cy.get("#bloglist").get(".blog__like").click();
        cy.contains("you liked like test title");
      });

      it("it can be deleted", function () {
        cy.contains("show").click();
        cy.get("#bloglist").get(".blog__like").click();
        cy.contains("remove").click();
        cy.contains("you deleted like test title");
      });

      it.only("blogs are ordered by likes", function () {
        cy.get("#blog__show").click();
        cy.get(':nth-child(1) > [style=""] > .blog__like').click();

        cy.contains("create new blog").click();
        cy.get("#blogform__title").type("like test title 2");
        cy.get("#blogform__author").type("like test author 2");
        cy.get("#blogform__url").type("like test url 2");
        cy.get("#blogform__submit").click();
        cy.get(":nth-child(2) > :nth-child(1) > #blog__show").click();
        cy.get(':nth-child(2) > [style=""] > .blog__like').click();
        cy.get(':nth-child(2) > [style=""] > .blog__like').click();

        cy.contains("create new blog").click();
        cy.get("#blogform__title").type("like test title 3");
        cy.get("#blogform__author").type("like test author 3");
        cy.get("#blogform__url").type("like test url 3");
        cy.get("#blogform__submit").click();
        cy.get(":nth-child(3) > :nth-child(1) > #blog__show").click();
        cy.get(':nth-child(3) > [style=""] > .blog__like').click();
        cy.get(':nth-child(3) > [style=""] > .blog__like').click();
        cy.get(':nth-child(3) > [style=""] > .blog__like').click();

        cy.get("#bloglist > :nth-child(1)").should(
          "contain.text",
          "like test title 3",
        );

        cy.get("#bloglist > :nth-child(3)").should(
          "contain.text",
          "like test title",
        );
      });
    });
  });
});
