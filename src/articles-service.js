const table = 'blogful_articles';

const ArticlesService = {
  getAllArticles(db) {
    return db(table)
      .select('*');
  },
  insertArticles(db, article) {
    return db(table)
      .insert(article)
      .returning('*');
  },
  getById(db, id) {
    return db(table)
      .select('*')
      .where('id', id)
      .first();
  },
  deleteArticle(db, id) {
    return db(table)
      .where({ id })
      .delete();
  }
};

module.exports = ArticlesService;