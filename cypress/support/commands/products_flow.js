import { elements } from "../pages_elements/header";
import { elements as plpElements } from "../pages_elements/PLP";
import { elements as pdpElements } from "../pages_elements/PDP";
import { elements as checkoutElements } from "../pages_elements/checkout";
import { elements as cartElements } from "../pages_elements/Cart";
Cypress.Commands.add('navegarParaProdutos', () => {
    cy.get(elements.productsBotao).click();
    cy.url().should('include', '/products');
    cy.get(plpElements.gridProdutos).should('be.visible');
})

Cypress.Commands.add('verPrimeiroProduto', () => {
    cy.get(plpElements.verPrimeiroProduto).click();
    cy.url().should('include', '/product_details/1');
});

Cypress.Commands.add('buscarProduto', (nomeProduto) => {
    cy.get(plpElements.barraBusca).type(nomeProduto);
    cy.get(plpElements.botaoBusca).click();
    cy.url().should('include', `/products?search=${nomeProduto}`);
    cy.get(plpElements.gridProdutos).should('be.visible');
});

Cypress.Commands.add('verificarDetalhesProduto', () => {
    cy.get(pdpElements.nomeProduto).should('be.visible');
    cy.get(pdpElements.categoriaProduto).should('be.visible');
    cy.get(pdpElements.condicaoProduto).should('be.visible');
    cy.get(pdpElements.disponibilidadeProduto).should('be.visible');
    cy.get(pdpElements.marcaProduto).should('be.visible');
    cy.get(pdpElements.valorProduto).should('be.visible');
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', () => {
    cy.get(pdpElements.botaoAdicionarAoCarrinho).click();
    cy.get(pdpElements.modalCart).should('be.visible');

});

Cypress.Commands.add('irParaCarrinho', () => {
    cy.get(pdpElements.irParaCart).click();
    cy.url().should('include', '/view_cart');
});

Cypress.Commands.add('irParaCheckout', () => {
    cy.get(cartElements.irProCheckout).click();
    cy.url().should('include', '/checkout');
}) 

Cypress.Commands.add('irParaPagamento', () => {
    cy.get(cartElements.placeOrder).click();
    cy.url().should('include', '/payment');
});

Cypress.Commands.add('realizarPagamento', (nomeCartao, numeroCartao, cvc, mesExpiracao, anoExpiracao) => {
    cy.get(checkoutElements.nomeCartao).type(nomeCartao);
    cy.get(checkoutElements.numeroCartao).type(numeroCartao);
    cy.get(checkoutElements.cvcCartao).type(cvc);
    cy.get(checkoutElements.mesExpiracao).type(mesExpiracao);
    cy.get(checkoutElements.anoExpiracao).type(anoExpiracao);
    cy.get(checkoutElements.botaoPagar).click();
    cy.url().should('include', '/payment_done/500');
});


