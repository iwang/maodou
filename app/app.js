var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')
var wrap = require('co-express');
var app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

var MongoClient = require('mongodb').MongoClient
var db_url = 'mongodb://localhost:27017/maodou';

function vendorModelFn(req) {
  let {name, url, address } = req.body
  return {name, url, address}
}

function productModelFn(req) {
  let {name, spu, desc} = req.body
  return {name, spu, desc}
}

const insertOne = (doc_name, modelFn) => wrap(function* (req, res) {
  try {
    var db = yield MongoClient.connect(db_url);
    let model = modelFn(req)
    let r = yield db.collection(doc_name).insertOne(model)
    assert.equal(1, r.insertedCount);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(JSON.stringify({
      success: true,
      payload: {
        id: r.insertedId
      }
    }))
  } catch (e) {
    console.log(e.stack);
    res.status( 400 ).send( e );
  } finally {
    db.close();
  }
})

const find = (doc_name, filter) => wrap(function* (req, res) {
  try {
    var db = yield MongoClient.connect(db_url);
    let r = yield db.collection(doc_name).find().toArray()
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(JSON.stringify({
      success: true,
      payload: r
    }))
  } catch (e) {
    console.log(e.stack);
    res.status( 400 ).send( e );
  } finally {
    db.close();
  }
})

app.post('/api/vendor', insertOne('vendor', vendorModelFn));
app.post('/api/product', insertOne('product', productModelFn))

app.get('/api/products', find('product', {}))
app.get('/api/vendors', find('vendor', {}))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
