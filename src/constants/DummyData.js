export const generateSampleData = (numRows) => {
  const data = [];

  for (let i = 1; i <= numRows; i++) {
    data.push({
      total_qty: Math.floor(5 * Math.random()),
      remarks: `Remark ${i}`,
      product: {
        product_id: i,
        product_name: `p_name ${i}`,
        product_code: `p_code ${i}`,
      },
      employee: {
        emp_id: i,
        display_name: `Employee ${i}`,
        emp_code: `Emp#${String(i).padStart(3, "0")}`,
      },
    });
  }

  return data;
};

export const generateSampleDataForTable = (numRows) => {
  const data = [];

  for (let i = 1; i <= numRows; i++) {
    data.push({
      id: i,
      code: `Emp#${String(i).padStart(3, "0")}`,
      product_name: `p_name ${i}`,
      quantity: Math.floor(5 * Math.random()),
      remarks: `Remark ${i}`,
    });
  }

  return data;
};
