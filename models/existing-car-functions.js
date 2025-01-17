const { google } = require('googleapis');
const prisma = require('../config/db.js');
const path = require('path');
const { generateCarCode } = require('./carCode');

// ฟังก์ชันสำหรับสร้างโฟลเดอร์ใน Google Drive
async function createFolderInGoogleDrive(car_id, car_code) {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, '../fewmanager-8adc1-a03afe6e4ee8.json'),
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    try {
        const folderMetadata = {
            name: car_code,
            mimeType: 'application/vnd.google-apps.folder',
        };

        const folder = await drive.files.create({
            resource: folderMetadata,
            fields: 'id',
        });

        const fileId = folder.data.id;
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const shareLink = `https://drive.google.com/drive/folders/${fileId}`;

        // ค้นหา carGeneralInfo ที่มีอยู่แล้ว
        const existingInfo = await prisma.carGeneralInfo.findFirst({
            where: {
                car_id: car_id,
            },
        });

        if (existingInfo) {
            // ถ้ามีอยู่แล้ว ให้อัพเดท
            await prisma.carGeneralInfo.update({
                where: {
                    id: existingInfo.id,
                },
                data: {
                    car_image_link: shareLink,
                },
            });
        } else {
            // ถ้ายังไม่มี ให้สร้างใหม่
            await prisma.carGeneralInfo.create({
                data: {
                    car_id: car_id,
                    car_image_link: shareLink,
                },
            });
        }

        return shareLink;
    } catch (error) {
        console.error('Error creating folder in Google Drive:', error);
        throw new Error('Failed to create folder in Google Drive');
    }
}

// Create
async function createCar(data) {
    const {
        // แยกข้อมูลตาม categories
        // ข้อมูลพื้นฐาน
        brand_id, model_id, submodel_id, color_id,
        status, car_tracking, purchase_date,
        license_plate_no, license_plate_province,
        new_license_plate_no, new_license_plate_province,
        chassis_no, engine_no, mileage,
        registration_date, registration_date_year,
        registration_date_month, registration_date_day,

        // ข้อมูลการเงิน
        financialDetails,

        // ข้อมูลค่าใช้จ่าย
        expenseDetails,

        // ข้อมูลการอนุมัติ
        approvalDetails,

        // ข้อมูลสถานที่
        locationDetails,

        // ข้อมูลภาษี
        taxDetails,

        // ข้อมูลการติดตามเอกสาร
        documentTracking,

        // ข้อมูลผู้เกี่ยวข้อง
        associatedEntities,

        // ข้อมูลทั่วไป
        generalInfo,

        ...otherData
    } = data;

    // สร้างรถยนต์ในฐานข้อมูล
    const { car_code, year, month } = await generateCarCode();

    const newCar = await prisma.car.create({
        data: {
            // ข้อมูลพื้นฐาน
            car_code,
            status,
            car_tracking,
            purchase_date,
            license_plate_no,
            license_plate_province,
            new_license_plate_no,
            new_license_plate_province,
            chassis_no,
            engine_no,
            mileage,
            registration_date,
            registration_date_year,
            registration_date_month,
            registration_date_day,
            year,
            month,

            // Relations
            car_brand: brand_id ? {
                connect: { brand_id }
            } : undefined,
            car_model: model_id ? {
                connect: { model_id }
            } : undefined,
            car_submodel: submodel_id ? {
                connect: { submodel_id }
            } : undefined,
            color: color_id ? {
                connect: { color_id }
            } : undefined,

            // Create related records
            financialDetails: {
                create: financialDetails
            },
            // expenseDetails: {
            //     create: expenseDetails
            // },
            approvalDetails: {
                create: approvalDetails
            },
            locationDetails: {
                create: locationDetails
            },
            taxDetails: {
                create: taxDetails
            },
            documentTracking: {
                create: documentTracking
            },
            associatedEntities: {
                create: associatedEntities
            },
            generalInfo: {
                create: generalInfo
            },

            ...otherData
        },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            financialDetails: true,
            expenseDetails: true,
            approvalDetails: true,
            locationDetails: true,
            taxDetails: true,
            documentTracking: true,
            associatedEntities: true,
            generalInfo: true
        }
    });

    // สร้าง Google Drive folder และอัพเดท car_image_link
    await createFolderInGoogleDrive(newCar.car_id, data.car_code);

    return newCar;
}

