const request = require('supertest')
const {User} = require('../../models/user');
let server;
describe('/api/users',()=>{
    beforeEach(async()=>{server = await require('../../app');})
    afterEach(async ()=>{ 
        server.close();
        await User.remove({});
    })
      describe('GET /',  ()=>{
        it('should return users ', async () => {
            await User.collection.insertMany([
                {email : "Edouardo@gmail.com", password:"45678"},
                {email : "Edouardo2@gmail.com", password:"45678"},
            ])
           const res = await request(server).get('/api/users');
           expect(res.status).toBe(200);
           expect(res.body.length).toBe(2);
           expect(res.body.some(g => g.email === "Edouardo@gmail.com")).toBeTruthy();
           expect(res.body.some(g => g.email === "Edouardo2@gmail.com")).toBeTruthy();
           expect(res.body.some(g => g.email === "false@gmail.com")).toBeFalsy();       
        });
    });

    describe('POST /',  ()=>{
        it('SHOULD post new user ', async () => {
            
            const data = {email: "mytest@api.com", password : "5689gdgf"};
           const res = await request(server).post('/api/users').send(data)
                .expect(201)
                .then(async (response)=>{
                    expect(response.body._id).toBeTruthy(),
                    expect(response.body.email).toBe(data.email),
                    expect(response.body.email).not.toBe('false.email@gmail.com'),
                    expect(response.body).toMatchObject(data)
                    
                });
  
        });
    })
})