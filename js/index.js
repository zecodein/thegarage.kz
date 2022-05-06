const form = document.getElementById("form");
const nameSurname = document.getElementById("nameSurname");
const tel = document.getElementById("tel");
const date = document.getElementById("date");
const time = document.getElementById("time");

form.addEventListener("submit", (e) => {
  submit = checkInputs();
  if (!submit) {
    e.preventDefault();
  } else {
    // document.getElementById("form").submit();
  }
});

function checkInputs() {
  var sumbitForm = true;

  // trim to remove the whitespaces
  const nameSurnameValue = nameSurname.value.trim();
  const telValue = tel.value.trim();
  const dateValue = date.value.trim();
  const timeValue = time.value.trim();

  submitForm = true;

  if (nameSurnameValue === "") {
    // setErrorFor(nameSurname, "Заполните поле Имя");
    submitForm = false;
  } else {
    // setSuccessFor(nameSurname);
  }

  if (telValue === "") {
    // setErrorFor(tel, "Заполните поле Номер");
    submitForm = false;
  } else if (!validatePhone(telValue)) {
    // setErrorFor(tel, "Неверный номер");
    submitForm = false;
  } else {
    // setSuccessFor(tel);
  }

  if (dateValue === "") {
    // setErrorFor(date, "Заполните поле Почта");
    submitForm = false;
  } else {
    // setSuccessFor(date);
  }

  if (timeValue === "") {
    // setErrorFor(time, "Заполните поле Почта");
    submitForm = false;
  } else {
    // setSuccessFor(time);
  }

  return submitForm;
}

// function setErrorFor(input, message) {
//   const formControl = input.parentElement;
//   const small = formControl.querySelector("small");
//   formControl.className = "form-control error";
//   small.innerText = message;
// }

// function setSuccessFor(input) {
//   const formControl = input.parentElement;
//   formControl.className = "form-control success";
// }

// function isEmail(email) {
//   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     email
//   );
// }

function validatePhone(phoneNumber) {
  var phoneNumberPattern = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
  return phoneNumberPattern.test(phoneNumber);
}



$("#form").submit(function (event) {
  event.preventDefault();
  $("#feedback").html("");
  setTimeout(function () {
    // Get data
    var data = {
      // "entry.2141224228": "Перезвонить",
      "entry.584655981": $("#nameSurname").val(),
      "entry.1023294698": $("#tel").val(),
      "entry.696841968": $("#date").val(),
      "entry.1482041227": $("#time").val(),
    };

    // Validate form
    var formSuccess = true;
    Object.keys(data).forEach(function (key, index) {
      if (
        !data[key]
      ) {
        formSuccess = false;
        $("#feedback").html(
          '<label  style=" border-radius: 1em; padding:10px;border: solid red 2px" class="text-danger text-center">Заполните поля корректно</label>'
        );
      }
    });
    if (!checkInputs()) {
      formSuccess = false;
      $("#feedback").html(
        '<label  style=" border-radius: 1em; padding:10px;border: solid red 2px" class="text-danger text-center">Заполните поля корректно</label>'
      );
    }

    if (formSuccess) {
      document.getElementById("submit").disabled = true;
      // Send request
      $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdyDfUuB1Cf5VqFU0ecsYsZIIFT3SzDbLvyrxnSEy-PuijBPg/formResponse",
        type: "POST",
        crossDomain: true,
        dataType: "xml",
        data: data,
        success: function (jqXHR, textStatus, errorThrown) {
          console.log("Enter on success");
          $("#feedback").html(
            '<label  style=" border-radius: 1em; padding:10px;border: solid green 2px" class="text-success text-center">Форма заполнена! На ваш почтовый ящик отправлено письмо с дальнейшими инструкциями!</label>'
          );
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Enter on error");
          $("#feedback").html(
            '<label style=" border-radius: 1em; padding:10px;border: solid green 2px"  class="text-success text-center">«Ваша заявка принята. В ближайшее время мы вам перезвоним!</label>'
          );
        },
      });
    }
  }, 300);
});
