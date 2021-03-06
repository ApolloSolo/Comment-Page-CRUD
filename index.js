const { text } = require('body-parser');
const express = require('express')
const app = express()
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
uuid();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
//this will parse form data from web
app.use(express.urlencoded({ extended : true}));
//this will parse json
app.use(express.json());
//allows us to us PATCH
app.use(methodOverride('_method'));

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol, that is funny.'
    },
    {
        id: uuid(),
        username: 'Sophi',
        comment: 'I dont like that.'
    },
    {
        id: uuid(),
        username: 'Philly-D',
        comment: 'Take them birds.'
    },
    {   
        id: uuid(),
        username: 'ApolloSolo',
        comment: 'Do the, you know, the thing.'
    },

]
//INDEX showing all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
})

//Create comments - two routes: one to serve as form template route,
//the other to post form data
app.get('/comments/new', (req, res) => {
res.render('comments/new')
})

//post form data to show on all comments page
app.post('/comments', (req, res) => {
    const {username, comment} = req.body; //destructure the data to get variables
    comments.push({ username, comment, id: uuid() }) //push those var datas into our array, which updates the list
    res.redirect('/comments') // send you back to comments once form is submitted.
}) 

//Show single comment using an id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params; //pull out the value of the :id variable
    const comment = comments.find( c => c.id === id); //Find the comment in the array that matched the id.
    res.render('comments/show', { comment });
})


//edit comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params; //get the id value from the url
    const newCommentText = req.body.comment; //Take whatever was sent in the request body
    const foundComment = comments.find( c => c.id === id); //Find comment associated with the id
    foundComment.comment = newCommentText; //change that found comment to what was in the req body data
    res.redirect('/comments');
})

//route to edit form - not working
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params; 
    const comment = comments.find( c => c.id === id);//find the comment object accosiated with url id
    res.render('comments/edit', { comment }); 
    })

















app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send(`So you want ${data.qty} ${data.meat} tacos?`)
})

app.listen(3000, (req, res) => {
    console.log("On 3000.");
})

//our resource /comments is our base
//if you send http requests to /comments
//INDEX: GET /comments - list all comments
//NEW: POST /comments - makes new comments
//SHOW: GET /comments/:id -gets one comment with an id
//UPDATE: PATCH /comments/comments/:id - update one comment
//DESTROY: DELETE /comments/:id - deletes that comment

