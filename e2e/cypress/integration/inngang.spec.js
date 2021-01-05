describe('Overføre Omsorgsdager', () => {
    before(() => {
        cy.visit('/');
    });
    describe('Inngang', () => {
        it('Startsiden er lastet', () => {
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq('/');
            });
        });
    });
});
