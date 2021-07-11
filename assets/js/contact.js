const form = document.forms.contactForm;
const inputs = document.querySelectorAll('input, textarea');
const notification = document.getElementById('notification');
const modal = document.getElementById('contact');
const send = document.getElementById('send');
const showForm = document.getElementById('show_form');
const closeForm = document.getElementById('close_form');
const hideComponents = document.querySelectorAll(
  '.input_group, #send, .recaptcha_text',
);

// Error message keys for the 'input.validity' object
const customMessages = {
  valueMissing: 'Required',
  emailMismatch: 'Invalid email',
};

// Shows form
showForm.addEventListener('click', () => modal.classList.toggle('visible'));

// Hides form via 'x' button
closeForm.addEventListener('click', () => modal.classList.toggle('visible'));

// Hides form clicking outside the form
document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('#contact.visible'))
    modal.classList.toggle('visible');
});

// Hides form pressing 'esc'
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.querySelector('#contact.visible'))
    modal.classList.toggle('visible');
});

// **************************
//     Form POST request
// **************************

// Configures a POST req with formDataStr
async function postForm(formDataStr) {
  return await fetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: formDataStr,
  });
}

// Processes the form data and executes POST req
async function handleSubmit(e) {
  e.preventDefault();
  // Creates an object by iterating over the form properties
  const formDataObj = Object.fromEntries(new FormData(e.target));

  // Converts 'formDataObj' to a string
  const formDataStr = JSON.stringify(formDataObj);

  // Notifies user the form is sending
  send.textContent = 'Sending';

  try {
    // Executes the POST req passing in formDataStr
    const res = await postForm(formDataStr);
    if (res.ok) {
      // Injects success notice
      notification.classList.add('delivered');
      notification.textContent = 'Success, your message sent.';
    } else {
      throw new Error(`postForm failed`);
    }
  } catch (err) {
    // Injects failure notice
    notification.classList.add('undelivered');
    notification.innerHTML = `There's been an issue sending your message, you could try my <a title="My LinkedIn" href="https://www.linkedin.com/in/m-cartmell/" target="_blank" rel="noreferrer">LinkedIn</a>`;
    console.error(err);
  } finally {
    // Resets form inputs/styling
    send.textContent = 'Send';
    hideComponents.forEach((el) => (el.style.display = 'none'));
    form.reset();
    inputs.forEach((input) => input.classList.remove('valid'));
  }
}

// Sends the form data on submission
form.addEventListener('submit', handleSubmit);

// **************************
//      Form validation
// **************************

// Generates custom error messages
function getCustomMessage(type, validity) {
  if (validity.typeMismatch) {
    return customMessages[`${type}Mismatch`];
  } else {
    for (const invalidKey in customMessages) {
      if (validity[invalidKey]) {
        return customMessages[invalidKey];
      }
    }
  }
}

// Checks validity, and sets a custom error message if invalid
function checkValidity(input) {
  const message = input.validity.valid
    ? null
    : getCustomMessage(input.type, input.validity, customMessages);
  input.setCustomValidity(message || '');
}

// Inserts a custom input error message
function applyError(input, options) {
  const errorClass = 'validation_error';
  const parentErrorClass = 'contains_error';
  const insertError = options.insertError;
  const parent = input.parentNode;
  const error =
    parent.querySelector(`.${errorClass}`) || document.createElement('label');

  if (!input.validity.valid && input.validationMessage) {
    error.className = errorClass;
    error.textContent = input.validationMessage;

    if (insertError) {
      parent.appendChild(error, input);
      parent.classList.add(parentErrorClass);
    }
  } else {
    parent.classList.remove(parentErrorClass);
    error.remove();
  }
}

// Isolates form inputs to apply event listeners
inputs.forEach((input) => {
  // 'focus' hides label on selection
  input.addEventListener('focus', () => {
    const label = input.previousElementSibling;

    label.classList.add('input_focused');
  });

  // 'blur' triggers an event on deselection
  input.addEventListener('blur', () => {
    const label = input.previousElementSibling;

    checkValidity(input);
    applyError(input, { insertError: true });

    // Displays label if empty
    if (!input.value) label.classList.remove('input_focused');

    // Toggles error classes
    if (input.validity.valid) {
      input.classList.add('valid');
      input.classList.remove('error');
    } else {
      input.classList.add('error');
      input.classList.remove('valid');
    }
  });

  // 'invalid' updates/applies error messaging on submission
  input.addEventListener('invalid', (e) => {
    e.preventDefault();

    checkValidity(input);
    applyError(input, { insertError: true });
    input.classList.add('error');
  });
});
