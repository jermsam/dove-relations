const { Service } = require('feathers-mongodb');

exports.Accounts = class Accounts extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('accounts');
    });
  }
};
