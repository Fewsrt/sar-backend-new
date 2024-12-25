-- ออกแบบฐานข้อมูล ERP สำหรับธุรกิจซื้อขายรถยนต์มือสอง

-- ตารางสำหรับจัดการข้อมูลจังหวัดในประเทศไทย
CREATE TABLE Province (
    province_id SERIAL PRIMARY KEY,
    province_name VARCHAR(100) NOT NULL UNIQUE
);

-- ตารางสำหรับจัดการข้อมูลเขต/อำเภอ
CREATE TABLE District (
    district_id SERIAL PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    province_id INT REFERENCES Province(province_id)
);

-- ตารางสำหรับจัดการข้อมูลแขวง/ตำบล
CREATE TABLE Subdistrict (
    subdistrict_id SERIAL PRIMARY KEY,
    subdistrict_name VARCHAR(100) NOT NULL,
    district_id INT REFERENCES District(district_id)
);

-- ตารางสำหรับจัดการยี่ห้อรถยนต์
CREATE TABLE CarBrand (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL UNIQUE
);

-- ตารางสำหรับจัดการรุ่นรถยนต์
CREATE TABLE CarModel (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    brand_id INT REFERENCES CarBrand(brand_id)
);

-- ตารางสำหรับจัดการรุ่นย่อยของรถยนต์
CREATE TABLE CarSubModel (
    submodel_id SERIAL PRIMARY KEY,
    submodel_name VARCHAR(100) NOT NULL,
    model_id INT REFERENCES CarModel(model_id)
);

-- ตารางสำหรับจัดการข้อมูลรถยนต์มือสอง
CREATE TABLE Car (
    car_id SERIAL PRIMARY KEY,
    car_code VARCHAR(50) NOT NULL UNIQUE,
    purchase_date DATE,
    status VARCHAR(50) CHECK (status IN ('available', 'approved', 'income_received', 'not_ready_for_sale', 'in_use', 'returned_to_suanluang')), 
    approval_status BOOLEAN,
    approval_order INT,
    approval_date DATE,
    release_date DATE,
    book_close_date DATE,
    tax_invoice_sale_date DATE,
    book_sent_to_bank_date DATE,
    income_date DATE,
    transfer_status VARCHAR(50),
    fp VARCHAR(50),
    financing BOOLEAN,
    brand_id INT REFERENCES CarBrand(brand_id),
    model_id INT REFERENCES CarModel(model_id),
    submodel_id INT REFERENCES CarSubModel(submodel_id),
    registration_no VARCHAR(50) UNIQUE,
    registration_province VARCHAR(50),
    new_registration_no VARCHAR(50),
    new_registration_province VARCHAR(50),
    customer_id INT REFERENCES Customer(customer_id),
    salesperson_id INT REFERENCES Employee(employee_id),
    expected_income NUMERIC,
    expected_profit NUMERIC,
    car_tracking VARCHAR(100),
    tracking_note TEXT,
    note TEXT,
    car_image_link TEXT
);

-- ตารางสำหรับจัดการข้อมูลการเงินรถยนต์
CREATE TABLE CarFinancialDetails (
    car_id INT PRIMARY KEY REFERENCES Car(car_id),
    sale_price NUMERIC,
    net_cost NUMERIC,
    gross_profit NUMERIC,
    purchase_price NUMERIC,
    operation_cost NUMERIC,
    total_purchase_price NUMERIC,
    remaining_loan NUMERIC,
    paid_difference NUMERIC,
    total_income NUMERIC,
    transfer_finance NUMERIC,
    car_commission NUMERIC,
    down_payment NUMERIC,
    total_revenue NUMERIC,
    interest_fp NUMERIC,
    body_repair NUMERIC,
    service_cost NUMERIC,
    film_radio NUMERIC,
    seat_upholstery NUMERIC,
    tax_transfer NUMERIC,
    sales_commission NUMERIC,
    fuel_cost NUMERIC,
    referral_fee NUMERIC,
    trailer_cost NUMERIC,
    other_expenses NUMERIC,
    total_expenses NUMERIC,
    new_tires NUMERIC,
    installment_support NUMERIC,
    cash_back NUMERIC,
    other_promotions TEXT,
    total_promotion_expenses NUMERIC,
    final_profit NUMERIC
);

-- ตารางสำหรับจัดการข้อมูลลูกค้า
CREATE TABLE Customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(150) UNIQUE,
    address VARCHAR(255),
    subdistrict_id INT REFERENCES Subdistrict(subdistrict_id),
    district_id INT REFERENCES District(district_id),
    province_id INT REFERENCES Province(province_id),
    postal_code VARCHAR(10),
    tax_id VARCHAR(20) UNIQUE
);

-- ตารางสำหรับจัดการข้อมูลการจองรถยนต์
CREATE TABLE Reservation (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customer(customer_id),
    car_id INT REFERENCES Car(car_id),
    reservation_date DATE NOT NULL,
    status VARCHAR(50) CHECK (status IN ('active', 'cancelled')),
    note TEXT
);

-- ตารางสำหรับจัดการข้อมูลการขาย
CREATE TABLE Sale (
    sale_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Car(car_id),
    customer_id INT REFERENCES Customer(customer_id),
    sale_date DATE NOT NULL,
    sale_price NUMERIC NOT NULL,
    salesperson_id INT REFERENCES Employee(employee_id)
);

