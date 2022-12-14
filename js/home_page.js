let empPayrollList;

window.addEventListener('DOMContentLoaded', (_event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>StartDate</th><th>Actions</th>";
  if (empPayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of empPayrollList) {
    console.log(empPayrollData);
    innerHtml = `${innerHtml}
  <tr>
    <td class="profile"><img alt="" src="${empPayrollData._profilePic}"></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td>
    <td>${empPayrollData._salary}</td>
    <td>${empPayrollData._startDate}</td>
    <td>
      <img id="${empPayrollData._name}"  onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
      <img id="${empPayrollData._id}"  onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
    </td>
  </tr>
    `;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
  }
  return deptHtml;
}

const remove = (node) => {
  let empPayrollData = empPayrollList.find(empData => empData._name == node.id);
  if (!empPayrollData) return;
  const index = empPayrollList
    .map(empData => empData._name)
    .indexOf(empPayrollData._name);
  console.log(index);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
}

const update = (node) => {
  const empPayrollData = empPayrollList.find(empData => empData._id == node.id);
  if (!empPayrollData) return;
  localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
  window.location.replace(site_properties.add_emp_payroll_page)
}