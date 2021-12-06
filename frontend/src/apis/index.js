import axios from 'axios';
import { logger } from '@utils';

const get = ({ path, param = {}, onSuccess = () => {}, onError = () => {} }) =>
    axios
        .get(`http://localhost:4000/${path}`, param)
        .then((res) => {
            onSuccess(res);
        })
        .catch((err) => {
            logger(err);
            onError(err);
        });

const post = ({ path, body = {}, onSuccess = () => {}, onError = () => {} }) =>
    axios
        .post(`http://localhost:4000/${path}`, body)
        .then((res) => {
            onSuccess(res);
        })
        .catch((err) => {
            logger(err);
            onError(err);
        });

const postStudentLogin = ({
    stu_email = '',
    stu_password = '',
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'student-login',
        body: { stu_email, stu_password },
        onSuccess,
        onError,
    });
};

const postStudentProfile = ({
    stu_email,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'students/profile',
        body: { stu_email },
        onSuccess,
        onError,
    });
};

const postStudentMajors = ({
    stu_id,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'students/majors',
        body: { stu_id },
        onSuccess,
        onError,
    });
};

const postStudentMinors = ({
    stu_id,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'students/minors',
        body: { stu_id },
        onSuccess,
        onError,
    });
};

const postAdvisorProfile = ({
    adv_email,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'advisor/profile',
        body: { adv_email },
        onSuccess,
        onError,
    });
};

const postRemaningCoursesMajor = ({
    major_id,
    stu_email,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: `courses_req_major/remaining_courses`,
        body: {
            major_id,
            stu_email,
        },
        onSuccess,
        onError,
    });
};

const postRemaningCoursesMinor = ({
    major_id,
    stu_email,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: `courses_req_minor/remaining_courses`,
        body: {
            major_id,
            stu_email,
        },
        onSuccess,
        onError,
    });
};

const getGradRequirement = ({ onSuccess = () => {}, onError = () => {} }) => {
    get({
        path: 'grad_requirement',
        onSuccess,
        onError,
    });
};

const postTakenCourses = ({
    stu_id,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'stu_course_taken',
        body: {
            stu_id,
        },
        onSuccess,
        onError,
    });
};

const getCourseInfo = ({
    course_id,
    onSuccess = () => {},
    onError = () => {},
}) => {
    get({
        path: `department_courses/info?course_id=${course_id}`,
        onSuccess,
        onError,
    });
};

const postCourseTakenFromId = ({
    stu_id,
    onSuccess = () => {},
    onError = () => {},
}) => {
    post({
        path: 'stu_course_taken/get_from_id',
        body: {
            stu_id,
        },
        onSuccess,
        onError,
    });
};

export {
    postStudentLogin,
    postAdvisorProfile,
    postStudentProfile,
    postStudentMajors,
    postStudentMinors,
    postRemaningCoursesMajor,
    postRemaningCoursesMinor,
    getGradRequirement,
    postTakenCourses,
    getCourseInfo,
    postCourseTakenFromId,
};
