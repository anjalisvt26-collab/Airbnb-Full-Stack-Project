// Example starter JavaScript for preventing form submissions when there are invalid fields
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation');

 Array.from(forms).forEach((form) =>{
    form.addEventListener(
        "submit",
        (event) =>{
            if(!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        },
        false
    );
 });
})();