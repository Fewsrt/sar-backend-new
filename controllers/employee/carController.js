const { createCar, findCarById, updateCarById, deleteCarById, findCarsByMonth, findCarsByYear, removeCarsByMonth, removeCarsByYear, getStatistics, findAllCars, findCarByCode } = require('../../models/car.js');

// Controller สำหรับสร้างข้อมูลรถใหม่ (Create)
async function addCar(req, res) {
    try {
        const newCar = await createCar(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ 
            error: 'Failed to create car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Controller สำหรับค้นหาข้อมูลรถ (Read)
async function getCar(req, res) {
    try {
        const car = await findCarById(parseInt(req.params.car_id));
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Controller สำหรับอัพเดทข้อมูลรถ (Update)
async function updateCar(req, res) {
    try {
        const updatedCar = await updateCarById(parseInt(req.params.car_id), req.body);
        res.json(updatedCar);
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ 
            error: 'Failed to update car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Controller สำหรับลบข้อมูลรถ (Delete)
async function deleteCar(req, res) {
    try {
        await deleteCarById(parseInt(req.params.car_id));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ 
            error: 'Failed to delete car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลรถตามเดือน
async function getCarsByMonth(req, res) {
    try {
        const { year, month } = req.params;
        const cars = await findCarsByMonth(parseInt(year), parseInt(month));
        res.json(cars);
    } catch (error) {
        console.error('Error fetching monthly cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
}

// ดึงข้อมูลรถตามปี
async function getCarsByYear(req, res) {
    try {
        const { year } = req.params;
        const cars = await findCarsByYear(parseInt(year));
        res.json(cars);
    } catch (error) {
        console.error('Error fetching yearly cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
}

// ลบข้อมูลรถตามเดือน
async function deleteCarsByMonth(req, res) {
    try {
        const { year, month } = req.params;
        await removeCarsByMonth(parseInt(year), parseInt(month));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting monthly cars:', error);
        res.status(500).json({ error: 'Failed to delete cars' });
    }
}

// ลบข้อมูลรถตามปี
async function deleteCarsByYear(req, res) {
    try {
        const { year } = req.params;
        await removeCarsByYear(parseInt(year));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting yearly cars:', error);
        res.status(500).json({ error: 'Failed to delete cars' });
    }
}

// ดูสถิติรถ
async function getCarStats(req, res) {
    try {
        const stats = await getStatistics();
        res.json(stats);
    } catch (error) {
        console.error('Error fetching car statistics:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
}

// Controller สำหรับดึงข้อมูลทั้งหมด
async function getAllCars(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10000;
        const search = req.query.search || '';
        const status = req.query.status || '';
        const sortBy = req.query.sortBy || 'car_code';
        const sortOrder = req.query.sortOrder || 'asc';

        const result = await findAllCars({
            page,
            limit,
            search,
            status,
            sortBy,
            sortOrder
        });

        res.json(result);
    } catch (error) {
        console.error('Error fetching all cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
}

// Controller สำหรับค้นหารถด้วย car_code
async function getCarByCode(req, res) {
    try {
        const car = await findCarByCode(req.params.car_code);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        console.error('Error fetching car by code:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = { addCar, getCar, updateCar, deleteCar, getCarsByMonth, getCarsByYear, deleteCarsByMonth, deleteCarsByYear, getCarStats, getAllCars, getCarByCode };