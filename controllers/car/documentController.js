const { updateDocuments, getDocuments, trackDocument, updateDocumentStatus } = require('../../models/car');

// อัพเดทเอกสาร
async function updateCarDocuments(req, res) {
    try {
        const { car_id } = req.params;
        const documentData = req.body;
        
        const updatedDocs = await updateDocuments(parseInt(car_id), documentData);
        
        res.json({
            success: true,
            data: updatedDocs
        });
    } catch (error) {
        console.error('Error updating documents:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update documents',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลเอกสาร
async function getCarDocuments(req, res) {
    try {
        const { car_id } = req.params;
        const documents = await getDocuments(parseInt(car_id));
        
        if (!documents) {
            return res.status(404).json({
                success: false,
                error: 'Documents not found'
            });
        }

        res.json({
            success: true,
            data: documents
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch documents',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ติดตามสถานะเอกสาร
async function trackCarDocument(req, res) {
    try {
        const { car_id, document_id } = req.params;
        const trackingInfo = await trackDocument(parseInt(car_id), parseInt(document_id));
        
        res.json({
            success: true,
            data: trackingInfo
        });
    } catch (error) {
        console.error('Error tracking document:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to track document',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทสถานะเอกสาร
async function updateCarDocumentStatus(req, res) {
    try {
        const { car_id, document_id } = req.params;
        const { status, notes } = req.body;
        
        const updatedStatus = await updateDocumentStatus(
            parseInt(car_id),
            parseInt(document_id),
            status,
            notes
        );
        
        res.json({
            success: true,
            data: updatedStatus
        });
    } catch (error) {
        console.error('Error updating document status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update document status',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    updateCarDocuments,
    getCarDocuments,
    trackCarDocument,
    updateCarDocumentStatus
}; 