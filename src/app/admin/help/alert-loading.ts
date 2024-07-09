import Swal from "sweetalert2";

export const alertLoading = () => {
  Swal.fire({
    html: '<div class="loader"></div>',
    position: 'bottom-end',
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    allowEnterKey: false,
    customClass: {
      popup: 'load-cont-2',
    }
  });
}
