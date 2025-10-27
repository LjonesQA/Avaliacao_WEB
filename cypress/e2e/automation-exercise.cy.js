import { faker } from '@faker-js/faker';
import  loginDados from '../fixtures/login.json';
const emailFaker = faker.internet.email();
const nomeFaker = faker.person.firstName();
const sobrenomeFaker = faker.person.lastName();
const senhaFaker = faker.internet.password();
const empresaFaker = faker.company.name();
const enderecoFaker = faker.location.streetAddress();
const cidadeFaker = faker.location.city();
const estadoFaker = faker.location.state();
const cepFaker = faker.location.zipCode();
const telefoneFaker = faker.phone.number('1199#####9');
const numeroCartaoFaker = faker.finance.creditCardNumber('################');



describe('Teste de login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

   
    
    it('01-Cadastrar um usuario', () => {
        cy.cadastroDadosPrincipais(nomeFaker, emailFaker);
        cy.url().should('include', '/signup');
        cy.cadastroComplemento(nomeFaker,senhaFaker,sobrenomeFaker,empresaFaker,enderecoFaker,cidadeFaker,estadoFaker,cepFaker,telefoneFaker);
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.contains(`Logged in as ${nomeFaker}`).should('be.visible');
        
    });

    it('02-Fazer login com usuario cadastrado', () => {
        cy.realizarLogin(emailFaker, senhaFaker);
        cy.url().should('eq', 'https://automationexercise.com/');
    });

    it('03-Fazer login  com email e senha incorretos', () => {
        cy.realizarLogin(loginDados.invalidos.emailTest, loginDados.invalidos.senha);
        cy.contains('Your email or password is incorrect!').should('be.visible');

    })  

    it('04-Fazer logout', () => {
        cy.realizarLogin(emailFaker, senhaFaker);
        cy.fazerLogout();
    });

    it('05-Cadastrar usuario ja existente', () => {
        cy.cadastroDadosPrincipais(nomeFaker, emailFaker);
        cy.contains('Email Address already exist!').should('be.visible');
    })
});

describe('Teste de funcionalidades do site', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('06-preenchimento do forms Contact Us', () => {
        cy.preencherFormularioContactUs(nomeFaker, emailFaker, 'Assunto de teste', 'Mensagem de teste');
    
    }) 
    
    it('08- Verificar todos os produtos e product detail page', () => {
       cy.navegarParaProdutos();
       cy.verPrimeiroProduto(); 
       cy.verificarDetalhesProduto();
    })

    it('09 - Validar a busca de produto ',() =>{
        cy.navegarParaProdutos();
        cy.buscarProduto('Tshirt');
    })

    it('10 - validar o comportamento de subscription', () => {
        cy.realizarSubscription(emailFaker);
    })

    it('15 - Verificar a finalização de compra na pagina checkout', () => {
        cy.visit('/login');
        cy.realizarLogin(emailFaker, senhaFaker)
        cy.navegarParaProdutos();
        cy.verPrimeiroProduto(); 
        cy.adicionarProdutoAoCarrinho();
        cy.irParaCarrinho();
        cy.irParaCheckout();
        cy.irParaPagamento();
        cy.realizarPagamento(nomeFaker, numeroCartaoFaker, '123', '12', '2050');
    })

    it('Deletar usuario', () => {
        cy.visit('/login');
        cy.realizarLogin(emailFaker, senhaFaker);
        cy.deletarConta();
    });    

})    


