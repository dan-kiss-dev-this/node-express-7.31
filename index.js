const express = require('express');
const app = express();
const Joi = require('joi');

// this adds in middlware to post to api/courses
app.use(express.json());

console.log(process.env.NODE_ENV)

app.use(function (req, res, next) {
  console.log('logging...');
  next();
})

app.use(function (req, res, next) {
  console.log('authenticating...');
  next();
})

const courses = [
  { id: 1, name: 'Finance' },
  { id: 2, name: 'CS' },
  { id: 3, name: 'Art' }
]
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  console.log(23, course)
  if (!course) res.status(404).send('The course with id not found')
  res.send(course)
})

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    // 400 bad request
    res.status(400).send(result.error.details)
  }

  if (result.error) {
    // 400 bad request
    res.status(400).send(result.error.details)
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course)
})

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query)
  // res.send(req.params);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on ${port}`))

app.put('/api/courses/:id', (req, res) => {
  // look up the course
  // if not exist do 404 not exist
  const course = courses.find(c => c.id === parseInt(req.params.id))
  console.log(23, course)
  if (!course) res.status(404).send('The course with id not found')

  //validate
  //if invalid dod a 400
  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    // 400 bad request
    res.status(400).send(result.error.details)
  }
  course.name = req.body.name;
  //update course and return it
  res.send(course)
})

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })
  return schema.validate(course)
}

app.delete('/api/courses/:id', (req, res) => {
  // look up course if not exist do 404, if exist delete it
  const course = courses.find(c => c.id === parseInt(req.params.id))
  console.log(23, course)
  if (!course) res.status(404).send('The course with id not found')

  const index = courses.indexOf(course);
  courses.splice(index, 1)

  res.send(course)
})