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

describe('Courier e2e test', () => {
  const courierPageUrl = '/courier';
  const courierPageUrlPattern = new RegExp('/courier(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const courierSample = { firstName: 'Ludolphe', lastName: 'Dupuis', phone: '+33 789655', vehicle: 'Handcrafted Intuitive Keyboard' };

  let courier;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/couriers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/couriers').as('postEntityRequest');
    cy.intercept('DELETE', '/api/couriers/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (courier) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/couriers/${courier.id}`,
      }).then(() => {
        courier = undefined;
      });
    }
  });

  it('Couriers menu should load Couriers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('courier');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Courier').should('exist');
    cy.url().should('match', courierPageUrlPattern);
  });

  describe('Courier page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(courierPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Courier page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/courier/new$'));
        cy.getEntityCreateUpdateHeading('Courier');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', courierPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/couriers',
          body: courierSample,
        }).then(({ body }) => {
          courier = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/couriers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [courier],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(courierPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Courier page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('courier');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', courierPageUrlPattern);
      });

      it('edit button click should load edit Courier page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Courier');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', courierPageUrlPattern);
      });

      it('edit button click should load edit Courier page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Courier');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', courierPageUrlPattern);
      });

      it('last delete button click should delete instance of Courier', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('courier').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', courierPageUrlPattern);

        courier = undefined;
      });
    });
  });

  describe('new Courier page', () => {
    beforeEach(() => {
      cy.visit(`${courierPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Courier');
    });

    it('should create an instance of Courier', () => {
      cy.get(`[data-cy="firstName"]`).type('Maguelone').should('have.value', 'Maguelone');

      cy.get(`[data-cy="lastName"]`).type('Royer').should('have.value', 'Royer');

      cy.get(`[data-cy="phone"]`).type('0703308926').should('have.value', '0703308926');

      cy.get(`[data-cy="vehicle"]`).type('programming').should('have.value', 'programming');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        courier = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', courierPageUrlPattern);
    });
  });
});
