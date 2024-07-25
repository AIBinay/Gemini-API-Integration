document.getElementById("generateBtn").addEventListener("click", function () {
  const jobDescription = document.getElementById("jobDescription").value;
  localStorage.setItem("jobDescription", jobDescription);
  window.location.href = "generate.html";
});
