describe('Pesquise um artigo', function() {

  //Carrega o link do blog
  beforeEach(function() {
    cy.visit('https://blogdoagi.com.br/')
  })

  //Faz pesquisa de conteúdo disponível no blog e valida resposta
  it('Deve procurar artigos com o termo "Investimentos"', function() {
    cy.get('.site-header-above-section-right > .ast-builder-layout-element')
      .click()
    cy.get('#search-field')
      .type('Investimentos{enter}')
    cy.url()
      .should('include', 's=Investimentos')
    cy.get('.page-title > span')
      .should('exist', 'contain.text', 'Investimentos')
    cy.get('#post-6313 > .ast-post-format- > .post-content > .entry-title')
      .should('exist')
  });

  //Faz pesquisa de conteúdo indisponível no blog e valida resposta
  it('Deve procurar artigos com o termo "TermoAleatorioInexistente"', function() {
    cy.get('.site-header-above-section-right > .ast-builder-layout-element')
      .click()
    cy.get('#search-field')
      .type('TermoAleatorioInexistente{enter}')
    cy.url()
      .should('include', 's=TermoAleatorioInexistente')
    cy.get('.page-title > span')
      .should('exist', 'contain.text', 'TermoAleatorioInexistente')
    cy.get('.page-content > p')
      .should('contain.text', 'Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.')
  });

  it('Deve errar o teste', function() {
    cy.get('.site-header-above-section-right > .ast-builder-layout-element')
      .click()
    cy.get('#search-field')
      .type('TermoAleatorioInexistente{enter}')
    cy.url()
      .should('include', 's=TermoAleatorio')
  })
});