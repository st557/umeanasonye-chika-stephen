// Contact Form Submit
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission (page reload)

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<div class="loading"></div> Sending...';
  submitBtn.disabled = true;

  // Get the form's action URL (your Formspree endpoint)
  const formAction = contactForm.getAttribute('action');
  
  // Create a FormData object from the form
  const formData = new FormData(contactForm);

  try {
    const response = await fetch(formAction, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success!
      formSuccess.classList.remove('hidden');
      formError.classList.add('hidden');
      contactForm.reset(); // Clear the form fields
    } else {
      // Error from Formspree
      const data = await response.json();
      throw new Error(data.error || 'Something went wrong.');
    }
  } catch (error) {
    // Network error or other issue
    console.error('Form submission error:', error);
    formError.classList.remove('hidden');
    formSuccess.classList.add('hidden');
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Hide success message after a few seconds
    setTimeout(() => {
      formSuccess.classList.add('hidden');
    }, 5000);
  }
});