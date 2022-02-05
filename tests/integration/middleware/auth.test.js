
const request = require('supertest');
const { User } = require('../../../models/user');
const { Company } = require('../../../models/company');

const api = '/api/companies';
const test1Name1 = 'RVE1';
const test1Name2 = 'RVE Solutions Test1';


describe('auth middleware', () => {

let token;

    beforeEach(() => {
        server = require('../../../index');
        token = new User().generateAuthToken();
    });
    afterEach(async () => {
        await server.close();
        await Company.deleteMany({});
    });

    const exec = () => {
        return request(server)
        .post(api)
        .set('x-auth-token', token)
        .send(
            {
                name1: test1Name1,
                name2: test1Name2
            });


    };

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });
    it('should return 400 if the token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });
    it('should return 200 if the token is invalid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});