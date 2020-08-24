import * as contentful from 'contentful';

console.log();

const client = contentful.createClient({
  space: process.env.spaceId,
  accessToken: process.env.accessToken,
});

export default client;
