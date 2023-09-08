import * as XLSX from "xlsx";

export const saveAsExcel = (data, names) => {
  const workbook = XLSX.utils.book_new();
  // Object.keys(worksheet).forEach(function (s) {
  //   if (worksheet[s].t === "n") {
  //     worksheet[s].z = "0";
  //     worksheet[s].t = "s";
  //   }
  // });
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, names + ".xlsx", { cellDates: true });
};
