function showGPU(id) {
  const showAll = document.querySelector(".showAllGPU");
  const showNvidia = document.querySelector(".showNvidia");
  const showAmd = document.querySelector(".showAmd");
  if (id === "allGPU" && window.getComputedStyle(showAll).display === "none") {
    $.ajax({
      type: "GET",
      url: "https://gpustocksapi.azurewebsites.net/api/gpu/getall",
      dataType: "text",
      async: true,
      success: function (result) {
        const parsResult = JSON.parse(result);
        // console.log(result);

        creatDivElement(parsResult, "allGPU");
      },
      error: function () {
        console.log("error");
      },
    });
  } else if (
    id === "nvidia" &&
    window.getComputedStyle(showNvidia).display === "none"
  ) {
    $.ajax({
      type: "GET",
      url: "https://gpustocksapi.azurewebsites.net/api/gpu/getchipsets?chipmaker=nvidia",
      dataType: "text",
      async: true,
      success: function (result) {
        const parsResult = JSON.parse(result);

        showChipset(parsResult, "showNvidia");
      },
      error: function () {
        console.log("error");
      },
    });
  } else if (
    id === "amd" &&
    window.getComputedStyle(showAmd).display === "none"
  ) {
    $.ajax({
      type: "GET",
      url: "https://gpustocksapi.azurewebsites.net/api/gpu/getchipsets?chipmaker=amd",
      dataType: "text",
      async: true,
      success: function (result) {
        const parsResult = JSON.parse(result);

        showChipset(parsResult, "showAMD");
      },
      error: function () {
        console.log("error");
      },
    });
    // divAmdInfo.style.display = divAmdInfo.style.display === 'block' ? 'none' : 'block';
    // amdNext.style.display = amdNext.style.display === 'block' ? 'none' : 'block';
  } else if (window.getComputedStyle(showAll).display === "block") {
    showAll.textContent = "";
    showAll.style.display = "none";
  } else if (window.getComputedStyle(showNvidia).display === "block") {
    showNvidia.textContent = "";
    showNvidia.style.display = "none";
  } else if (window.getComputedStyle(showAmd).display === "block") {
    showAmd.textContent = "";
    showAmd.style.display = "none";
  }
}

function creatDivElement(result, whatShow) {
  let getDivToShow;

  if (whatShow === "allGPU") {
    getDivToShow = document.querySelector(".showAllGPU");
    // console.log(getDivToShow);
  } else if (whatShow === "showNvidia") {
    getDivToShow = document.querySelector(".showNvidia");
  } else if (whatShow === "showAMD") {
    getDivToShow = document.querySelector(".showAmd");
  }

  if (window.getComputedStyle(getDivToShow).display === "none") {
    result.forEach((element) => {
      const newImg = document.createElement("img");
      // const nameP = document.createElement("p");
      // const chipMakerP = document.createElement("p");
      // const brandP = document.createElement("p");
      // const chipsetP = document.createElement("p");
      const btn = document.createElement("button");
      btn.setAttribute("onclick", "showOneID(this.id)");
      btn.setAttribute("class", "showBtn");
      btn.setAttribute("id", element.id);
      // btn.style.background = "transparent";
      // nameP.classList.add("centerEl");
      // chipMakerP.classList.add("centerEl");
      // brandP.classList.add("centerEl");
      // chipsetP.classList.add("centerEl");

      newImg.setAttribute("id", element.id);
      newImg.setAttribute("onclick", "showOneID(this.id)");
      getDivToShow.appendChild(newImg).setAttribute("src", element.imageUrl);
      // getDivToShow.appendChild(nameP).textContent = element.name;
      // getDivToShow.appendChild(chipsetP).textContent = element.chipset;
      // getDivToShow.appendChild(brandP).textContent = element.brand;
      // getDivToShow.appendChild(chipMakerP).textContent = element.chipMaker;

      const tableAll = document.createElement("table");
      tableAll.classList.add("tableAll");
      const tableTrName = document.createElement("tr");
      const tableTrChipset = document.createElement("tr");
      const tableTrBrand = document.createElement("tr");
      const tableTrChipMaker = document.createElement("tr");

      tableTrName.innerHTML = element.name;
      tableTrChipset.innerHTML = element.chipset;
      tableTrBrand.innerHTML = element.brand;
      tableTrChipMaker.innerHTML = element.chipMaker;

      tableAll.appendChild(tableTrName);
      tableAll.appendChild(tableTrChipset);
      tableAll.appendChild(tableTrBrand);
      tableAll.appendChild(tableTrChipMaker);

      // tableAll.appendChild(tableTr);

      getDivToShow.appendChild(tableAll);

      getDivToShow.appendChild(btn).textContent = "Pokaż";
    });
    // console.log(tableAll);
    getDivToShow.style.display = "block";
  } else {
    getDivToShow.innerHTML = "";
    getDivToShow.style.display = "none";
  }
}

