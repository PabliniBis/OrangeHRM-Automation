import { randomUUID } from 'crypto';

export function generateEmployeeData() {
  const uniqueValue = randomUUID().slice(0, 6);

  return {
    firstName: 'Auto',
    lastName: `Employee${uniqueValue}`,
    employeeId: `E${uniqueValue}`,
  };
}