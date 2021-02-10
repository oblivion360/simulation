class Settings {
  emp = [];
}

class Emp {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

let set = new Settings();

function createEmployee() {
  let Employees = set.emp;
  let setEmp = new Emp(1, 'Albert');
  Employees.push(setEmp);
  console.log(Employees);
}
