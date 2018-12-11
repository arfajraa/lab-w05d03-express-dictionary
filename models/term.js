var connection = require('../db/config');

var term = {};

term.getAll = function(req, res, next) {
  connection.manyOrNone("SELECT * FROM terms;")
    .then(function(result){
      console.log('done');
      res.locals.terms = result; 
      next(); 
    })
}

term.find = function(req, res, next){
  var id = req.params.id;
  connection.oneOrNone("SELECT * FROM terms where id = $1", [id])
  .then(function(result){
    res.locals.term = result
    next();
  })
  .catch(function(error){
    console.log(error);
    next();
  })
}

term.create = function(req, res, next){
  connection.one("INSERT INTO terms (name, definition) VALUES ($1, $2) RETURNING id;",
  [req.body.name, req.body.definition])
  .then(function(result){
    res.locals.term_id = result.id;
    next();
  }).catch(function(error){
    console.log(error);
    next();
  })
}

term.delete = function(req, res, next){
  connection.none("DELETE FROM terms where id=$1;", [req.params.id])
  .then(function(){
    console.log("successful delete");
    next();
  })
  .catch(function(error){
    console.log(error);
  })
}

term.update = function(req, res, next){
    var termData = {
      name: req.body.name,
      definition: req.body.definition
    }
  
    connection.one("UPDATE terms SET name = $1, definition = $2 WHERE id = $3 RETURNING id;",
    [termData.name, termData.definition, req.params.id])
      .then(function(result) {
        res.locals.term_id = result.id;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
  }

module.exports = term;