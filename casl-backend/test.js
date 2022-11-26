const test = [
  {
    name: 'Company Admin',
    groupid: 'd216f943-82da-4da4-bc83-ba5db490d883',
    id: 'dd011b81-2a08-475c-83d6-22854c070fe0',
    subject: 'Company',
    fields: null,
    conditions: null,
    action: 'read',
  },
  {
    name: 'Super Admin',
    groupid: '35d40e9f-7757-4354-9a44-6c90984102e2',
    id: '43ff81ea-6210-431e-afc1-29e5683bdf1c',
    subject: 'Tenants',
    fields: null,
    conditions: null,
    action: 'create',
  },
  {
    name: 'Super Admin',
    groupid: '35d40e9f-7757-4354-9a44-6c90984102e2',
    id: '6bb75e89-fb32-4aa9-b8c9-ee0378f10e57',
    subject: 'Company',
    fields: null,
    conditions: null,
    action: 'test',
  },
  {
    name: 'Super Admin',
    groupid: '35d40e9f-7757-4354-9a44-6c90984102e2',
    id: 'fffc64fa-cf28-47d9-88e5-8654cf5de192',
    subject: 'Branch',
    fields: null,
    conditions: null,
    action: 'test',
  },
  {
    name: 'Super Admin',
    groupid: '35d40e9f-7757-4354-9a44-6c90984102e2',
    id: 'c51bcfa8-75dc-4ec6-bff5-5b35c869397d',
    subject: 'Users',
    fields: null,
    conditions: null,
    action: 'test',
  },
  {
    name: 'Tenant Admin',
    groupid: '4437c60a-81ca-42a3-b314-e80047337de8',
    id: null,
    subject: null,
    fields: null,
    conditions: null,
    action: null,
  },
];

const obj = {};

test.forEach((el) => {
  const { groupid, name, ...rest } = el;
  if (!obj[el.groupid]) {
    obj[el.groupid] = {
      id: el.groupid,
      name: el.name,
      permissions: [{ ...rest }],
    };
  } else {
    obj[el.groupid].permissions.push(rest);
  }
});
Object.values(obj).forEach((el) => {
  console.log('---', el);
});
