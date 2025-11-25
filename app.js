// تنظیمات Supabase
const SUPABASE_URL = "https://ibjdpgmdpmhljwldwbfw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliamRwZ21kcG1obGp3bGR3YmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4Mzg2NjIsImV4cCI6MjA3OTQxNDY2Mn0.VripMe0vekDN5P8HStV04SVWJFQC2r06SuqPozWHVCE";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");
const resultMsg = document.getElementById("resultMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultMsg.textContent = "";
  loader.classList.remove("d-none");
  submitBtn.disabled = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2 || message.length < 5) {
    loader.classList.add("d-none");
    submitBtn.disabled = false;
    resultMsg.textContent = "لطفا فیلدها را به‌درستی وارد کنید.";
    resultMsg.style.color = "red";
    return;
  }

  const { error } = await supabaseClient
    .from("contact_form")
    .insert([{ name, email, message }]);

  loader.classList.add("d-none");
  submitBtn.disabled = false;

  if (error) {
    resultMsg.textContent = "خطا در ارسال اطلاعات!";
    resultMsg.style.color = "red";
  } else {
    resultMsg.textContent = "پیام شما با موفقیت ارسال شد.";
    resultMsg.style.color = "green";
    form.reset();
  }
});