function showChipset(result, whatShow) {
  if (whatShow === "showNvidia") {
    getDivToShow = document.querySelector(".showNvidia");
  } else if (whatShow === "showAMD") {
    getDivToShow = document.querySelector(".showAmd");
  }

  if (window.getComputedStyle(getDivToShow).display === "none") {
    result.forEach((element) => {
      const chipsetA = document.createElement("button");
      chipsetA.id = element;
      chipsetA.setAttribute("onclick", "showOne(this.id)");
      chipsetA.setAttribute("class", "showBtn");

      getDivToShow.appendChild(chipsetA).textContent = element;
    });
    getDivToShow.style.display = "block";
  } else {
    getDivToShow.innerHTML = "";
    getDivToShow.style.display = "none";
  }
}

function showOne(btnID) {
  // console.log(typeof btnID);
  $.ajax({
    type: "GET",
    url:
      "https://gpustocksapi.azurewebsites.net/api/gpu/getbychipset?chipset=" +
      btnID.toLowerCase(),
    dataType: "text",
    async: true,
    success: function (result) {
      // console.log(result);
      const parsResult = JSON.parse(result);
      // console.log(parsResult);

      createAllGPUChipset(parsResult);
    },
    error: function () {
      console.log("error");
    },
  });
}

function createAllGPUChipset(result) {
  const showDivByChipset = document.querySelector(".showAllGPUByChipset");
  const showOne = document.querySelector(".showOneGPU");
  const showStart = document.querySelector(".containGPU");
  // console.log(showDivByChipset);
  const btn = document.createElement("button");
  btn.setAttribute("onclick", "back()");
  btn.setAttribute("class", "showBtn");
  btn.textContent = "Wróć";
  showDivByChipset.appendChild(btn);

  if (window.getComputedStyle(showDivByChipset).display === "none") {
    result.forEach((element) => {
      const table = document.createElement("table");
      table.classList.add("tableAll");
      const newImg = document.createElement("img");
      const nameP = document.createElement("tr");
      const chipMakerP = document.createElement("tr");
      const brandP = document.createElement("tr");
      const chipsetP = document.createElement("tr");

      const btn = document.createElement("button");
      btn.setAttribute("onclick", "showOneID(this.id)");
      btn.setAttribute("class", "showBtn");
      btn.setAttribute("id", element.id);
      // btn.style.background = "transparent";

      newImg.setAttribute("id", element.id);
      newImg.setAttribute("onclick", "showOneID(this.id)");
      showDivByChipset
        .appendChild(newImg)
        .setAttribute("src", element.imageUrl);
      // showDivByChipset.appendChild(nameP).textContent = element.name;
      // showDivByChipset.appendChild(chipsetP).textContent = element.chipset;
      // showDivByChipset.appendChild(brandP).textContent = element.brand;
      // showDivByChipset.appendChild(chipMakerP).textContent = element.chipMaker;

      nameP.innerHTML = element.name;
      chipsetP.innerHTML = element.chipset;
      brandP.innerHTML = element.brand;
      chipMakerP.innerHTML = element.chipMaker;

      table.appendChild(nameP);
      table.appendChild(chipsetP);
      table.appendChild(brandP);
      table.appendChild(chipMakerP);

      showDivByChipset.appendChild(table);

      showDivByChipset.appendChild(btn).textContent = "Pokaż";
    });
    showDivByChipset.style.display = "block";
    showOne.style.display = "none";
    showStart.style.display = "none";
  } else {
    showDivByChipset.innerHTML = "";
    showDivByChipset.style.display = "none";
  }
}

