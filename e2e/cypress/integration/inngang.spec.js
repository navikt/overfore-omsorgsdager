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
            it('Har Ja/Nei radioknappene for "mottakerErGyldig", som ikke er merket', () => {
                cy.get('[name="mottakerErGyldig"]')
                    .parent()
                    .find('input')
                    .should('not.be.checked');
            });
        });
        describe('Er den du skal overføre omsorgsdager til arbeidstaker, selvstendig næringsdrivende eller frilanser?', () => {
            context('Ja, skal overføre omsorgsdager', () => {
                it('Merker "Ja" radio', () => {
                    cy.get('input[type=radio]')
                        .first()
                        .click({ force: true });
                });
                it('Viser linken "Gå videre"', () => {
                    cy.get('a[href*="/familie/sykdom-i-familien/soknad/overfore-omsorgsdager/soknad/velkommen"]');
                });
            });

            context('Nei, skal ikke overføre omsorgsdager', () => {
                it('Merker "Nei" radio', () => {
                    cy.get('input[type=radio]')
                        .last()
                        .click({ force: true });
                });
                it('Viser info panel"', () => {
                    cy.get('[class="alertstripe alertstripe--advarsel"]');
                });
            });
        });
    });
});
