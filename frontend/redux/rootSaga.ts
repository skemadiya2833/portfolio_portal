import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import registerUserSaga from './sagas/userSaga/registerUserSaga';
import loginUserSaga from './sagas/userSaga/loginUserSaga';
import fetchUserSaga from './sagas/userSaga/fetchUserSaga';
import saveAboutMeSaga from './sagas/aboutMeSaga/saveAboutMeSaga';
import updateAboutMeSaga from './sagas/aboutMeSaga/updateAboutMeSaga';
import addSkillSaga from './sagas/skillSaga/addSkillSaga';
import updateSkillSaga from './sagas/skillSaga/updateSkillSaga';
import removeSkillSaga from './sagas/skillSaga/removeSkillSaga';
import addProjectSaga from './sagas/projectSaga/addProjectSaga';
import updateProjectSaga from './sagas/projectSaga/updateProjectSaga';
import removeProjectSaga from './sagas/projectSaga/removeProjectSaga';
import fetchProjectDataSaga from './sagas/projectDataSaga/fetchProjectDataSaga';
import logoutUserSaga from './sagas/userSaga/logoutUserSaga';
import addProjectDataSaga from './sagas/projectDataSaga/addProjectDataSaga';
import updateProjectDataSaga from './sagas/projectDataSaga/updateProjectDataSaga';
import removeProjectDataSaga from './sagas/projectDataSaga/removeProjectDataSaga';
import saveContactSaga from './sagas/contactSaga/saveContactSaga';
import updateContactSaga from './sagas/contactSaga/updateContactSaga';
import addSocialMediaSaga from './sagas/socialMediaSaga/addSocialMediaSaga';
import updateSocialMediaSaga from './sagas/socialMediaSaga/updateSocialMediaSaga';
import removeSocialMediaSaga from './sagas/socialMediaSaga/removeSocialMediaSaga';
import addTestimonialSaga from './sagas/testimonialSaga/addTestimonialSaga';
import updateTestimonialSaga from './sagas/testimonialSaga/updateTestimonialSaga';
import removeTestimonialSaga from './sagas/testimonialSaga/removeTestimonialSaga';
import reorderProjectDataSaga from './sagas/projectDataSaga/reorderProjectDataSaga';

function* watchLatest() {
    yield takeLatest('projectData/addProjectDataRequest', addProjectDataSaga);
    yield takeLatest('projectData/updateProjectDataRequest', updateProjectDataSaga);
    yield takeLatest('projectData/removeProjectDataRequest', removeProjectDataSaga);
    yield takeLatest('testimonial/addTestimonialRequest', addTestimonialSaga);
    yield takeLatest('testimonial/updateTestimonialRequest', updateTestimonialSaga);
    yield takeLatest('testimonial/removeTestimonialRequest', removeTestimonialSaga);
    yield takeLatest('contact/saveContactRequest', saveContactSaga);
    yield takeLatest('contact/updateContactRequest', updateContactSaga);
    yield takeLatest('socialMedia/addSocialMediaRequest', addSocialMediaSaga);
    yield takeLatest('socialMedia/updateSocialMediaRequest', updateSocialMediaSaga);
    yield takeLatest('socialMedia/removeSocialMediaRequest', removeSocialMediaSaga);
    yield takeLatest('aboutMe/saveAboutMeRequest', saveAboutMeSaga);
    yield takeLatest('aboutMe/updateAboutMeRequest', updateAboutMeSaga);
    yield takeLatest('skill/addSkillRequest', addSkillSaga);
    yield takeLatest('skill/updateSkillRequest', updateSkillSaga);
    yield takeLatest('skill/removeSkillRequest', removeSkillSaga);
    yield takeLatest('project/addProjectRequest', addProjectSaga);
    yield takeLatest('project/updateProjectRequest', updateProjectSaga);
    yield takeLatest('project/removeProjectRequest', removeProjectSaga);
    yield takeLatest('register/registerUserRequest', registerUserSaga);
    yield takeLatest('auth/loginUserRequest', loginUserSaga);
    yield takeLatest('auth/logoutUserRequest', logoutUserSaga)
}

function* watchEvery() {
    yield takeEvery('user/fetchUserData', fetchUserSaga);
    yield takeEvery('projectData/fetchProjectDataRequest', fetchProjectDataSaga);
    yield takeEvery('projectData/reorderProjectDataRequest', reorderProjectDataSaga);
}

function* rootSaga() {
    yield all([
        watchLatest(),
        watchEvery()
    ])
}

export default rootSaga;