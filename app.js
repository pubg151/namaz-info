let info_namaz = fetch("https://namaztimes.kz/api/praytimes?id=8666&type=json")
  .then((response) => response.json())
  .then((jsonData) => {
    let arr_taim_namaz = [];
    let arr_name_namaz = [
      "bamdat",
      "kun",
      "besin",
      "ekindi",
      "aqsham",
      "quptan",
    ];

    for (let i in jsonData.praytimes) {
      if (arr_name_namaz.some((item) => item == i)) {
        arr_taim_namaz.push(jsonData.praytimes[i]);
      }
    }
    for (let i = 0; i < arr_taim_namaz.length; i++) {
      if (arr_taim_namaz[i].length == 4) {
        arr_taim_namaz[i] = arr_taim_namaz[i].padStart(5, "0");
      }
    }
    let json_info_namaz = {};
    for (let i = 0; i < arr_name_namaz.length; i++) {
      json_info_namaz[arr_name_namaz[i]] = arr_taim_namaz[i];
    }
    // citi

    // дата
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let rial_data = document.querySelector(".rial_data");

    let date = jsonData.date.split("-");
    date = date
      .map((item, i) => {
        if (i == 1) {
          item = months[+item - 1];
        }
        return item;
      })
      .reverse();
    rial_data.innerHTML = `
    <div class="woreld">
        <div class="day">${date[0]}<span>${date[1]}</span></div>
        <div class="yer">${date[2]} <span>yer</span></div>
    </div>`;
    //время
    let taim_namaz = document.querySelector(".taim_namaz");
    taim_namaz.innerHTML = ` <div class="bondot">
                                <div class="name_b">Бондот</div>
                                <div class="taim_b">${json_info_namaz?.bamdat}</div>
                            </div>
                            <div class="voshot">
                                <div class="name_b">Васход</div>
                                <div class="taim_b">${json_info_namaz?.kun}</div>
                            </div>
                            <div class="peshen">
                                <div class="name_b">Пешен</div>
                                <div class="taim_b">${json_info_namaz?.besin}</div>
                            </div>
                            <div class="aser">
                                <div class="name_b">Асер</div>
                                <div class="taim_b">${json_info_namaz?.ekindi}</div>
                            </div>
                            <div class="shom">
                                <div class="name_b">Шом</div>
                                <div class="taim_b">${json_info_namaz?.aqsham}</div>
                            </div>
                            <div class="huton">
                                <div class="name_b">Хувтон</div>
                                <div class="taim_b">${json_info_namaz?.quptan}</div>
                            </div>`;
  });
