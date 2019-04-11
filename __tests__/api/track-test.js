const frisby = require('frisby');

const { Joi } = frisby;

// it('should return a status of 200 when the track is found', () => {

// return frisby
// .get('http://localhost:8000/api/tracks/5')
// .expect('status',200);

// });

// it('should return a status of 404 when the track is not found', () => {

// return frisby
// .get('http://localhost:8000/api/tracks/-1')
// .expect('status',404);

// });

// it('should return the track name and its playlists', () => {

// return frisby
// .get('http://localhost:8000/api/tracks/5')
// .expect('json','name', 'Princess of the Dawn')
// .expect('jsonTypes','playlists.*', {

// id: Joi.number().required(),
// name: Joi.string().required()

// });

// });

// TEST 1

it('should return a status of 404 when the track is not found', () => {

return frisby
.patch('http://localhost:8000/api/tracks/-1')
.expect('status',404);

});

// TEST 2

it('should return a status of 200 when the track is updated', () => {

return frisby
.patch('http://localhost:8000/api/tracks/5', {
      name: 'ITP'
    })
.expect('json', 'name', 'ITP')
.expect('status',200);

});

// TEST 3

it('should return a status of 422 when the track is not updated properly', async () => {

				try {
				return frisby
					.patch('http://localhost:8000/api/tracks/7', {
							"name": "", 
							"milliseconds": "a", 
							"unitPrice": "b"})

				} catch(error) {

					expect(error.errors[0].message).to.equal('Name is required')
					.expect(error.errors[1].message).to.equal('Milliseconds needs to be a number')
					.expect(error.errors[2].message).to.equal('Unit price needs to be a number')
					.expect('status',422);
				}

				});



