var siteName = document.getElementById("bookmarkname");
var siteUrl = document.getElementById("siteUrl");
var allData = [];
if (localStorage.getItem("data") != null) {
  allData = JSON.parse(localStorage.getItem("data"));
  readData();
}

function addWebsite() {
  var validationResults = validateInputs();
  var prevent = preventSameName();
  if (
    validationResults.sitenameIsValid &&
    validationResults.urlIsValid &&
    prevent == false
  ) {
    var data = {
      name: siteName.value,
      url: siteUrl.value,
    };

    allData.push(data);
    localStorage.setItem("data", JSON.stringify(allData));
    clearInpute();
    readData();
  } else if (prevent == true) {
    Swal.fire("Bookmark Name Can Not Be The Same");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sitename Or URL Not Valid",
      footer: " Site Name Must Be at least 3 Charcaters and URL must Be Valid",
    });
  }

  console.log(prevent);
}

function clearInpute() {
  siteName.value = "";
  siteUrl.value = "";
}

function readData() {
  var ContainerData = "";
  for (var i = 0; i < allData.length; i++) {
    ContainerData += `<tr>
        <td>${i + 1}</td>
        <td>${allData[i].name}</td>
        <td><button onclick="visitWebsite(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-eye pe-2"></i> &nbsp; Visit</button></td>
        <td><button class="btn btn-outline-primary" onclick="deleteElement( ${i} )"><i class="fa-solid fa-trash-can"></i>&nbsp; Delete</button></td>
      </tr>`;
  }
  document.getElementById("tablecontnet").innerHTML = ContainerData;
}

function deleteElement(index) {
  allData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(allData));
  readData();
}

function validateInputs() {
  var validateData = {
    validateSitename: /^[a-z]{3,}$/,
    validateurl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };
  var isSitenameValid = validateData.validateSitename.test(siteName.value);
  var isWebsiteURLValid = validateData.validateurl.test(siteUrl.value);

  return {
    sitenameIsValid: isSitenameValid,
    urlIsValid: isWebsiteURLValid,
  };
}

function visitWebsite(idx) {
  if (idx >= 0 && idx < allData.length) {
    var urlToVisit = allData[idx].url;
    open(urlToVisit);
  }
}

function preventSameName() {
  for (var i = 0; i < allData.length; i++) {
    if (allData[i].name.includes(siteName.value)) {
      return true;
    }
  }
  return false;
}
