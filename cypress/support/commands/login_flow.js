import { elements as elementLogin } from '../pages_elements/login';
import { elements as homeElements } from '../pages_elements/home';

Cypress.Commands.add('realizarLogin', (email, senha) => {
    cy.get(elementLogin.login.email).type(email);
    cy.get(elementLogin.login.senha).type(senha);
    cy.get(elementLogin.login.botaoLogin).click();
})

Cypress.Commands.add('cadastroDadosPrincipais', (nome, email) => {
    cy.get(elementLogin.cadastroNome).type(nome);
    cy.get(elementLogin.cadastroEmail).type(email);
    cy.get(elementLogin.botaoCadastro).click();
})

Cypress.Commands.add('cadastroComplemento', (nome,senha,sobrenome,empresa,endereco,cidade,estado,cep,telefone) => {
    cy.get(elementLogin.checkboxGenero).check('Mr');
    cy.get(elementLogin.cadastoSenha).type(senha);
    cy.get(elementLogin.diaDeNascimento).select('10');
    cy.get(elementLogin.mesDeNascimento).select('May');
    cy.get(elementLogin.anoDeNascimento).select('1990');
    cy.get(elementLogin.infoEndereco.primeiroNome).type(nome);
    cy.get(elementLogin.infoEndereco.sobrenome).type(sobrenome);
    cy.get(elementLogin.infoEndereco.empresa).type(empresa);
    cy.get(elementLogin.infoEndereco.rua).type(endereco);
    cy.get(elementLogin.infoEndereco.cidade).type(cidade);
    cy.get(elementLogin.infoEndereco.estado).type(estado);
    cy.get(elementLogin.infoEndereco.cep).type(cep);
    cy.get(elementLogin.infoEndereco.numeroTelefone).type(telefone);
    cy.get(elementLogin.botaoCriarConta).click();
    cy.url().should('include', '/account_created');
    cy.contains('Account Created!').should('be.visible');
    cy.get(elementLogin.botaoContinuar).click();
})

Cypress.Commands.add('deletarConta', () => {
    cy.get(elementLogin.deletarConta).click();
    cy.url().should('include', '/delete_account');
    cy.contains('Account Deleted!').should('be.visible');
    cy.get(elementLogin.botaoContinuar).click();
});

Cypress.Commands.add('fazerLogout', () => {
    cy.get(elementLogin.logout).click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('realizarSubscription', (email) => {
    cy.get(homeElements.subscriptionField).type(email);
    cy.get(homeElements.subscriptionButton).click();
    cy.get(homeElements.successSubscriptionMessage).should('be.visible');
});
