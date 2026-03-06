document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const nav = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
    const mobileBookBar = document.getElementById("mobileBookBar");
    const menuButton = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const pageName = body.dataset.page || "home";

    const setScrolledState = () => {
        const scrolled = window.scrollY > 72;
        if (nav) nav.classList.toggle("scrolled", scrolled);
        if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 420);
        if (mobileBookBar) {
            const showBar = window.scrollY > 360 && pageName !== "reserve";
            mobileBookBar.classList.toggle("visible", showBar);
        }
    };

    setScrolledState();
    window.addEventListener("scroll", setScrolledState, { passive: true });

    if (menuButton && mobileMenu) {
        const setMenuState = (open) => {
            menuButton.classList.toggle("open", open);
            mobileMenu.classList.toggle("open", open);
            menuButton.setAttribute("aria-expanded", String(open));
            body.classList.toggle("menu-open", open);
        };

        menuButton.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.contains("open");
            setMenuState(!isOpen);
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setMenuState(false);
        });
    }

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const revealNodes = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if (revealNodes.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("visible");
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealNodes.forEach((node) => revealObserver.observe(node));
    }

    const counterNodes = document.querySelectorAll(".stat-number[data-target]");
    if (counterNodes.length) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || entry.target.dataset.counted === "true") return;
                    entry.target.dataset.counted = "true";
                    const target = Number(entry.target.dataset.target || 0);
                    let start = null;

                    const tick = (timestamp) => {
                        if (start === null) start = timestamp;
                        const progress = Math.min((timestamp - start) / 900, 1);
                        const value = Math.floor(progress * target);
                        entry.target.textContent = `${value}${target >= 100 ? "+" : ""}`;
                        if (progress < 1) requestAnimationFrame(tick);
                    };

                    requestAnimationFrame(tick);
                });
            },
            { threshold: 0.4 }
        );

        counterNodes.forEach((node) => {
            node.textContent = "0";
            node.dataset.counted = "false";
            counterObserver.observe(node);
        });
    }

    document.querySelectorAll(".hscroll-track").forEach((track) => {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        track.addEventListener("mousedown", (event) => {
            isDown = true;
            startX = event.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener("mouseleave", () => {
            isDown = false;
        });

        track.addEventListener("mouseup", () => {
            isDown = false;
        });

        track.addEventListener("mousemove", (event) => {
            if (!isDown) return;
            event.preventDefault();
            const x = event.pageX - track.offsetLeft;
            track.scrollLeft = scrollLeft - (x - startX) * 1.4;
        });
    });

    const arrivalInput = document.getElementById("arrival");
    const departureInput = document.getElementById("departure");
    const today = new Date().toISOString().split("T")[0];

    if (arrivalInput) {
        arrivalInput.min = today;
        arrivalInput.addEventListener("change", () => {
            if (departureInput) departureInput.min = arrivalInput.value || today;
        });
    }

    if (departureInput && arrivalInput) {
        departureInput.min = arrivalInput.value || today;
    }

    const hasSubmittedFlag = new URLSearchParams(window.location.search).has("submitted");
    const returnedFromFormSubmit = document.referrer.includes("formsubmit.co");
    const bookingForm = document.getElementById("bookingForm");
    const confirmationMsg = document.getElementById("confirmationMsg");

    if ((hasSubmittedFlag || returnedFromFormSubmit) && bookingForm && confirmationMsg) {
        bookingForm.hidden = true;
        confirmationMsg.hidden = false;
        const historyUrl = new URL(window.location.href);
        historyUrl.searchParams.delete("submitted");
        window.history.replaceState({}, "", historyUrl.toString());
    }
});
