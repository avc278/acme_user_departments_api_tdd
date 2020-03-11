const { expect } = require('chai');
const db = require('../db.js');
const { User, Department } = db.models;
const app = require('supertest')(require('../app.js'));

describe('data layer', () => {
    let seed;
    beforeEach( async() => {
        seed = await db.syncAndSeed();
        return seed;
    });
    describe('seeded data', () => {
        it('there are 3 users', () => {
            expect(seed.users.length).to.equal(3);
        });
        it('one of them has a name of Dan', async() => {
            const dan = await User.findOne({ where: { name: 'Dan' }});
            expect(dan.name).to.equal('Dan');
        });
        it('one of them has a name of Andres', async() => {
            const andres = await User.findOne({ where: { name: 'Andres' }});
            expect(andres.name).to.equal('Andres');
        });
    });

    describe('api', () => {
        describe('GET /api/users', () => {
            it('returns the users', () => {
                return app.get('/api/users')
                    .expect(200)
                    .then(response => {
                        expect(response.body.length).to.equal(3);
                    });
            });
        });
        describe('POST /api/users', () => {
            it('returns the users', () => {
                return app.post('/api/users')
                    .send({ name: 'Bob' })
                    .expect(201)
                    .then(response => {
                        expect(response.body.id).to.not.equal(null);
                    });
            });
        });
    });
});
