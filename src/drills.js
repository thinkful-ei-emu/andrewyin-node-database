require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

async function findByName(searchTerm) {
  const result = await knexInstance
    .select('item_name', 'price', 'category')
    .from('shopping_list')
    .where('item_name', 'ilike', `%${searchTerm}%`);

  console.log(result);
  return result;
}

async function paginateList(pageNumber) {
  const itemsPerPage = 6;
  offset = itemsPerPage * (pageNumber - 1);

  const result = await knexInstance
    .select('id', 'item_name', 'price', 'category')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset);

  console.log(result);
  return result;
}

async function getItemsAfterDate(date) {
  const result = await knexInstance
    .select('id', 'item_name', 'price', 'date_added', 'category')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '${date} days'::INTERVAL`)
    )
    .orderBy([
      { column: 'date_added', order: 'DESC' }
    ]
    );

  console.log(result);
}

async function getTotalCost() {
  const result = await knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category');

  console.log(result);
}

findByName('wing');
paginateList(2);
getItemsAfterDate(1);
getTotalCost();