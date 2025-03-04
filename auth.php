<?php
// ... existing code ...

class Auth {
    // ... existing methods ...

    public function login($username, $password) {
        if (empty($username) || empty($password)) {
            return json_encode(["status" => "error", "message" => "Username and password are required."]);
        }

        $sql = "SELECT * FROM tbl_users WHERE user_username = :username";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':username' => $username]);

        if ($stmt->rowCount() === 0) {
            return json_encode(["status" => "error", "message" => "User not found."]);
        }

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!password_verify($password, $user['user_pwd'])) {
            return json_encode(["status" => "error", "message" => "Invalid password."]);
        }

        // Always require OTP verification
        // Generate and send OTP immediately
        $otpResult = $this->sendOTP($user['user_email'], $user['user_id']);
        $otpData = json_decode($otpResult, true);

        if ($otpData['status'] === 'otp_sent') {
            return json_encode([
                "status" => "otp_required",
                "user_id" => $user['user_id'],
                "user_email" => $user['user_email'],
                "message" => "OTP has been sent to your email"
            ]);
        } else {
            return json_encode([
                "status" => "error",
                "message" => "Failed to send OTP. Please try again."
            ]);
        }
    }

    public function requestOTP($user_id, $email) {
        // Validate inputs
        if (empty($user_id) || empty($email)) {
            return json_encode(["status" => "error", "message" => "User ID and email are required."]);
        }

        // Verify user exists and email matches
        $stmt = $this->conn->prepare("SELECT user_id FROM tbl_users WHERE user_id = :user_id AND user_email = :email");
        $stmt->execute([':user_id' => $user_id, ':email' => $email]);

        if ($stmt->rowCount() === 0) {
            return json_encode(["status" => "error", "message" => "Invalid user credentials."]);
        }

        // Generate and send OTP
        return $this->sendOTP($email, $user_id);
    }

    // ... rest of existing code ...
}

// ... existing code ...

switch ($operation) {
    case "login":
        echo $auth->login($_POST['username'] ?? $jsonData['username'], $_POST['password'] ?? $jsonData['password']);
        break;
    case "register":
        echo $auth->register($_POST);
        break;
    case "verify_otp":
        echo $auth->verifyOTP($_POST['user_id'] ?? $jsonData['user_id'], $_POST['otp'] ?? $jsonData['otp']);
        break;
    case "request_otp":
        echo $auth->requestOTP(
            $_POST['user_id'] ?? $jsonData['user_id'],
            $_POST['email'] ?? $jsonData['email']
        );
        break;
    case "check_username":
        // ... existing check_username code ...
        break;
    default:
        error_log("Invalid action received: " . $operation);
        echo json_encode(["status" => "error", "message" => "Invalid action."]);
        break;
}
?>
