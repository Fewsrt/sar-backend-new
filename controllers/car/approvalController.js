const { updateApprovalDetails, getApprovalDetails } = require('../../models/car');

// ดึงข้อมูลการอนุมัติ
async function getCarApproval(req, res) {
    try {
        const { car_id } = req.params;
        const approval = await getApprovalDetails(parseInt(car_id));
        
        res.json({
            success: true,
            data: approval
        });
    } catch (error) {
        console.error('Error getting approval:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get approval details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทข้อมูลการอนุมัติ
async function updateCarApproval(req, res) {
    try {
        const { car_id } = req.params;
        const approvalData = req.body;
        
        const updatedApproval = await updateApprovalDetails(parseInt(car_id), approvalData);
        
        res.json({
            success: true,
            data: updatedApproval
        });
    } catch (error) {
        console.error('Error updating approval:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update approval details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getCarApproval,
    updateCarApproval
}; 