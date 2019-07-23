const table = 'shopping_list';

const ShoppingListService = {

  /**
   * 
   * @param {knex object} db 
   */
  getAllItems(db) {
    return db(table)
      .select('*');
  },
  /**
   * 
   * @param {knex object} db 
   * @param {number} id 
   */
  findItemById(db, id) {
    return db(table)
      .select('*')
      .where({ id });
  },
  /**
   * 
   * @param {knex object} db 
   * @param {object} newItem 
   */
  addNewItem(db, newItem) {
    return db(table)
      .insert(newItem);
  },
  /**
   * 
   * @param {knex object} db 
   * @param {number} id 
   */
  deleteItem(db, id) {
    return db(table)
      .where({ id })
      .delete();
  },
  /**
   * 
   * @param {knex object} db 
   * @param {number} id 
   * @param {object} newItemInfo 
   */
  updateItem(db, id, newItemInfo) {
    return db(table)
      .where({ id })
      .update(newItemInfo);
  }
};

module.exports = ShoppingListService;