const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

// Kayıt işlemi
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Emailin daha önce kullanılıp kullanılmadığını kontrol et
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ status: "error", message: "Email already exists" });
        }

        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni çalışan kaydını oluştur
        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
        });

        // Çalışanı veritabanına kaydet
        await newEmployee.save();

        // Başarıyla kaydedildiğinde geri dönüş yap
        res.status(201).json({
            status: "success",
            message: "Employee registered successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

// Giriş işlemi
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı email ile ara
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ status: "error", message: "Invalid credentials" });
        }

        // Şifreyi kontrol et
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Invalid credentials" });
        }

        // JWT token oluştur
        const token = jwt.sign(
            { employeeId: employee._id, email: employee.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token 1 saat geçerli olacak
        );

        // Token'i döndür
        res.json({
            status: "success",
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

module.exports = { register, login };
