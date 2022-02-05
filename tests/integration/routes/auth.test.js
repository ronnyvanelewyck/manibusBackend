//
// Purpose: MANIBUS TEST LOGIN
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const request = require('supertest');
const { User } = require('../../../models/user');
const mongoose = require("mongoose");

let server;


describe('/api/auth', () => {

    let firstnameTest;
    let lastnameTest;
    let emailTest;
    let passwordTest;

    const exec = async () => {
        return await request(server)
            .post('/api/auth')
            .send(
                {
                    email: emailTest,
                    password: passwordTest
                });
    };


    beforeEach( async () => {
        server = require('../../../index');

        firstnameTest = 'Ron';
        lastnameTest = 'Van Elewyck';
        emailTest = 'ronvanelewyck@gmail.com';
        passwordTest = '123@4567/YnnNyy';

        await request(server)
        .post('/api/users')
        .send(
            {
                firstname: firstnameTest,
                lastname: lastnameTest,
                email: emailTest,
                password: passwordTest
            });

    })

    afterEach(async () => {
       await server.close();
       await User.deleteMany({});
    })


    it('should return 409 if the request is not valid', async () => {
        const res = await request(server)
        .post('/api/auth')
        .send();

        expect(res.status).toBe(409);
    });

    it('should return 401 if email is not valid', async () => {

        emailTest = 'ronvanelewyck2@gmail.com';
        
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 401 if password is not valid', async () => {
        passwordTest = '123@4567/YnnNyy1';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return a valid token', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.header).toHaveProperty('x-auth-token');
    });

})