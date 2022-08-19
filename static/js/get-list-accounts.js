const form = new FormData();
// const userEmail = getLocalStorage('email');
const userEmail = "200@gmail.com";
const userGroup = "200";
form.append("group", userGroup);
form.append("email", userEmail);

let settings = {
  url: `${HOST_URL_EID_DAEMON}/accounts/list_accounts`,
  method: "POST",
  timeout: 0,
  processData: false,
  mimeType: "multipart/form-data",
  contentType: false,
  data: form,
};

$.ajax(settings).done(function (accountRes) {
  const accountObj = JSON.parse(accountRes);
  let settings2 = {
    url: `${HOST_URL_EID_DAEMON}/accounts/get_description`,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings2).done(function (skillRes) {
    const skillObj = JSON.parse(skillRes);
    renderTable(accountObj, skillObj);
  });
});

function renderTable(accountData, skillData) {
  const account = accountData.accounts;
  const description = skillData.description;

  const result = account.map((item, index) => {
    const key = Object.keys(description);
    return {
      account: item,
      description: description[key[index]] || "",
    };
  });

  console.log("result", result);
  let tbodyContent = "";
  let tbody = document.getElementById("tbody");
  result.forEach(function (item){
    let descriptionStr = item.description.replace(/\[|]/g,'');
    tbodyContent += `
    <tr>
      <td class="align-middle text-center">Chika</td>
      <td class="align-middle text-center">${item.account}</td>
      <td class="align-middle text-center">${descriptionStr}</td>
      <td class="align-middle text-center">20</td>
    </tr>
    `
    tbody.innerHTML = tbodyContent;
  });
}