function showOneID(btnID) {
  $.ajax({
    type: "GET",
    url:
      "https://gpustocksapi.azurewebsites.net/api/gpu/getgpu?id=" +
      btnID.toLowerCase(),
    dataType: "text",
    async: true,
    success: function (result) {
      const parsResult = JSON.parse(result);
      const arrResult = [parsResult];
      showContainerOneGPU(arrResult);
    },
    error: function () {
      console.log("error");
    },
  });
}

function showContainerOneGPU(result) {
  const showAllGPUByChipset = document.querySelector(".showAllGPUByChipset");
  const containerGPU = document.querySelector(".containGPU");
  const showOneGPU = document.querySelector(".showOneGPU");
  const newSnap = [];
  const tmpPriceXkom = [];
  const tmpPriceKomputronik = [];
  const tmpPriceMediaExpert = [];
  const tmpPriceMorele = [];
  const tmpLabelXkom = [];
  const tmpLabelKomputronik = [];
  const tmpLabelMediaExpert = [];
  const tmpLabelMorele = [];
  const tmpXkomUrl = [];
  const tmpKomputronikUrl = [];
  const tmpMediaExpertUrl = [];
  const tmpMoreleUrl = [];
  // const tmpAllUrl = [];

  const btn = document.createElement("button");
  btn.setAttribute("onclick", "back()");
  btn.setAttribute("class", "showBtn");
  btn.textContent = "Wróć";
  showOneGPU.appendChild(btn);

  // console.log(result);

  result.forEach((element) => {
    const tableOne = document.createElement("table");
    tableOne.classList.add("tableAll");
    const newImg = document.createElement("img");
    const nameP = document.createElement("tr");
    const chipMakerP = document.createElement("tr");
    const brandP = document.createElement("tr");
    const chipsetP = document.createElement("tr");
    const enabledGPU = document.createElement("tr");
    const currentAvailability = document.createElement("tr");
    currentAvailability.setAttribute("id", element.id);
    // currentAvailability.setAttribute("onClick", "checkAvailable(this.id)");
    currentAvailability.classList.add("centerEl");
    // const id = element.id;
    // let url;

    // nameP.classList.add("centerEl");
    // chipMakerP.classList.add("centerEl");
    // brandP.classList.add("centerEl");
    // chipsetP.classList.add("centerEl");
    // enabledGPU.classList.add("centerEl");

    showOneGPU.appendChild(newImg).setAttribute("src", element.imageUrl);
    tableOne.appendChild(nameP).textContent = element.name;
    tableOne.appendChild(chipsetP).textContent = element.chipset;
    tableOne.appendChild(brandP).textContent = element.brand;
    tableOne.appendChild(chipMakerP).textContent = element.chipMaker;

    element.priceSnapshots.forEach((price) => {
      if (price.productURL !== null && price.productURL !== "") {
        if (price.price > 0) {
          newSnap.push(price);
          if (price.productURL.includes("x-kom")) {
            tmpXkomUrl.push(price.productURL);
            tmpPriceXkom.push(price.price);
            const dateToArray = getDate(price);
            tmpLabelXkom.push(dateToArray);
          } else if (price.productURL.includes("komputronik")) {
            tmpKomputronikUrl.push(price.productURL);
            tmpPriceKomputronik.push(price.price);
            const dateToArray = getDate(price);
            tmpLabelKomputronik.push(dateToArray);
          } else if (price.productURL.includes("mediaexpert")) {
            tmpMediaExpertUrl.push(price.productURL);
            tmpPriceMediaExpert.push(price.price);
            const dateToArray = getDate(price);
            tmpLabelMediaExpert.push(dateToArray);
          } else if (price.productURL.includes("morele")) {
            tmpMoreleUrl.push(price.productURL);
            tmpPriceMorele.push(price.price);
            const dateToArray = getDate(price);
            tmpLabelMorele.push(dateToArray);
          }
        }
      }
    });

    // showOneGPU.appendChild(ulPrice).textContent =
    //   newSnap[newSnap.length - 1].price + " zł";

    const date = `${newSnap[newSnap.length - 1].snapshotDate.substr(
      8,
      2
    )}-${newSnap[newSnap.length - 1].snapshotDate.substr(5, 2)}-${newSnap[
      newSnap.length - 1
    ].snapshotDate.substr(0, 4)}`;
    tableOne.appendChild(enabledGPU).textContent =
      newSnap[newSnap.length - 1].isAvailable === "true"
        ? "W tej chwili niedostępna"
        : `Dostępna ostatnio: ${date}`;

    // if (tmpPriceXkom.length > 0) {
    //   url = tmpXkomUrl[tmpXkomUrl.length - 1];
    //   tmpAllUrl.push({ id: id, url: url });
    // }
    // if (tmpPriceKomputronik.length > 0) {
    //   url = tmpKomputronikUrl[tmpKomputronikUrl.length - 1];
    //   tmpAllUrl.push({ id: id, url: url });
    // }
    // if (tmpPriceMediaExpert.length > 0) {
    //   url = tmpMediaExpertUrl[tmpMediaExpertUrl.length - 1];
    //   tmpAllUrl.push({ id: id, url: url });
    // }
    // if (tmpPriceMorele.length > 0) {
    //   url = tmpMoreleUrl[tmpMoreleUrl.length - 1];
    //   tmpAllUrl.push({ id: id, url: url });
    // }

    // console.log(tmpAllUrl);

    // currentAvailability.setAttribute("onclick", `scrappData(${tmpAllUrl})`);
    currentAvailability.setAttribute("onclick", "checkAvailable(this.id)");
    tableOne.appendChild(currentAvailability).textContent =
      "Sprawdz dostępność";

    showOneGPU.appendChild(tableOne);

    showAllGPUByChipset.style.display = "none";
    containerGPU.style.display = "none";
    showOneGPU.style.display = "block";

    if (tmpPriceXkom.length > 0) {
      showChart(tmpPriceXkom, tmpLabelXkom, "X-kom"); //[2888, 2900, 2909, 3100],["24-05-2021", "28-05-2021", "29-05-2021", "04-06-2021"],
    }
    if (tmpPriceKomputronik.length > 0) {
      showChart(tmpPriceKomputronik, tmpLabelKomputronik, "Komputronik");
    }
    if (tmpPriceMediaExpert.length > 0) {
      showChart(tmpPriceMediaExpert, tmpLabelMediaExpert, "Media Expert");
    }
    if (tmpPriceMorele.length > 0) {
      showChart(tmpPriceMorele, tmpLabelMorele, "Morele");
    }
  });
}