// Read
async function findCarById(car_id) {
    return await prisma.car.findUnique({
        where: { car_id },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            financialDetails: true,
            expenseDetails: {
                include: {
                    category: true
                }
            },
            approvalDetails: true,
            locationDetails: {
                include: {
                    parking_location: true,
                    sale_branch: true,
                    branch_50_percent: true
                }
            },
            taxDetails: {
                include: {
                    purchase_tax_invoices: {
                        include: {
                            purchaseTaxInvoice: true
                        }
                    },
                    withholding_tax_invoices: {
                        include: {
                            withholdingTaxInvoice: true
                        }
                    },
                    sale_tax_invoices: {
                        include: {
                            taxInvoice: true
                        }
                    }
                }
            },
            documentTracking: {
                include: {
                    financing: true
                }
            },
            associatedEntities: {
                include: {
                    purchase_from: true,
                    customer: true,
                    salesperson: true
                }
            },
            generalInfo: true,
            reservation: true,
            sale: true,
            carInspection: true,
            maintenance: true,
            accounting: true,
            customerPurchaseHistory: true,
            bankTransferTracking: true
        }
    });
}

// Update
async function updateCarById(car_id, data) {
    const {
        financialDetails,
        expenseDetails,
        approvalDetails,
        locationDetails,
        taxDetails,
        documentTracking,
        associatedEntities,
        generalInfo,
        ...mainData
    } = data;

    // Start transaction
    return await prisma.$transaction(async (prisma) => {
        // Update main car data
        const updatedCar = await prisma.car.update({
            where: { car_id },
            data: mainData
        });

        // Update related records if provided
        if (financialDetails) {
            await prisma.carFinancialDetails.updateMany({
                where: { car_id },
                data: financialDetails
            });
        }

        if (approvalDetails) {
            await prisma.carApprovalDetails.updateMany({
                where: { car_id },
                data: approvalDetails
            });
        }

        if (locationDetails) {
            await prisma.carLocationDetails.updateMany({
                where: { car_id },
                data: locationDetails
            });
        }

        if (taxDetails) {
            await prisma.carTaxDetails.updateMany({
                where: { car_id },
                data: taxDetails
            });
        }

        if (documentTracking) {
            await prisma.carDocumentTracking.updateMany({
                where: { car_id },
                data: documentTracking
            });
        }

        if (associatedEntities) {
            await prisma.carAssociatedEntities.updateMany({
                where: { car_id },
                data: associatedEntities
            });
        }

        if (generalInfo) {
            await prisma.carGeneralInfo.updateMany({
                where: { car_id },
                data: generalInfo
            });
        }

        return findCarById(car_id); // Return full updated data
    });
}

// Delete (Soft Delete)
async function deleteCarById(car_id) {
    const now = new Date();
    return await prisma.$transaction([
        prisma.car.update({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carFinancialDetails.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carExpenseDetails.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carApprovalDetails.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carLocationDetails.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carTaxDetails.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carDocumentTracking.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carAssociatedEntities.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.carGeneralInfo.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        // เพิ่มการลบข้อมูลที่เกี่ยวข้องอื่น ๆ ที่จำเป็น
        prisma.carInspection.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.maintenance.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.accounting.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.customerPurchaseHistory.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
        prisma.bankTransferTracking.updateMany({
            where: { car_id },
            data: { deleted_at: now }
        }),
    ]);
}

// Find All Cars with advanced filtering
async function findAllCars({ 
    page, 
    limit, 
    search, 
    status,
    sortBy,
    sortOrder,
    startDate,
    endDate,
    brand_id,
    model_id,
    price_range,
    location_id
}) {
    const where = {
        deleted_at: null,
        AND: [
            search ? {
                OR: [
                    { car_code: { contains: search, mode: 'insensitive' } },
                    { license_plate_no: { contains: search, mode: 'insensitive' } },
                    { chassis_no: { contains: search, mode: 'insensitive' } }
                ]
            } : undefined,
            status ? { status } : undefined,
            brand_id ? { brand_id: parseInt(brand_id) } : undefined,
            model_id ? { model_id: parseInt(model_id) } : undefined,
            startDate && endDate ? {
                purchase_date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            } : undefined,
            price_range ? {
                financialDetails: {
                    some: {
                        sale_price: {
                            gte: price_range.min,
                            lte: price_range.max
                        }
                    }
                }
            } : undefined,
            location_id ? {
                locationDetails: {
                    some: {
                        parking_id: parseInt(location_id)
                    }
                }
            } : undefined
        ].filter(Boolean)
    };

    const [cars, total] = await Promise.all([
        prisma.car.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where,
            include: {
                car_brand: true,
                car_model: true,
                car_submodel: true,
                color: true,
                financialDetails: true,
                locationDetails: {
                    include: {
                        parking_location: true
                    }
                },
                generalInfo: true,
                expenseDetails: true,
                approvalDetails: true
            },
            orderBy: {
                [sortBy]: sortOrder
            }
        }),
        prisma.car.count({ where })
    ]);

    return {
        data: cars,
        pagination: {
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            limit,
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    };
}

// ฟังก์ชันเพิ่มเติมที่อาจมีอยู่

// ค้นหารถตามเดือน
async function findCarsByMonth(year, month) {
    return await prisma.car.findMany({
        where: {
            purchase_date: {
                gte: new Date(year, month - 1, 1), // เริ่มต้นเดือน
                lt: new Date(year, month, 1) // สิ้นสุดเดือน
            },
            deleted_at: null // ตรวจสอบว่าไม่ได้ถูกลบ
        },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            financialDetails: true,
            locationDetails: true,
            generalInfo: true
        }
    });
}

