describe("Testing the todo items", () => {
  // setup these constants to match what TodoMVC does
  let TODO_ITEM_ONE = "Make every second count";
  let TODO_ITEM_TWO = "Invest in yourself";
  let TODO_ITEM_THREE = "Learn Cypress";

  beforeEach(() => {
    cy.visit("http://localhost:8888/#/");
  });

  it("Adds 3 list items", () => {
    cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");
  });

  it("Ensures all todo Items are rendered and text is Valid", function () {
    cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");
    // Validate that the todo items are displayed with the correct text
    cy.get(".todo-list li").eq(0).should("contain", TODO_ITEM_ONE);
    cy.get(".todo-list li").eq(1).should("contain", TODO_ITEM_TWO);
    cy.get(".todo-list li").eq(2).should("contain", TODO_ITEM_THREE);
  });
  //MARKING ITEMS AS COMPLETE ??????????
  it("Marks 'Learn Cypress' as complete", function () {
    // we are aliasing the return value of
    // our custom command 'createTodo'
    //
    // the return value is the <li> in the <ul.todos-list>
    cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
    cy.createTodo(TODO_ITEM_TWO).as("secondTodo");
    cy.createTodo(TODO_ITEM_THREE).as("thirdTodo");

    cy.get("@thirdTodo").find(".toggle").check();

    cy.get("@thirdTodo").should("have.class", "completed");

    cy.get("@firstTodo").should("not.have.class", "completed");

    cy.get("@secondTodo").should("not.have.class", "completed");
    // cy.get("@secondTodo").find(".toggle").check();
    // cy.get("@secondTodo").should("have.class", "completed");
  });

  it("Testing ‘Learn Cypress’ has been marked complete.", function () {
    // we are aliasing the return value of
    // our custom command 'createTodo'
    //
    // the return value is the <li> in the <ul.todos-list>
    cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
    cy.createTodo(TODO_ITEM_TWO).as("secondTodo");
    cy.createTodo(TODO_ITEM_THREE).as("thirdTodo");

    cy.get("@thirdTodo").find(".toggle").check();

    cy.get("@thirdTodo").should("have.class", "completed");

    // cy.get("@secondTodo").should("have.class", "completed");
  });

  // });
});

//updated lines 514, 518 , 519
////////////////////////////////////////////////////////// A SEPERATE TEST THAT COMBINES ALL REQUIREMENTS TO FOLLOW DRY METHODOLOGY ////////////////////////////////////
describe("Combines ALL the tests together ", () => {
  // setup these constants to match what TodoMVC does
  let TODO_ITEM_ONE = "Make every second count";
  let TODO_ITEM_TWO = "Invest in yourself";
  let TODO_ITEM_THREE = "Learn Cypress";

  beforeEach(() => {
    cy.visit("http://localhost:8888/#/");
  });

  it("displays items and marks 'Learn Cypress' as complete, verifies correct items are marked as complete", function () {
    // Adding todo items
    cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");

    // Validating that the todo items are displayed with the correct text
    cy.get(".todo-list li").eq(0).should("contain", TODO_ITEM_ONE);
    cy.get(".todo-list li").eq(1).should("contain", TODO_ITEM_TWO);
    cy.get(".todo-list li").eq(2).should("contain", TODO_ITEM_THREE);

    // Marking 'Learn Cypress' as complete
    cy.get(".todo-list li").eq(2).find(".toggle").check();

    // Verifying that 'Learn Cypress' is marked as completed
    cy.get(".todo-list li").eq(2).should("have.class", "completed");

    // Verifying that the first two items are not completed
    cy.get(".todo-list li").eq(0).should("not.have.class", "completed");
    cy.get(".todo-list li").eq(1).should("not.have.class", "completed");
  });
});
