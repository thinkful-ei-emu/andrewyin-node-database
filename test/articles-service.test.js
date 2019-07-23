const ArticlesService = require('../src/articles-service');
const knex = require('knex');

describe('Articles service object', function () {
  let db;
  let testArticles = [
    {
      id: 1,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'First test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
    },
    {
      id: 2,
      date_published: new Date('2100-05-22T16:28:32.615Z'),
      title: 'Second test post!',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
    },
    {
      id: 3,
      date_published: new Date('1919-12-22T16:28:32.615Z'),
      title: 'Third test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
    }
  ];


  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  after(() => db.destroy());
  afterEach(() => db('blogful_articles').truncate());


  // describe('getAllArticles', () => {
  context('"blogful_articles" has data', () => {
    beforeEach(() => {
      return db
        .into('blogful_articles')
        .insert(testArticles);
    });

    it('resolves all articles from blogful_articles', async () => {
      let result = await ArticlesService.getAllArticles(db);

      expect(result).to.eql(testArticles);
    });

    it('resolves an article with matching id', async () => {
      const id = 3;
      const testArticle = testArticles.find(article => article.id === id);
      const result = await ArticlesService.getById(db, id);

      expect(result).to.eql(testArticle);
    });

    it('removes an article by id', async () => {
      const id = 3;
      await ArticlesService.deleteArticle(db, id);
      const result = await ArticlesService.getAllArticles(db);

      expect(result).to.eql(testArticles.filter(article => article.id !== id));
    });
  });

  context('"blogful_articles" has no data', () => {
    it('getAllArticles resolves an empty array', async () => {
      let result = await ArticlesService.getAllArticles(db);

      expect(result).to.eql([]);
    });

    it('insertArticle inserts an article and resolves', async () => {
      const newArticle = {
        id: 1,
        title: 'new test',
        content: 'new content',
        date_published: new Date('2020-01-01T00:00:00.000Z')
      };

      const result = await ArticlesService.insertArticles(db, newArticle);

      expect(result).to.eql([
        newArticle
      ]);
    });
  });
});