// ค้นหารถตามปี
async function findCarsByYear(year) {
    return await prisma.car.findMany({
        where: {
            purchase_date: {
                gte: new Date(year, 0, 1), // เริ่มต้นปี
                lt: new Date(year + 1, 0, 1) // สิ้นสุดปี
            },
            deleted_at: null // ตรวจสอบว่าไม่ได้ถูกลบ
        },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            financialDetails: true,
            locationDetails: true,
            generalInfo: true
        }
    });
}

// ลบรถตามเดือน
async function removeCarsByMonth(year, month) {
    const now = new Date();
    return await prisma.$transaction([
        prisma.car.updateMany({
            where: {
                purchase_date: {
                    gte: new Date(year, month - 1, 1), // เริ่มต้นเดือน
                    lt: new Date(year, month, 1) // สิ้นสุดเดือน
                },
                deleted_at: null // ตรวจสอบว่าไม่ได้ถูกลบ
            },
            data: { deleted_at: now }
        }),
        // ลบข้อมูลที่เกี่ยวข้องอื่น ๆ ที่จำเป็น
        prisma.carFinancialDetails.updateMany({
            where: {
                car: {
                    purchase_date: {
                        gte: new Date(year, month - 1, 1),
                        lt: new Date(year, month, 1)
                    }
                }
            },
            data: { deleted_at: now }
        }),
        prisma.carExpenseDetails.updateMany({
            where: {
                car: {
                    purchase_date: {
                        gte: new Date(year, month - 1, 1),
                        lt: new Date(year, month, 1)
                    }
                }
            },
            data: { deleted_at: now }
        }),
        // เพิ่มการลบข้อมูลที่เกี่ยวข้องอื่น ๆ ที่จำเป็น
    ]);
}

// ลบรถตามปี
async function removeCarsByYear(year) {
    const now = new Date();
    return await prisma.$transaction([
        prisma.car.updateMany({
            where: {
                purchase_date: {
                    gte: new Date(year, 0, 1), // เริ่มต้นปี
                    lt: new Date(year + 1, 0, 1) // สิ้นสุดปี
                },
                deleted_at: null // ตรวจสอบว่าไม่ได้ถูกลบ
            },
            data: { deleted_at: now }
        }),
        // ลบข้อมูลที่เกี่ยวข้องอื่น ๆ ที่จำเป็น
        prisma.carFinancialDetails.updateMany({
            where: {
                car: {
                    purchase_date: {
                        gte: new Date(year, 0, 1),
                        lt: new Date(year + 1, 0, 1)
                    }
                }
            },
            data: { deleted_at: now }
        }),
        prisma.carExpenseDetails.updateMany({
            where: {
                car: {
                    purchase_date: {
                        gte: new Date(year, 0, 1),
                        lt: new Date(year + 1, 0, 1)
                    }
                }
            },
            data: { deleted_at: now }
        }),
        // เพิ่มการลบข้อมูลที่เกี่ยวข้องอื่น ๆ ที่จำเป็น
    ]);
}

// ดึงสถิติรถ
async function getStatistics() {
    const totalCars = await prisma.car.count({
        where: { deleted_at: null }
    });

    const totalSales = await prisma.accounting.aggregate({
        _sum: {
            amount: true
        },
        where: {
            transaction_type: 'sale',
            car: {
                deleted_at: null
            }
        }
    });

    return {
        totalCars,
        totalSales: totalSales._sum.amount || 0
    };
}

// ค้นหารถตาม car_code
async function findCarByCode(car_code) {
    return await prisma.car.findUnique({
        where: { car_code },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            financialDetails: true,
            locationDetails: true,
            generalInfo: true
        }
    });
}

module.exports = {
    createCar,
    findCarById,
    updateCarById,
    deleteCarById,
    findAllCars,
    findCarsByMonth,
    findCarsByYear,
    removeCarsByMonth,
    removeCarsByYear,
    getStatistics,
    findCarByCode,
};
