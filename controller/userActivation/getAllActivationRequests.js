const ActivationModel = require('../../model/userCreation');
const User = require('../../model/userModel')
const Student = require('../../model/studentModel')
const Teacher = require('../../model/teacherModel')
const moment = require('moment')
const getAllActivationRequest = async (req, res) => {
    try {
        const ActivationRequests = await ActivationModel.find();
        if (ActivationRequests.length === 0) {
            return res.status(200).json({ success: false, msg: 'No Creations found' });
        }
        if (ActivationRequests.length > 0) {
            const ActivationRequestsDetails = await Promise.all(
                ActivationRequests.map(async (activationRequest) => {
                    const user = await User.findById({ _id: activationRequest.user });
                    if (user.role === 'Student') {
                        const student = await Student.findOne({ user: user._id });
                        if(!student){
                            res.status(404).json({message: "No student is associated with this Transaction"})
                        }
                        const studentData = {
                            admissionNo: student.admissionNo,
                            course: student.course,
                            branch: student.branch,
                            semester: student.semester,
                        }
                        return {
                            ...activationRequest.toObject(),
                            userName: user ? user.name : null,
                            student: studentData,
                            status: user ? user.status : null
                        };
                    }
                    if (user.role === 'Teacher') {
                        const teacher = await Teacher.findOne({ user: user._id });
                        const teacherData = {
                            eid: teacher.eid,
                            designation: teacher.designation,
                        }
                        return {
                            ...activationRequest.toObject(),
                            userName: user ? user.name : null,
                            teacher: teacherData,
                            status: user ? user.status : null
                        };
                    }
                }));

            const unseenRequestCount = ActivationRequestsDetails.filter(request => !request.seen).length;
            const requests = ActivationRequestsDetails.sort((a, b) => {
                if (a.seen === b.seen) {
                    // If both alerts have the same 'seen' value, sorted based on the 'time' property
                    return moment(b.time).diff(a.time);
                } else if (a.seen === false) {
                    // If 'seen' is false, move the alert up in the sorted order
                    return -1;
                } else {
                    // If 'seen' is true, move the alert down in the sorted order
                    return 1;
                }
            }).slice(0, req.params.end)
            res.status(200).json({success: true, requests , unseenRequestCount});
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: `Error in getting all creations with error message: ${error.message}` });
    }
};

module.exports = getAllActivationRequest;
