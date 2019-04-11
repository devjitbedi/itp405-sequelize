const { expect } = require('chai');
const Artist = require('./../../../models/track');


		// TEST 1
				
			it('should not be numeric', async () => {

				try {
				return frisby
					.patch('http://localhost:8000/api/tracks/7', {
							"milliseconds": "a" })
					.expect(error.errors[0].message).to.equal('Milliseconds needs to be a number')
					.expect('status',422);

				} catch(error) {

					
				}

				});

		// TEST 2
				
			it('should be numeric', async () => {

				try {
				return frisby
					.patch('http://localhost:8000/api/tracks/7', {
							"milliseconds": "1" })
					.expect('status',200);

				} catch(error) {

					
				}

				});





	// 			it('should be less than 10 characters', async () => {

	// 			try {
	// 			let artist = new Artist({name: 'abcdefghijkl'});
	// 			await artist.validate();

	// 			} catch(error) {

	// 				expect(error.errors[0].message).to.equal('Name must be between 2 and 10 characters');
	// 			}

	// 			});

	// 			it('should only contain letters', async () => {

	// 			try {
	// 			let artist = new Artist({name: '2'});
	// 			await artist.validate();

	// 			} catch(error) {

	// 				expect(error.errors[0].message).to.equal('Name must only contain letters');
	// 			}

	// 			});

	// 