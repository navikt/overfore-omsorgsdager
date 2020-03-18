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
        context('Sjekker default verdier i skjema', () => {
            it('Har Ja/Nei radioknappene for "harSamfunnskritiskJobb", som ikke er merket', () => {
                cy.get('[name="harSamfunnskritiskJobb"]')
                    .parent()
                    .find('input')
                    .should('not.be.checked');
            });
        });
        describe('Har du en jobb som faller inn under samfunnskritiske funksjoner?', () => {
            context('Nei, har ikke samfunnkritisk jobb', () => {
                it('Merker "Nei" radio', () => {
                    cy.get('input[type=radio]').last().click({ force: true });
                });
                it('Viser info panel"', () => {
                    cy.get('[class="alertstripe alertstripe--info"]');
                });
            });

            context('Ja, har samfunnkritisk jobb', () => {
                it('Merker "Ja" radio', () => {
                    cy.get('input[type=radio]').first().click({ force: true });
                });
                it('Viser linken "Gå til den digitale søknaden"', () => {
                    cy.get('a[href*="/familie/sykdom-i-familien/soknad/overfore-omsorgsdager/soknad/velkommen"]')
                });
            });
        });
    });
});