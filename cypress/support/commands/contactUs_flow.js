import { elements } from '../pages_elements/contactUS';
import { elements as headerElements } from '../pages_elements/header';

Cypress.Commands.add('preencherFormularioContactUs', (nome, email, assunto, mensagem) => {
    cy.get(headerElements.contactUsBotao).click();
    cy.get(elements.nome).type(nome);
    cy.get(elements.email).type(email); 
    cy.get(elements.assunto).type(assunto);
    cy.get(elements.mensagem).type(mensagem);
    cy.get(elements.botaoUploadFile).attachFile('exemplo.png')
    cy.get(elements.botaoSubmit).click();
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
}); 