document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Animate counters
  function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const step = target / 100;
      function updateCounter() {
        if (count < target) {
          count = Math.min(count + step, target);
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      updateCounter();
    });
  }

  // Trigger counters when stats section is visible
  const statsSection = document.querySelector("#stats");
  let hasAnimated = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);

  // Tilt effect on stats card
  const statsCard = document.querySelector(".stats-card");
  statsCard.addEventListener("mousemove", (e) => {
    const { offsetWidth: width, offsetHeight: height } = statsCard;
    const { offsetX: x, offsetY: y } = e;
    const rotateX = ((y / height) - 0.5) * 20;
    const rotateY = ((x / width) - 0.5) * 20;
    statsCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    statsCard.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(0,0,0,0.5)`;
  });
  statsCard.addEventListener("mouseleave", () => {
    statsCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    statsCard.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
  });

  // Slideshow
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
  showSlide(currentSlide);

  // Confetti
  function launchConfetti() {
    const confetti = document.createElement("div");
    confetti.textContent = "🏀";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-50px";
    confetti.style.fontSize = "2rem";
    confetti.style.animation = "fall 3s linear forwards";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }

  const style = document.createElement("style");
  style.textContent = "@keyframes fall { to { transform: translateY(100vh); opacity: 0; } }";
  document.head.appendChild(style);
});
// Falling basketball confetti effect
function launchBasketball() {
  const ball = document.createElement("div");
  ball.className = "basketball-fall";
  ball.style.left = Math.random() * window.innerWidth + "px";
  ball.style.top = "-60px";
  document.body.appendChild(ball);
  setTimeout(() => ball.remove(), 4000);
}

// Launch a basketball every 3 seconds
setInterval(launchBasketball, 3000);