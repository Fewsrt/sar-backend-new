const { findCarsByMonth, findCarsByYear, removeCarsByMonth, removeCarsByYear, getStatistics } = require('../../models/car');

// ดึงข้อมูลรถตามเดือน
async function getCarsByMonth(req, res) {
    try {
        const { year, month } = req.params;
        const cars = await findCarsByMonth(parseInt(year), parseInt(month));
        res.json({
            success: true,
            data: cars
        });
    } catch (error) {
        console.error('Error fetching monthly cars:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cars',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลรถตามปี
async function getCarsByYear(req, res) {
    try {
        const { year } = req.params;
        const cars = await findCarsByYear(parseInt(year));
        res.json({
            success: true,
            data: cars
        });
    } catch (error) {
        console.error('Error fetching yearly cars:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cars',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ลบข้อมูลรถตามเดือน
async function deleteCarsByMonth(req, res) {
    try {
        const { year, month } = req.params;
        await removeCarsByMonth(parseInt(year), parseInt(month));
        res.json({
            success: true,
            message: 'Cars deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting monthly cars:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete cars',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ลบข้อมูลรถตามปี
async function deleteCarsByYear(req, res) {
    try {
        const { year } = req.params;
        await removeCarsByYear(parseInt(year));
        res.json({
            success: true,
            message: 'Cars deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting yearly cars:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete cars',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดูสถิติรถ
async function getCarStats(req, res) {
    try {
        const stats = await getStatistics();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching car statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getCarsByMonth,
    getCarsByYear,
    deleteCarsByMonth,
    deleteCarsByYear,
    getCarStats
}; 