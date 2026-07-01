const express = require('express') 
const UserController = require('../controller/UserController');
const adminController = require('../controller/adminController');
const { CategoryController, upload } = require('../controller/CategoryController');
const JobController = require('../controller/JobController');
const FormController = require('../controller/FormController');
const ContactController = require('../controller/ContactController');
const FeedbackController = require('../controller/FeedbackController');
const { createOrder, verifyPayment, saveResumeData, getAllResumes, deleteResume } = require('../controller/ResumeBuilderController');
const route = express.Router()


// user routes
route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.post("/logout", UserController.logout);
route.get("/profile", UserController.getProfile);
route.post("/admin/login", adminController.login);
// Dashboard ka data lane ke liye (Applications list)
route.get("/admin/applications", adminController.getApplicationsList);
route.get("/admin/stats", adminController.getDashboardStats);

// Route: upload.single('image') wahi 'upload' hai jo Cloudinary se connected hai
route.post("/add-category", upload.single('image'), CategoryController.addCategory);
route.get("/categories", CategoryController.getCategories);
route.put("/update-category/:id", upload.single('image'), CategoryController.updateCategory);

// Jobs controller
route.post("/add-job", JobController.addJob);
route.get("/get-jobs", JobController.getJobs);
route.delete("/delete-job/:id", JobController.deleteJob);
route.put("/update-job/:id", JobController.updateJob);

route.post("/submit-requirement", FormController.postRequirement);
route.get("/admin/requirements", FormController.getRequirements);

// Candidate Route (With File Upload)
route.post("/submit-resume", upload.single('resume'), FormController.postResume);
route.get("/admin/resumes", FormController.getResumes);
route.delete("/delete-requirement/:id", FormController.deleteRequirement);
route.delete("/delete-resume/:id", FormController.deleteResume);
route.post("/candidate/shortlist", FormController.shortlistCandidate);
route.post("/candidate/reject", FormController.rejectCandidate);

route.post("/contact/add", ContactController.postContact);
// Get and Delete for Admin Dashboard
route.get("/admin/contacts", ContactController.getContacts);
route.delete("/admin/contact/delete/:id", ContactController.deleteContact);
// Make sure UserController import hai
route.put("/auth/change-password", UserController.changePassword);

route.post("/feedback/add", FeedbackController.postFeedback);

// Admin Routes 
route.get("/admin/feedbacks", FeedbackController.getAllFeedbacks);
route.delete("/admin/feedback/delete/:id", FeedbackController.deleteFeedback);

// Resume Builder Routes
route.post("/resume-builder/create-order", createOrder);
route.post("/resume-builder/verify-payment", verifyPayment);
route.post("/resume-builder/save", saveResumeData);
route.get("/admin/resume-builder", getAllResumes);
route.delete("/admin/resume-builder/:id", deleteResume);



module.exports = route;