function back() {
  const containerGPU = document.querySelector(".containGPU");
  const showOneGPU = document.querySelector(".showOneGPU");
  const showAllGPUByChipset = document.querySelector(".showAllGPUByChipset");

  showOneGPU.textContent = "";
  showAllGPUByChipset.textContent = "";
  containerGPU.style.display = "block";
  showOneGPU.style.display = "none";
  showAllGPUByChipset.style.display = "none";
}

function showChart(data, label, name) {
  const creatCanvas = document.createElement("canvas");
  creatCanvas.setAttribute("width", "400");
  creatCanvas.setAttribute("height", "400");
  let newData = data;
  let newLabel = label;

  // console.log(label);

  const showOneGPU = document.querySelector(".showOneGPU");

  if (label.length > 7) {
    newData = data.slice(Math.max(data.length - 7, 1));
    newLabel = label.slice(Math.max(data.length - 7, 1));
  }

  Chart.defaults.font.size = 14;
  Chart.defaults.borderColor = "#fff ";
  Chart.defaults.color = "#fff";

  let myChart = new Chart(
    creatCanvas,
    {
      type: "line",
      data: {
        // lineThickness: 5,
        labels: newLabel,
        datasets: [
          {
            label: "Cena GPU",
            data: newData,
            // data: [
            //   //**Change the color here
            //   { x: 10, y: 71 },
            //   { x: 20, y: 55 },
            //   { x: 30, y: 50 },
            //   { x: 40, y: 65 },
            // ],
            backgroundColor: ["#FEBD17"],
            borderColor: ["#FEBD17"],
            borderWidth: 6,

            // borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: name,
            color: "#f2f2f2",
          },
        },
      },
    }
    // elements: {},
  );
  // console.log(myChart.elements.line);

  showOneGPU.appendChild(creatCanvas);
}

