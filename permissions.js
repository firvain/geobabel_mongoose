const admin = [
  "read:clients",
  "read:roles",
  "update:roles",
  "read:unit",
  "write:unit",
  "delete:unit",
  "update:unit"
];
const director = [
  "delete:classes",
  "delete:lessons",
  "delete:students",
  "delete:tasks",
  "delete:teachers",
  "delete:unit",
  "read:classes",
  "read:lessons",
  "read:students",
  "read:tasks",
  "read:teachers",
  "read:unit",
  "update:classes",
  "update:lessons",
  "update:students",
  "update:tasks",
  "update:teachers",
  "update:unit",
  "write:classes",
  "write:lessons",
  "write:students",
  "write:tasks",
  "write:teachers",
  "write:unit"
];

const teacher = [
  "delete:lessons",
  "delete:tasks",
  "read:classes",
  "read:lessons",
  "read:students",
  "read:tasks",
  "update:lessons",
  "update:tasks",
  "write:lessons",
  "write:tasks"
];
const student = ["read:lessons", "read:tasks"];

module.exports = {
  admin,
  director,
  teacher,
  student
};
