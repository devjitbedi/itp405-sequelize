const express = require('express');
const bodyParser = require('body-parser');
const Playlist = require('./models/playlist');
const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const app = express();

app.use(bodyParser.json());

Artist.hasMany(Album, {
  foreignKey: 'ArtistId'
});

Album.belongsTo(Artist, {
  foreignKey: 'ArtistId'
});

Playlist.belongsToMany(Track, {
  through: 'playlist_track',
  foreignKey: 'PlaylistId',
  timestamps: false
});

Track.belongsToMany(Playlist, {
  through: 'playlist_track',
  foreignKey: 'TrackId',
  timestamps: false
});

app.delete('/api/playlists/:id', async function(request, response) {
  let { id } = request.params;

 
    try {

      let playlist = await Playlist.findByPk(id);

      if (playlist) {

        await playlist.setTracks([]);
        await playlist.destroy();
        response.status(204).send();

      } else {

        response.status(404).send();
      }

    } catch(error) {

      response.status(500).send();


    }


  // Playlist
  //   .findByPk(id)
    

  //   .then((playlist) => {
  //     if (playlist) {



  //       return playlist.setTracks([]).then(() => {
  //         return playlist.destroy();
       

  //       });
  //     } else {
  //       return Promise.reject();
  //     }
  //   })
  //   .then(() => {
  //     response.status(204).send();
  //   }, () => {
  //     response.status(404).send();
  //   })
});

app.post('/api/artists', async function(request, response) {
  
  try {

  let artist =  await Artist.create({
    name: request.body.name
  })

  response.json(artist);
  } catch(validation) {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  }
});

app.get('/api/playlists', async function(request, response) {
  let filter = {};
  let { q } = request.query;

  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  try {

  let playlists = await Playlist.findAll(filter);
  response.json(playlists);


  } catch(error) {


  }

 
});

app.get('/api/playlists/:id', function(request, response) {
  let { id } = request.params;

  Playlist.findByPk(id, {
    include: [Track]
  }).then((playlist) => {
    if (playlist) {
      response.json(playlist);
    } else {
      response.status(404).send();
    }
  });
});

app.patch('/api/tracks/:id', async function(request, response) {
  let { id } = request.params;

try {
      
      let track = await Track.findByPk(id);
      
      if (track) {

        await track.update(
          {name: request.body.name, milliseconds: request.body.milliseconds, unitPrice: request.body.unitPrice});

        response.json(track);
        response.status(200).send();

      } else {

          response.status(404).send();

      }

    } catch(validation) {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  }

});

app.get('/api/tracks/:id', function(request, response) {
  let { id } = request.params;

  

  Track.findByPk(id, {
    include: [Playlist]
  }).then((track) => {
    if (track) {
      response.json(track);
    } else {
      response.status(404).send();
    }
  });
});

app.get('/api/artists/:id', function(request, response) {
  let { id } = request.params;

  Artist.findByPk(id, {
    include: [Album]
  }).then((artist) => {
    if (artist) {
      response.json(artist);
    } else {
      response.status(404).send();
    }
  });
});

app.get('/api/albums/:id', function(request, response) {
  let { id } = request.params;

  Album.findByPk(id, {
    include: [Artist]
  }).then((album) => {
    if (album) {
      response.json(album);
    } else {
      response.status(404).send();
    }
  });
});

app.listen(process.env.PORT || 8000);