function getDate(price) {
  const dateToArray = `${price.snapshotDate.substr(
    8,
    2
  )}-${price.snapshotDate.substr(5, 2)}-${price.snapshotDate.substr(0, 4)}`;

  return dateToArray;
}

function checkAvailable(id) {
  $.ajax({
    type: "GET",
    url: "https://gpustocksapi.azurewebsites.net/api/gpu//checkprices?id=" + id,
    dataType: "text",
    async: true,
    success: function (result) {
      const parsResult = JSON.parse(result);
      const xKom = "x-kom";
      const komputronik = "Komputronik";
      const mediaExpert = "Media Expert";
      const morele = "Morele";
      let availXkom = true;
      let availKomp = true;
      let availMedia = true;
      let availMorele = true;
      console.log(parsResult);
      parsResult.forEach((el) => {
        if (el.shopName.includes("x-kom")) {
          availXkom = el.isAvailable === true ? "dostępna" : "niedostępna";
        }
        if (el.shopName.includes("komputronik")) {
          availKomp = el.isAvailable === true ? "dostępna" : "niedostępna";
        }
        if (el.shopName.includes("mediaexpert")) {
          availMedia = el.isAvailable === true ? "dostępna" : "niedostępna";
        }
        if (el.productURL.includes("gigabyte-geforce-gtx-1660-oc")) {
          availMorele = "dostępne";
        }
        if (el.productURL.includes("gigabyte-geforce-rtx-2060-oc-6gb")) {
          console.log(el.productURL);
          availMorele = "niedostępna";
        }
        if (el.productURL.includes("palit-geforce-gtx-1660-super")) {
          console.log(el.productURL);
          availMorele = "niedostępna";
        }
        if (el.productURL.includes("gigabyte-geforce-rtx-2060-oc-6gb")) {
          console.log(el.productURL);
          availMorele = "niedostępna";
        }
        if (el.productURL.includes("gigabyte-geforce-rtx-2060-oc-6gb")) {
          console.log(el.productURL);
          availMorele = "niedostępna";
        }
      });

      Swal.fire({
        title: "<strong>Sprawdzono!</strong>",
        html:
          "<button class='showBtnPopup btnXkom'>x-kom</button>" +
          "<button class='showBtnPopup btnKomputronik'>Komputronik</button>" +
          "<button class='showBtnPopup btnMedia'>Media Expert</button>" +
          "<button class='showBtnPopup btnMorele'>Morele</button>",
        confirmButtonText: "Wyjdz",

        didOpen: () => {
          if (availXkom === "niedostępna") {
            const btn = document.querySelector(".btnXkom");
            btn.disabled = true;
            btn.style.background = "linear-gradient(black, grey)";
            btn.style.boxShadow = "none";
            btn.style.filter = "blur(2px)";
          }
          if (availKomp === "niedostępna") {
            const btn = document.querySelector(".btnKomputronik");
            btn.disabled = true;
            btn.style.background = "linear-gradient(black, grey)";
            btn.style.filter = "blur(2px)";
          }
          if (availMedia === "niedostępna") {
            const btn = document.querySelector(".btnMedia");
            btn.disabled = true;
            btn.style.background = "linear-gradient(black, grey)";
            btn.style.filter = "blur(2px)";
          }
          if (availMorele === "niedostępna") {
            const btn = document.querySelector(".btnMorele");
            btn.disabled = true;
            btn.style.background = "linear-gradient(black, grey)";
            btn.style.filter = "blur(2px)";
          }
        },
        customClass: {
          confirmButton: "showBtnPopupConfirm",
        },
      });
    },
    error: function () {
      console.log("error");
    },
  });
}

function btnChangeColor(id) {
  const btn = document.getElementById(id);

  btn.classList.toggle("btnColorTransparent");
}
