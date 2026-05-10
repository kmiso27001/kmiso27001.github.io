<?php
$host = "localhost";
$user = "db_user";
$pass = "db_pass";
$dbname = "database";

header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create users table
    $sql_users = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user'
    )";
    $pdo->exec($sql_users);

    // Create products table
    $sql_products = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
    )";
    $pdo->exec($sql_products);

    // Clear existing data
    $pdo->exec("TRUNCATE TABLE users");
    $pdo->exec("TRUNCATE TABLE products");

    // Insert dummy data for users
    $stmt_users = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    $stmt_users->execute(['admin', 'password123', 'administrator']);
    $stmt_users->execute(['student', 'stu456', 'student']);

    // Insert dummy data for products
    $stmt_products = $pdo->prepare("INSERT INTO products (id, name, description) VALUES (?, ?, ?)");
    $stmt_products->execute([1, 'Laptop', 'High performance laptop']);
    $stmt_products->execute([2, 'Smartphone', 'Latest smartphone model']);

    echo json_encode(['status' => 'success', 'message' => '資料庫初始化成功！包含測試帳號與產品資料。']);
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => '資料庫錯誤: ' . $e->getMessage()]);
}
?>
