const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// use Middleware
app.use(cors());
app.use(express.json());


// user: dbuser1
// password : kOuXDDuMj72Ge9lT

const uri = "mongodb+srv://dbuser1:kOuXDDuMj72Ge9lT@cluster0.n6ik0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');

        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        app.post('/user', async (req, res)=>{
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })
    }finally{
        // await client.close();
    }
}
run().catch(console.dir)


app.get('/', (req, res)=>{
    res.send('Running my CRUD Server');
})

app.listen(port, ()=>{
    console.log('CRUD Server Running', port);
})