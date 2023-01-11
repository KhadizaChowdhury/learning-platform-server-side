const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

const categories = require('./data/categories.json');
const courses = require('./data/courses.json');

app.get('/', (req, res) => {
    res.send('Course API Running');
});

app.get('/all-courses', (req, res) => {
    res.send(courses)
});

app.get('/courses-categories', (req, res) => {
    res.send(categories)
});

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.send("Sorry! Not Found")
    }
    else if (id === '07') {
        res.send(courses)
    }
    else {
        const selectedCourses = courses.filter(course => course.category_id === id);
        res.send(selectedCourses)
    }
});
app.get('/checkout/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.send("Sorry! Not Found")
    }
    else {
        const selectedCourses = courses.find(course => course._id === id);
        res.send(selectedCourses)
    }
});

app.get('/course/:id', (req, res) => {
    // console.log(courses)
    // console.log(req.params)
    // console.log(req.params.id)
    const id = req.params.id;
    const selectedCourse = courses.find(course => course._id === id);
    if(!selectedCourse){
        res.send("Sorry! Not Found")
    }
    res.send(selectedCourse)
});

app.listen(port, () => {
    console.log('Dragon Course Server running on port', port);
})
