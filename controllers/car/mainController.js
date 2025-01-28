const { createCar, findCarById, updateCarById, deleteCarById, findAllCars, findCarByCode, permanentDeleteCarById } = require('../../models/car');

// ดึงข้อมูลรถทั้งหมด
async function getAllCars(req, res) {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            status = '',
            sortBy = 'car_code',
            sortOrder = 'asc',
            brand_id,
            model_id,
            startDate,
            endDate,
            price_range,
            location_id
        } = req.query;

        const result = await findAllCars({
            page: parseInt(page),
            limit: parseInt(limit),
            search,
            status,
            sortBy,
            sortOrder,
            brand_id,
            model_id,
            startDate,
            endDate,
            price_range: price_range ? JSON.parse(price_range) : undefined,
            location_id
        });

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        console.error('Error fetching all cars:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cars',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// เพิ่มรถใหม่
async function addCar(req, res) {
    try {
        const newCar = await createCar(req.body);
        res.status(201).json({
            success: true,
            data: newCar
        });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลรถตาม ID
async function getCar(req, res) {
    try {
        const car = await findCarById(parseInt(req.params.car_id));
        if (!car) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }
        res.json({
            success: true,
            data: car
        });
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทข้อมูลรถ
async function updateCar(req, res) {
    try {
        const updatedCar = await updateCarById(parseInt(req.params.car_id), req.body);
        if (!updatedCar) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }
        res.json({
            success: true,
            data: updatedCar
        });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ลบข้อมูลรถ
async function deleteCar(req, res) {
    try {
        const result = await deleteCarById(parseInt(req.params.car_id));
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }
        res.json({
            success: true,
            message: 'Car deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ค้นหารถตาม car_code
async function getCarByCode(req, res) {
    try {
        const car = await findCarByCode(req.params.car_code);
        if (!car) {
            return res.status(404).json({
                success: false,
                error: 'Car not found'
            });
        }
        res.json({
            success: true,
            data: car
        });
    } catch (error) {
        console.error('Error fetching car by code:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Controller สำหรับลบข้อมูลรถถาวร (Hard Delete)
async function permanentDeleteCar(req, res) {
    try {
        const car_id = parseInt(req.params.car_id);
        
        // ตรวจสอบว่ารถมีอยู่หรือไม่
        const car = await findCarById(car_id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // ตรวจสอบสิทธิ์พิเศษ (ถ้าต้องการ)
        if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ error: 'Permission denied for permanent deletion' });
        }

        await permanentDeleteCarById(car_id);
        res.status(200).json({ 
            message: 'Car permanently deleted',
            car_id: car_id
        });
    } catch (error) {
        console.error('Error permanently deleting car:', error);
        res.status(500).json({ 
            error: 'Failed to permanently delete car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getAllCars,
    addCar,
    getCar,
    updateCar,
    deleteCar,
    getCarByCode,
    permanentDeleteCar
}; 