const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const formData = { email: '', message: '' };

restore();

form.addEventListener('input', e => {
  const { name, value } = e.target;
  if (!(name in formData)) return;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!email || !message) return alert('Fill please all fields');

  formData.email = email; formData.message = message;
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = ''; formData.message = '';
});

function restore() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    if (typeof data.email === 'string') { form.elements.email.value = data.email; formData.email = data.email; }
    if (typeof data.message === 'string') { form.elements.message.value = data.message; formData.message = data.message; }
  } catch { localStorage.removeItem(STORAGE_KEY); }
}