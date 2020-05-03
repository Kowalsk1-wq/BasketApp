const axios = require('axios');
const jwtDecode = require('jwt-decode');
const sharp = require('sharp');

const connection = require('../../database/connection');

module.exports = {
  listAll : async (request, response) => {
    const posts = await connection('posts').select('*');

    return response.json(posts);
  },

  listWithoutMe : async (request, response) => {
    const token = request.headers['x-access-token'];
    const posts = await connection('posts').select('*');

    let decoded = await jwtDecode(token);

    let me = [];
    let friends = [];

    posts.map((el) => {
      if (el.authorId === decoded.id) {
        me.push(el);
      } else {
        friends.push(el);
      }
    });

    return response.json({
      posts: friends
    })
  },

  listMe : async (request, response) => {
    const token = request.headers['x-access-token'];
    const posts = await connection('posts').select('*');

    let decoded = await jwtDecode(token);

    let me = [];
    let friends = [];

    posts.map((el) => {
      if (el.authorId === decoded.id) {
        me.push(el);
      } else {
        friends.push(el);
      }
    });

    return response.json({
      posts: me
    })
  },

  create : async (request, response) => {
    const { data } = request.file;
    const { description } = request.body;

    const token = request.headers['x-access-token'];

    var decoded = jwtDecode(token);

    const [post] = await connection('posts').insert({
      image: data.link,
      small: 'O small será gerado no futuro ;)',
      aspectRatio: (data.width / data.height),
      description,
      deleteHash: data.deletehash,
      authorId: decoded.id
    });

    return response.json({ post });
  },

  delete : async (request, response) => {
    const { id } = request.params;

    const token = request.headers['x-access-token'];
    const decoded = jwtDecode(token);

    const [post] = await connection('posts').select('*').where({ id });

    if (post.authorId === decoded.id) {
      // Deleta a image da api do imgur
      const image = await axios({
        method: 'delete',
        url: `https://api.imgur.com/3/image/${post.deleteHash}`,
        headers: { 'Authorization' : 'Client-Id 133419daf502421' }
      });

      await connection('posts').select('*').where({ id }).delete();

      return response.json({ deleted: true });
    } else {
      return response.json({
        deleted: false,
        msg: "Operation not Permitted! -> Você não é o autor deste Post"
      });
    }

  }
};
