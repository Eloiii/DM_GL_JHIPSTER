import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Restaurant e2e test', () => {
  const restaurantPageUrl = '/restaurant';
  const restaurantPageUrlPattern = new RegExp('/restaurant(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const restaurantSample = { name: 'lavender Nord-Pas-de-Calais', address: 'override', phone: '+33 482478' };

  let restaurant;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/restaurants+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/restaurants').as('postEntityRequest');
    cy.intercept('DELETE', '/api/restaurants/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (restaurant) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/restaurants/${restaurant.id}`,
      }).then(() => {
        restaurant = undefined;
      });
    }
  });

  it('Restaurants menu should load Restaurants page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('restaurant');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Restaurant').should('exist');
    cy.url().should('match', restaurantPageUrlPattern);
  });

  describe('Restaurant page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(restaurantPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Restaurant page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/restaurant/new$'));
        cy.getEntityCreateUpdateHeading('Restaurant');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/restaurants',
          body: restaurantSample,
        }).then(({ body }) => {
          restaurant = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/restaurants+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [restaurant],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(restaurantPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Restaurant page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('restaurant');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantPageUrlPattern);
      });

      it('edit button click should load edit Restaurant page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Restaurant');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantPageUrlPattern);
      });

      it('edit button click should load edit Restaurant page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Restaurant');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantPageUrlPattern);
      });

      it('last delete button click should delete instance of Restaurant', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('restaurant').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantPageUrlPattern);

        restaurant = undefined;
      });
    });
  });

  describe('new Restaurant page', () => {
    beforeEach(() => {
      cy.visit(`${restaurantPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Restaurant');
    });

    it('should create an instance of Restaurant', () => {
      cy.get(`[data-cy="name"]`).type('XML').should('have.value', 'XML');

      cy.get(`[data-cy="address"]`).type('lavender').should('have.value', 'lavender');

      cy.get(`[data-cy="phone"]`).type('0481105898').should('have.value', '0481105898');

      cy.get(`[data-cy="email"]`).type('Geoffroy_Aubert@hotmail.fr').should('have.value', 'Geoffroy_Aubert@hotmail.fr');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        restaurant = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', restaurantPageUrlPattern);
    });
  });
});
