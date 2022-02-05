//
// Purpose: MANIBUS TEST COMPANIES ROUTEw
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const request = require('supertest');
const { Company } = require('../../../models/company');
const { User } = require('../../../models/user');
const mongoose = require("mongoose");

let server;

const api = '/api/companies';
const test1Name1 = 'RVE';
const test1Name2 = 'RVE Solutions Test A';
const test2Name1 = 'MAI';
const test2Name2 = 'Maria Assumpta Instituut';


describe('/api/companies', () => {
    beforeEach(() => {
        server = require('../../../index');
    })
    afterEach(async () => {
        await server.close();
        await Company.deleteMany({});
    })
    describe('GET /', () => {
        it('should return all companies', async () => {
            await Company.collection.insertMany([
                {
                    name1: test1Name1,
                    name2: test1Name2
                },
                {
                    name1: test2Name1,
                    name2: test2Name2
                }
            ]);
            const res = await request(server).get(api);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(c => c.name1 === test1Name1)).toBeTruthy();
            expect(res.body.some(c => c.name2 === test1Name2)).toBeTruthy();
            expect(res.body.some(c => c.name1 === test2Name1)).toBeTruthy();
            expect(res.body.some(c => c.name2 === test2Name2)).toBeTruthy();

        })
    });
    describe('GET /:id', () => {
        it('should return one company based on id', async () => {
            const result = await Company.collection.insertOne(
                {
                    name1: test1Name1,
                    name2: test1Name2
                }
            );
            const res = await request(server).get(`${api}/${result.insertedId}`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(c => c.name1 === test1Name1)).toBeTruthy();
            expect(res.body.some(c => c.name2 === test1Name2)).toBeTruthy();

        });
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get(`${api}1`);
            expect(res.status).toBe(404);
        });
        it('should return 404 if no company with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get(`${api}${id}`);
            expect(res.status).toBe(404);
        });
    });

    describe('GET /find/:search', () => {
        it('should return 0 or multiple companies based on matching parts of name1 or name2', async () => {
            await Company.collection.insertMany(
                [{
                    name1: test1Name1,
                    name2: test1Name2
                },
                {
                    name1: test2Name1,
                    name2: test2Name2
                }]
            );
            const res = await request(server).get(`${api}/find/a`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
        it('should return 404 if search string is empty', async () => {
            await Company.collection.insertMany(
                [{
                    name1: test1Name1,
                    name2: test1Name2
                },
                {
                    name1: test2Name1,
                    name2: test2Name2
                }]
            );
            const res = await request(server).get(`${api}/find/`);
            expect(res.status).toBe(404);
        });
    });

    describe('PUT /:id', () => {

        let token;
        let payload;

        const exec = async () => {
            return await request(server)
                .post(api)
                .set('x-auth-token', token)
                .send(
                    {
                        name1: test1Name1,
                        name2: test1Name2
                    });
        }

        beforeEach(() => {
            payload = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                isAdmin: true
            };
            const user = new User(payload);
            token = user.generateAuthToken();

        });

        it('should return 401 if no token', async () => {
            token = '';

            const res = await request(server).put(`${api}/1`).set('x-auth-token', token);

            expect(res.status).toBe(401);
        });
        it('should return 400 if the format of the body is not ok', async () => {
            const result = await exec();

            const res = await request(server).put(`${api}/${result.body._id}`).set('x-auth-token', token);

            expect(res.status).toBe(400);
        });
        it('should return 404 if the id to change is no valid', async () => {
            const res = await request(server).put(`${api}/1`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        });
        it('should update existing company', async () => {
            const result = await exec();

            const res = await request(server)
                .put(`${api}/${result.body._id}`)
                .send(                    {
                    name1: test2Name1,
                    name2: test2Name2
                })
                .set('x-auth-token', token);

            expect(res.status).toBe(200);       
        });
    });

    describe('DELETE /:id', () => {

        let token;
        let payload;

        const exec = async () => {
            return await request(server)
                .post(api)
                .set('x-auth-token', token)
                .send(
                    {
                        name1: test1Name1,
                        name2: test1Name2
                    });
        }

        beforeEach(() => {
            payload = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                isAdmin: true
            };
            const user = new User(payload);
            token = user.generateAuthToken();

        });

        it('should delete company based on id', async () => {
            const result = await exec();
            const res = await request(server).delete(`${api}/${result.body._id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
        });
        it('should return 401 if client is not logged in', async () => {
            token = '';

            const result = await exec();
            const res = await request(server).delete(`${api}/${result.body._id}`).set('x-auth-token', token);

            expect(res.status).toBe(401);
        });
        it('should return 403 if user has no admin rights', async () => {
            payload = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                isAdmin: false
            };
            const user = new User(payload);
            token = user.generateAuthToken();

            const result = await exec();
            const res = await request(server).delete(`${api}/${result.body._id}`).set('x-auth-token', token);

            expect(res.status).toBe(403);
        });
        it('should return 404 if delete fails', async () => {
            const res = await request(server).delete(`${api}/1`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let token;
        let post1Name1;
        let post1Name2;


        const exec = async () => {
            return await request(server)
                .post(api)
                .set('x-auth-token', token)
                .send(
                    {
                        name1: post1Name1,
                        name2: post1Name2
                    });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            post1Name1 = test1Name1;
            post1Name2 = test1Name2;
        });
        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });
        it('should return 400 for invalid company name2 missing', async () => {
            const res = await request(server)
                .post(api)
                .set('x-auth-token', token)
                .send(
                    {
                        name1: test1Name1
                    });
            expect(res.status).toBe(400);
        });
        it('should return 400 for invalid company name1 missing', async () => {
            const res = await request(server)
                .post(api)
                .set('x-auth-token', token)
                .send(
                    {
                        name2: test1Name2
                    });
            expect(res.status).toBe(400);
        });
        it('should return 400 for company name1 less than 3 characters', async () => {
            post1Name1 = 'a';

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 for company name2 less than 3 characters', async () => {
            post1Name2 = 'a';

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 for company name1 greater than 10 characters', async () => {
            post1Name1 = new Array(12).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 for company name2 greater than 80 characters', async () => {
            post1Name2 = new Array(82).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should save the company if valid', async () => {
            await exec();

            const company = await Company.find({ name1: test1Name1 });

            expect(company).not.toBeNull();
        });
        it('should return the company attributes if valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name1', test1Name1);
            expect(res.body).toHaveProperty('name2', test1Name2);
        });
    });
});

