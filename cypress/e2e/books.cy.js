import { getDisplayName } from "next/dist/shared/lib/utils";

describe('Books', () => {
  let titulo = "nuevo libro (" + new Date().getTime() + ")"
  let numeroLibrosTest = 10
  it('can list, show, create, edit and delete books', () => {
    
    // list books
    cy.visit('/')
      .get('[data-cy=link-to-books]').click()
    
    for (let index = 0; index < numeroLibrosTest; index++) {
      //create books
      cy.get('[href="/libros/crear"]').click()
        .get('[data-cy=input-book-title]').type(titulo)
        .get('[data-cy=button-submit-book]').click()
        .get('[data-cy=book-list]').contains(titulo)

      // show book
      cy.get('[data-cy^=link-to-view-book-]')
        .last()
        .click()
        .get('h1').should('contain.text', titulo)
        .get('[href="/libros"]').click()

      //edit book
      cy.get('[data-cy^=link-to-edit-book-]')
        .last()
        .click()
        .get('[data-cy=input-book-title]')
        .clear()
        .type("Libro MODIFICADO ...")
        .get('[data-cy=button-submit-book]').click()
        .get('[data-cy=book-list]').contains("Libro MODIFICADO ...")

    }
    
    // Delete book
    for (let index = 0; index < numeroLibrosTest; index++) {
      cy.get('[data-cy^=link-to-delete-book-]')
        .first()
        .click()   
    }

    
  })
})