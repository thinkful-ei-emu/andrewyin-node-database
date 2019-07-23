require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

async function searchByProduceName(searchTerm) {
  const result = await knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ilike', `%${searchTerm}%`);

  console.log(result);
};

async function paginateProducts(page) {
  const productPerPage = 10;
  const offset = productPerPage * (page - 1);

  const result = await knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productPerPage)
    .offset(offset);
  
  console.log(result);
}

async function getProductsWithImages() {
  const result = await knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .whereNotNull('image');
  
  console.log(result);
}

searchByProduceName('holo');

paginateProducts(2);

getProductsWithImages();