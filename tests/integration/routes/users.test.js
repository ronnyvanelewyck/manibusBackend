//
// Purpose: MANIBUS TEST USERS ROUTE
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const request = require('supertest');
const { User } = require('../../../models/user');
const mongoose = require("mongoose");

let server;

const api = '/api/users';

describe('/api/users', () => {
    beforeEach(() => {
        server = require('../../../index');
    })
    afterEach(async () => {
        await server.close();
        await User.deleteMany({});
    })

    describe('POST /', () => {
        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;


        const exec = async () => {
            return await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest
                    });
        };

        beforeEach(() => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy'
        });
        it('should return 400 if firstname is not valid', async () => {
            firstnameTest = '';
            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if lastname is not valid', async () => {
            lastnameTest = '';
            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if email is not valid', async () => {
            emailTest = '';
            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if password is not valid', async () => {
            passwordTest = '';
            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 409 if the email address is already existing', async () => {
            await exec();
            const res = await exec();

            expect(res.status).toBe(409);
        });
        it('should return valid _id in the body and an auth token in the header if successfull', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body._id).toBeDefined();
            expect(mongoose.Types.ObjectId.isValid(res.body._id)).toBe(true);
            expect(res.header).toHaveProperty('x-auth-token');
        });


    })

    describe('GET /', () => {
        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;

        beforeEach(async () => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy';
            await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest
                    });

            emailTest = 'ronvanelewyck2@gmail.com';
            await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest
                    });
        });

        it('should return all users', async () => {
            const res = await request(server).get(api);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(c => c.email === 'ronvanelewyck@gmail.com')).toBeTruthy();
            expect(res.body.some(c => c.email === 'ronvanelewyck2@gmail.com')).toBeTruthy();


        })
    });

    describe('GET /:me', () => {
        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;
        let token;

        beforeEach(async () => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy';
            const res = await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest
                    });
            token = res.headers['x-auth-token'];
        });         
        
        it('should return 401 if invalid token', async () => {
            token = '';
            const res = await request(server).get(`${api}/:me`).set('x-auth-token', token);

            expect(res.status).toBe(401);
        });

        it('should return 404 if user not found', async () => {
            await User.deleteMany({});

            const res = await request(server).get(`${api}/:me`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        });

        it('should return information of the current user', async () => {
            const res = await request(server).get(`${api}/:me`).set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('email', emailTest);
            expect(res.body).toHaveProperty('firstname', firstnameTest);
            expect(res.body).toHaveProperty('lastname', lastnameTest);
        });
    });

    describe('GET /find/:search', () => {
        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;

        beforeEach(async () => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy';
            await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest
                    });

            firstnameTest = 'Ron2';
            lastnameTest = 'Van Elewyck2';
            emailTest = 'ronvanelewyck2@gmail.com';
            passwordTest = '123@4567/YnnNyy2';
            await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest
                    });
        });         
        
        it('should return 2 users', async () => {
            const searchString = 'lookforit?searchtext=Ron';
            const res = await request(server).get(`${api}/find/${searchString}`);

            expect(res.status).toBe(200);
            expect(res.body[0].email).toBe('ronvanelewyck@gmail.com');
            expect(res.body[1].email).toBe('ronvanelewyck2@gmail.com');
        });
        it('should return 404 if not match was found', async () => {
            const searchString = 'lookforit?searchtext=ZZZZ';
            const res = await request(server).get(`${api}/find/${searchString}`);

            expect(res.status).toBe(404);
        });
        it('should return 400 because url has empty searchstring', async () => {
            const searchString = 'lookforit?searchtext=';
            const res = await request(server).get(`${api}/find/${searchString}`);

            expect(res.status).toBe(400);
        });

    });

    describe('PUT /:id', () => {
        let token;
        let payload;
        let id;
     


        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;
        let isAdminTest;

        const exec = async () => {
            const res1 =  await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest,
                        isAdmin: isAdminTest
                    });
            id = res1.body._id;
            const res2 =  await request(server)
                .post('/api/auth')
                .send(
                    {
                        email: emailTest,
                        password: passwordTest
                    });
            token = res2.header['x-auth-token'];
        }

        beforeEach(() => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy';
            isAdminTest = true;


        });
        it('should return 404 if user is not found', async () => {
            const firstnamChange = "XXXXX";
            await exec();

            id = new mongoose.Types.ObjectId();
            const res = await request(server)
                .put(`${api}/${id}`)
                .set('x-auth-token', token)
                .send(
                    {
                        firstname: firstnamChange
                    });

            expect(res.status).toBe(404);
        });

        it('should return 401 if invalid token', async () => {
            
            await exec();

            token = '';

            const res = await request(server)
            .put(`${api}/${id}`)
            .set('x-auth-token', token)
            .send(
                {
                    firstname: "X",
                    lastname: "X"
                });

            expect(res.status).toBe(401);  
        });

        it('should return the user information and change the firstname', async () => {

            const firstnamChange = "XXXXX";
            await exec();


            const res = await request(server)
                .put(`${api}/${id}`)
                .set('x-auth-token', token)
                .send(
                    {
                        firstname: firstnamChange
                    });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('firstname', firstnamChange);

        });


    });


    describe('PUT /pw/:id', () => {
        let token;
        let id;
        const apiPw = '/api/users/pw';


        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;
        let isAdminTest;

        const exec = async () => {
            const res1 =  await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest,
                        isAdmin: isAdminTest
                    });
            id = res1.body._id;
            const res2 =  await request(server)
                .post('/api/auth')
                .send(
                    {
                        email: emailTest,
                        password: passwordTest
                    });
            token = res2.header['x-auth-token'];
        }

        beforeEach(() => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy';
            isAdminTest = true;
        });

        it('should return 404 if user is not found', async () => {
            await exec();

            id = new mongoose.Types.ObjectId();
            const res = await request(server)
                .put(`${apiPw}/${id}`)
                .set('x-auth-token', token)
                .send(
                    {
                        password: passwordTest
                    });

            expect(res.status).toBe(404);
        });

        it('should return 404 if password field is missing in body', async () => {
            await exec();

            id = new mongoose.Types.ObjectId();
            const res = await request(server)
                .put(`${apiPw}/${id}`)
                .set('x-auth-token', token)
                .send(
                    {
                        firstname: passwordTest
                    });

            expect(res.status).toBe(404);
        });

        it('should return 401 if invalid token', async () => {
            
            await exec();

            token = '';

            const res = await request(server)
            .put(`${apiPw}/${id}`)
            .set('x-auth-token', token)
            .send(
                {
                    password: "X"
                });

            expect(res.status).toBe(401);  
        });

        it('should return the userid and new password', async () => {

            const passwordChange = passwordTest + '!ç§éè&';
            await exec();


            const res = await request(server)
                .put(`${apiPw}/${id}`)
                .set('x-auth-token', token)
                .send(
                    {
                        password: passwordChange
                    });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('new password', passwordChange);

        });


    });

    describe('DELETE /:id', () => {
        let token;
        let id;

        let firstnameTest;
        let lastnameTest;
        let emailTest;
        let passwordTest;
        let isAdminTest;

        const exec = async () => {
            const res1 =  await request(server)
                .post(api)
                .send(
                    {
                        firstname: firstnameTest,
                        lastname: lastnameTest,
                        email: emailTest,
                        password: passwordTest,
                        isAdmin: isAdminTest
                    });
            id = res1.body._id;
            const res2 =  await request(server)
                .post('/api/auth')
                .send(
                    {
                        email: emailTest,
                        password: passwordTest
                    });
            token = res2.header['x-auth-token'];
        };

        beforeEach(() => {
            firstnameTest = 'Ron';
            lastnameTest = 'Van Elewyck';
            emailTest = 'ronvanelewyck@gmail.com';
            passwordTest = '123@4567/YnnNyy';
            isAdminTest = true;
        });

        it('should delete user based on id', async () => {
            await exec();
            const res = await request(server).delete(`${api}/${id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
        });
        it('should return 401 if token is invalid', async () => {


            await exec();
            token = '';
            const res = await request(server).delete(`${api}/${id}`).set('x-auth-token', token);

            expect(res.status).toBe(401);
        });

        it('should return 403 if user has no admin rights', async () => {

            isAdminTest = false;

            await exec();
            const res = await request(server).delete(`${api}/${id}`).set('x-auth-token', token);

            expect(res.status).toBe(403);

        });

    });
})