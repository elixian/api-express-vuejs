const request = require('supertest')
const {
    User
} = require('../../models/user');
let server;
describe('/api/users', () => {
    beforeEach(async () => {
        server = await require('../../app');
    })
    afterEach(async () => {
        server.close();
        await User.remove({});
    })
    describe('GET /', () => {
        it('should return users ', async () => {
            await User.collection.insertMany([{
                    email: "Edouardo@gmail.com",
                    password: "45678"
                },
                {
                    email: "Edouardo2@gmail.com",
                    password: "45678"
                },
            ])
            const res = await request(server).get('/api/users');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.email === "Edouardo@gmail.com")).toBeTruthy();
            expect(res.body.some(g => g.email === "Edouardo2@gmail.com")).toBeTruthy();
            expect(res.body.some(g => g.email === "false@gmail.com")).toBeFalsy();
        });
    });
    describe('GET /:id', () => {
        it('should return user with right id ', async () => {
            const user = new User({
                email: "Edouardo@gmail.com",
                password: "45678789"
            }, );
            await user.save();
            const res = await request(server).get(`/api/users/${user._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('email', user.email);

        });
        it('should return 400 if invalid id', async () => {
            const res = await request(server).get(`/api/users/1`);
            expect(res.status).toBe(400);
        });
        it('should return 400 if user is not in DB', async () => {
            const user = new User({
                email: "Edouardo@gmail.com",
                password: "45678789"
            }, );
            await user.save();
            const res = await request(server).get(`/api/users/${user._id - 1}`);
            expect(res.status).toBe(400);
        });
    });

    describe('POST /', () => {
        it('SHOULD post new user ', async () => {

            const data = {
                email: "mytest@api.com",
                password: "5689gdgf"
            };
            const res = await request(server).post('/api/users').send(data)
                .expect(201)
                .then(async (response) => {
                    expect(response.body._id).toBeTruthy(),
                        expect(response.body.email).toBe(data.email),
                        expect(response.body.email).not.toBe('false.email@gmail.com'),
                        expect(response.body).toMatchObject(data)

                });

        });
    })
    describe('PUT /:id', () => {
        it('SHOULD update password user ', async () => {

            let user = new User({
                email: "mytest@api.com",
                password: "5689gdgf"
            });
           await user.save();
            const res = await request(server).put(`/api/users/${user._id}`).send({password : '7897987979'})
                .expect(201).then(async (response)=>{
                    expect(response.body.password).toBe('7897987979')
                }); 

        });
        it('SHOULD return 400 error with invalid id ', async () => {
             await request(server).put(`/api/users/1`).send({password : '7897987979'})
                .expect(400);

        });
        it('SHOULD return 400 error with right id format and user not in db ', async () => {
            let user = new User({
                email: "mytest@api.com",
                password: "5689gdgf"
            });
           await user.save();
             await request(server).put(`/api/users/${user._id - 1}`).send({password : '7897987979'})
                .expect(400);

        });
    })
});