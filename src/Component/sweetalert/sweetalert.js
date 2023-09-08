import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// export const Sweetalert = (title) => {
//   return Swal.fire({
//     title: title,
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "rgb(43, 53, 136)",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire("Deleted!", "Deleted Successfully.", "success");
//       return true;
//     } else {
//       return false;
//     }
//   });
// };

export const Sweetalert = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7a84d8",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Deleted Successfully.", "success");
      return true;
    }
    return false;
  });
};

export const Updatealert = (title) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Success",
    text: `${title} Succesfully Updated `,
    showConfirmButton: false,
    timer: 1500,
  });
};
export const insertAlert = (title) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Success",
    text: `${title} Succesfully Created `,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const Createalert = (title) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Success",
    text: `${title} Succesfully Created `,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const StepperFormAlert = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You want to save this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7a84d8",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Save it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: "Saved!",
        text: "Saved Successfully.",
        showConfirmButton: false,
        timer: 1500
      })
      return true
    }
    return false;
  });
};

export const Erroralert = (title, text) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};