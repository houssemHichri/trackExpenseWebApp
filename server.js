// native server

// import http from 'http';
//
// const server = http.createServer((req, res) => {
//   console.log('######');
// });
//
// server.listen(8080);


// express server
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
// graphql
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import bodyParser from 'body-parser';

// current api
import api from './api';

// import { matchPath } from 'react-router-dom';
import config from './config';
import serverRender from './serverRender';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// set view engine to ejs
server.set('view engine', 'ejs');
// integrate sass for style pre-processing via node-sass-middleware
server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'deploy'),
}));
// graphQL middleware
const schema = buildSchema(`
  type Query {
    hello: String
    TestQuery: Test
  }
  type Test {
    id: Int
  }
`);

const root = {
  hello: () => 'Hello world!',
  TestQuery: args => ({ id: 2222 }),
};

server.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// set public directories
server.use(express.static('deploy'));
// html host file
server.use('/api/v1/', api);

server.get('*', (req, res) => {
  // const activeRoute = routes.find(route => matchPath(req.url, route));
  res.render('index', { initialMarkup: serverRender(req) });
});

server.listen(config.port, config.host, () => {
  console.log('listen');
});
