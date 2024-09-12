describe("examples test", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    cy.getDataTestId("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTestId("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getDataTestId("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.getDataTestId("nav-examples").click();
    cy.location("pathname").should("equal", "/examples");

    cy.getDataTestId("nav-forms").click();
    cy.location("pathname").should("equal", "/forms");

    cy.getDataTestId("nav-component").click();
    cy.location("pathname").should("equal", "/component");

    cy.getDataTestId("nav-best-practices").click();
    cy.location("pathname").should("equal", "/best-practices");
  });
  it("intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.getDataTestId("post-button").click();
  });
  it.only("grudges", () => {
    cy.contains(/add some grudges/i)
    cy.getDataTestId("grudge-list").within(() => {
        cy.get("li").should("have.length", 0)
    })
    cy.getDataTestId('grudge-list-title').should('have.text', 'Add Some Grudges')

    cy.getDataTestId('grudge-title').should('not.exist')
    cy.getDataTestId("grudge-input").within(() => {
      cy.get("input").type("test")
    })
    cy.getDataTestId("add-grudge").click()
    cy.getDataTestId("grudge-list").within(() => {
        cy.get("li").should("have.length", 1)
    })

    cy.getDataTestId('grudge-list-title').should('have.text', 'Grudges')

    cy.getDataTestId("grudge-input").within(() => {
        cy.get("input").type("some grudge")
      })
      cy.getDataTestId("add-grudge").click()
    cy.getDataTestId("grudge-list").within(() => {
        cy.get("li").should("have.length", 2)
        cy.get("li").its(0).should("contains.text", "test")
    })

    cy.getDataTestId("grudge-list").within(() => {
        cy.get("li").its(0).within(() => {
            cy.get("button").click()
        })
    })
    cy.getDataTestId("grudge-list").within(() => {
        cy.get("li").should("have.length", 1)
    })

    cy.getDataTestId("clear-grudges").click()
    cy.getDataTestId("grudge-list").within(() => {
        cy.get("li").should("have.length", 0)
    })
  })
});