-- ตารางสำหรับพนักงาน
CREATE TABLE Employee (
    employee_id SERIAL PRIMARY KEY,
    employee_code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(50),
    full_name VARCHAR(150) NOT NULL,
    nickname VARCHAR(50),
    position VARCHAR(100),
    branch_province VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    profile_picture TEXT,
    employment_status VARCHAR(50),
    employee_card VARCHAR(50),
    line_uuid VARCHAR(100),
    role VARCHAR(50) CHECK (role IN ('sales', 'accounting', 'maintenance', 'admin', 'hr', 'purchasing', 'finance_bank')),
    branch_id INT REFERENCES Branch(branch_id)
);

-- ตารางสำหรับพนักงานธนาคาร
CREATE TABLE BankEmployee (
    bank_employee_id SERIAL PRIMARY KEY,
    bank_name VARCHAR(100) NOT NULL,
    employee_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(150) UNIQUE,
    position VARCHAR(100),
    note TEXT
);

-- ตารางสำหรับสาขาของบริษัท
CREATE TABLE Branch (
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    subdistrict_id INT REFERENCES Subdistrict(subdistrict_id),
    district_id INT REFERENCES District(district_id),
    province_id INT REFERENCES Province(province_id),
    postal_code VARCHAR(10),
    phone VARCHAR(20) UNIQUE
);

-- ตารางสำหรับข้อมูลการตรวจสอบรถยนต์ก่อนซ่อมบำรุง
CREATE TABLE CarInspection (
    inspection_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Car(car_id),
    inspection_date DATE NOT NULL,
    inspector_id INT REFERENCES Employee(employee_id),
    inspection_notes TEXT,
    before_repair_image_link TEXT
);

-- ตารางสำหรับข้อมูลการบำรุงรักษารถยนต์
CREATE TABLE Maintenance (
    maintenance_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Car(car_id),
    maintenance_date DATE NOT NULL,
    description TEXT,
    cost NUMERIC,
    employee_id INT REFERENCES Employee(employee_id),
    before_repair_image_link TEXT,
    after_repair_image_link TEXT,
    maintenance_status VARCHAR(50) CHECK (maintenance_status IN ('pending', 'in_progress', 'completed'))
);

-- ตารางสำหรับจัดการข้อมูลทางบัญชี
CREATE TABLE Accounting (
    accounting_id SERIAL PRIMARY KEY,
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('income', 'expense')),
    amount NUMERIC NOT NULL,
    transaction_date DATE NOT NULL,
    description TEXT,
    car_id INT REFERENCES Car(car_id),
    branch_id INT REFERENCES Branch(branch_id)
);

-- ตารางสำหรับผู้ผลิตรถยนต์หรือซัพพลายเออร์
CREATE TABLE Supplier (
    supplier_id SERIAL PRIMARY KEY,
    supplier_code VARCHAR(50) NOT NULL UNIQUE,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(150) UNIQUE,
    address VARCHAR(255),
    subdistrict_id INT REFERENCES Subdistrict(subdistrict_id),
    district_id INT REFERENCES District(district_id),
    province_id INT REFERENCES Province(province_id),
    postal_code VARCHAR(10),
    branch_id INT REFERENCES Branch(branch_id),
    tax_id VARCHAR(20) UNIQUE,
    type VARCHAR(50) CHECK (type IN ('manufacturer', 'supplier', 'finance'))
);

-- ตารางสำหรับข้อมูลประวัติการซื้อรถของลูกค้า
CREATE TABLE CustomerPurchaseHistory (
    history_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customer(customer_id),
    car_id INT REFERENCES Car(car_id),
    purchase_date DATE,
    purchase_price NUMERIC
);

-- ตารางสำหรับการติดตามการโอนเงินจากธนาคาร
CREATE TABLE BankTransferTracking (
    tracking_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Car(car_id),
    follow_up_number INT,
    follow_up_date DATE,
    bank_employee_id INT REFERENCES BankEmployee(bank_employee_id),
    follow_up_note TEXT
);

-- ตารางสำหรับจัดการข้อมูลการลงทะเบียนเข้างาน/ออกงานผ่าน LINE LIFF
CREATE TABLE Attendance (
    attendance_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employee(employee_id),
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    location VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('checked_in', 'checked_out', 'absent')),
    line_uuid VARCHAR(100) UNIQUE,
    note TEXT
);

-- ตารางสำหรับจัดการข้อมูลการไลฟ์สดขายรถยนต์
CREATE TABLE LiveSchedule (
    live_id SERIAL PRIMARY KEY,
    live_category VARCHAR(50) CHECK (live_category IN ('ไลฟ์สด', 'ไลฟ์ซ่อม', 'รีรัน')) NOT NULL,
    branch_id INT REFERENCES Branch(branch_id),
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP NOT NULL,
    description TEXT
);

-- ตารางสำหรับจัดการข้อมูลใบกำกับภาษี
CREATE TABLE TaxInvoice (
    invoice_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Car(car_id),
    invoice_date DATE NOT NULL,
    customer_id INT REFERENCES Customer(customer_id),
    sale_price_before_vat NUMERIC,
    vat_7_percent NUMERIC,
    sale_price_incl_vat NUMERIC,
    invoice_type VARCHAR(50) CHECK (invoice_type IN ('ซื้อ', 'ขาย')) NOT NULL
);

-- ตารางสำหรับจัดการข้อมูลใบกำกับภาษีซื้อ
CREATE TABLE PurchaseTaxInvoice (
    purchase_invoice_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Car(car_id),
    invoice_date DATE NOT NULL,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    supplier_id INT REFERENCES Supplier(supplier_id),
    product_value_before_vat NUMERIC,
    vat_7_percent NUMERIC,
    product_value_incl_operations NUMERIC,
    no_vat BOOLEAN
);