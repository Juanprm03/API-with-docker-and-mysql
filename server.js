import express from 'express'
import {pool} from './db.js'


const port = 3000

const app = express()
app.use(express.json())

// routes
app.get('/users', async (req, res) => {
   try{
     const data = await pool.query('SELECT * FROM users')
     res.status(200).send(data[0])
   }catch(err){
     console.error(err)
     res.status(500).send({ message: 'An error occurred while setting up the database.' })
   }
})

app.post('/user', async (req, res) => {
    const { name, age, city } = req.body
    try{
        await pool.query('INSERT INTO users (name, age, city) VALUES (?, ?, ?)', [name, age, city])
        res.status(200).send({ message: 'User added successfully.' })
    }catch(err){
        console.error(err)
        res.status(400).send({ message: 'Invalid user data.' })
    }
})



app.put('/user/:id', async (req, res) => {
    const { id } = req.params
    const { name, age, city } = req.body
    try{
        await pool.query('UPDATE users SET name=?, age=?, city=? WHERE id=?', [name, age, city, id])
        res.status(200).send({ message: 'User updated successfully.' })
    }catch(err){
        console.error(err)
        res.status(404).send({ message: 'User not found.' })
    }
})

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    try{
        await pool.query('DELETE FROM users WHERE id=?', [id])
        res.status(200).send({ message: 'User deleted successfully.' })
    }catch(err){
        console.error(err)
        res.status(404).send({ message: 'User not found.' })
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))