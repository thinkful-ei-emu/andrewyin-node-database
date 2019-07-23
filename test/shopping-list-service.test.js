const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List Service Object', function () {
  const testItems = [
    {
      id: 1,
      item_name: 'Tomato',
      price: '1.23',
      date_added: new Date(),
      checked: true,
      category: 'Main'
    },
    {
      id: 2,
      item_name: 'Apple',
      price: '1.23',
      date_added: new Date(),
      checked: true,
      category: 'Snack'
    },
    {
      id: 3,
      item_name: 'Spam',
      price: '1.23',
      date_added: new Date(),
      checked: true,
      category: 'Lunch'
    },
    {
      id: 4,
      item_name: 'Eggs',
      price: '1.23',
      date_added: new Date(),
      checked: true,
      category: 'Breakfast'
    }
  ];

  const db = knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL
  });
  const table = 'shopping_list';

  after(() => db.destroy());
  afterEach(() => db(table).truncate());

  context('shopping_list has data', () => {
    beforeEach(() => {
      return db(table)
        .insert(testItems);
    });

    it('getAllItems resolves all items', async () => {
      const result = await ShoppingListService.getAllItems(db);

      expect(result).to.eql(testItems);
    });

    it('findItemById finds the item with matching id', async () => {
      const id = 1;
      const testItem = testItems.find(item => item.id === id);
      const result = await ShoppingListService.findItemById(db, id);

      expect(result[0]).to.eql(testItem);
    });

    it('updateItem should update an item', async () => {
      const currId = 1;
      const newId = 5;
      const { id, ...testItem } = testItems.find(item => item.id === currId);
      const updatedItem = {
        id: newId,
        ...testItem
      };

      await ShoppingListService.updateItem(db, currId, { id: newId });
      let result = await ShoppingListService.findItemById(db, newId);

      expect(result[0]).to.eql(updatedItem);
    });

    it('deleteItem should delete an item', async () => {
      const id = 1;
      await ShoppingListService.deleteItem(db, id);
      const result = await ShoppingListService.getAllItems(db, id);
      
      expect(result).to.eql(testItems.filter(item => item.id !== id));
    });
  });

  context('shopping-list has no data', () => {
    it('getAllItems resolves to an empty array', async () => {
      const result = await ShoppingListService.getAllItems(db);

      expect(result).to.eql([]);
    });

    it('addNewItem adds new items to the table', async () => {
      await ShoppingListService.addNewItem(db, testItems[0]);
      const result = await ShoppingListService.getAllItems(db);

      expect(result[0]).to.eql(testItems[0]);
    });
  });
});