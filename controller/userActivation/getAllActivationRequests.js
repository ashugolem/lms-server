const ActivationModel = require('../../model/userCreation');
const User = require('../../model/userModel')
const Student = require('../../model/studentModel')
const Teacher = require('../../model/teacherModel')

const getAllActivationRequest = async (req, res) => {
    try {
        const ActivationRequests = await ActivationModel.find();
        if (!ActivationRequests) {
            return res.status(200).json({ success: false, msg: 'No Creations found' });
        }
        if (ActivationRequests.length > 0) {
            const ActivationRequestsDetails = await Promise.all(
                ActivationRequests.map(async (activationRequest) => {
                    const user = await User.findById({ _id: activationRequest.user });
                    if (user.role === 'Student') {
                        const student = await Student.findOne({ user: user._id });
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

            res.status(200).json(ActivationRequestsDetails);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: `Error in getting all creations with error message: ${error.message}` });
    }
};

module.exports = getAllActivationRequest;
