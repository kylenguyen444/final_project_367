const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to dbf2021367.' });
});

require('./src/routes/auth')(app);
require('./src/routes/advisor')(app);
require('./src/routes/course_grad_requirement')(app);
require('./src/routes/courses_prereq')(app);
require('./src/routes/courses_req_major')(app);
require('./src/routes/courses_req_minor')(app);
require('./src/routes/department_courses')(app);
require('./src/routes/departments')(app);
require('./src/routes/grad_requirement')(app);
require('./src/routes/majors_and_minors')(app);
require('./src/routes/stu_course_taken')(app);
require('./src/routes/stu_grades_credits')(app);
require('./src/routes/stu_majors')(app);
require('./src/routes/stu_minors')(app);
require('./src/routes/students')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
