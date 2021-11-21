describe("Payment test", () => {


    beforeEach(() => {
        cy.visit('http://localhost:8100/tabs/tab1');
    })

    it("Payment Test", () => {
        cy.contains("Pago de parqueos").click();
        cy.get("#place").type(8);
        cy.contains("Buscar").click();
        cy.get("#amount").type(100);
        cy.contains("Pagar").click();
        cy.url().should("include","payment");
    })
})