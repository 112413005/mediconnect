CREATE TABLE admin (
    admin_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    patient_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    age INT UNSIGNED NOT NULL,
    gender VARCHAR(20) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
    doctor_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    doctor_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    specialisation VARCHAR(100) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    medical_registration_number VARCHAR(50) NOT NULL,
    years_of_experience INT UNSIGNED NOT NULL,
    hospital_clinic_name VARCHAR(150) NOT NULL,
    available_days VARCHAR(100) NOT NULL,
    available_time TIME NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verification_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    verification_note VARCHAR(255) DEFAULT NULL
);

CREATE TABLE consultation (
    consultation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    patient_id INT UNSIGNED NOT NULL,
    doctor_id INT UNSIGNED NOT NULL,
    consultation_type VARCHAR(20) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    consultation_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    started_date DATETIME DEFAULT NULL,
    ended_date DATETIME DEFAULT NULL,
    FOREIGN KEY (patient_id) REFERENCES users(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE appointment (
    appointment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consultation_id INT UNSIGNED NOT NULL,
    patient_id INT UNSIGNED NOT NULL,
    doctor_id INT UNSIGNED NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason VARCHAR(255) DEFAULT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (consultation_id) REFERENCES consultation(consultation_id),
    FOREIGN KEY (patient_id) REFERENCES users(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE consultation_fee (
    fee_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consultation_id INT UNSIGNED NOT NULL,
    doctor_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) NOT NULL,
    payment_date DATETIME DEFAULT NULL,
    FOREIGN KEY (consultation_id) REFERENCES consultation(consultation_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE messages (
    message_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consultation_id INT UNSIGNED NOT NULL,
    sender_id INT NOT NULL,
    sender_type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    sent_at DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE prescription (
    prescription_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consultation_id INT UNSIGNED NOT NULL,
    advice VARCHAR(1000) NOT NULL,
    prescription VARCHAR(1000) DEFAULT NULL,
    follow_up_required VARCHAR(3) NOT NULL,
    in_person_required VARCHAR(3) NOT NULL,
    follow_up_notes VARCHAR(500) DEFAULT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (consultation_id) REFERENCES consultation(consultation_id)
);

CREATE TABLE rating_review (
    rating_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consultation_id INT UNSIGNED NOT NULL,
    patient_id INT UNSIGNED NOT NULL,
    doctor_id INT UNSIGNED NOT NULL,
    rating INT UNSIGNED NOT NULL,
    review VARCHAR(500) DEFAULT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (consultation_id) REFERENCES consultation(consultation_id),
    FOREIGN KEY (patient_id) REFERENCES users(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE reports (
    report_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reported_by INT UNSIGNED NOT NULL,
    reported_user INT UNSIGNED NOT NULL,
    reason VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    status VARCHAR(20) NOT NULL,
    admin_response VARCHAR(1000) DEFAULT NULL,
    created_at DATETIME NOT NULL
);
