document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const sortPriceBtn = document.getElementById("sortPriceBtn");
  const productGrid = document.getElementById("productGrid");
  const noProductsMsg = document.getElementById("noProductsMsg");
  const radioButtons = document.querySelectorAll(".filter-radio");

  
  const effectiveThreshold = 1900; 

  const productItems = Array.from(productGrid.querySelectorAll(".product-item"));

  productItems.forEach(item => {
    const priceText = item.querySelector(".product-price").textContent;
    const priceVal = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    if (priceVal > effectiveThreshold) {
      const badgeContainer = item.querySelector(".product-body");
      if (!badgeContainer.querySelector(".premium-badge")) {
        const pBadge = document.createElement("span");
        pBadge.className = "premium-badge ms-2";
        pBadge.textContent = "Premium";
        badgeContainer.insertBefore(pBadge, badgeContainer.firstChild);
      }
    }
  });

  let sortState = 0;
  function filterAndSearchProducts() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    
   
    let activeCategory = "all";
    radioButtons.forEach(radio => {
      if (radio.checked) {
        const id = radio.id;
        if (id === "cat-light") activeCategory = "light";
        else if (id === "cat-medium") activeCategory = "medium";
        else if (id === "cat-dark") activeCategory = "dark";
        else if (id === "cat-espresso") activeCategory = "espresso";
      }
    });

    let visibleCount = 0;

    productItems.forEach(item => {
      const name = item.querySelector(".product-name").textContent.toLowerCase();
      const desc = item.querySelector(".product-desc").textContent.toLowerCase();
      const category = item.getAttribute("data-category");

      const matchesSearch = name.includes(query) || desc.includes(query);
      const matchesCategory = (activeCategory === "all" || category === activeCategory);

      if (matchesSearch && matchesCategory) {
        item.style.display = "";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (noProductsMsg) {
      if (visibleCount === 0) {
        noProductsMsg.classList.remove("d-none");
        productGrid.classList.add("d-none");
      } else {
        noProductsMsg.classList.add("d-none");
        productGrid.classList.remove("d-none");
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterAndSearchProducts);
  }

  radioButtons.forEach(radio => {
    radio.addEventListener("change", filterAndSearchProducts);
  });

  
  if (sortPriceBtn) {
    sortPriceBtn.addEventListener("click", () => {
      sortState = (sortState + 1) % 3;

      let btnText = "Sort by Price: Default";
      if (sortState === 1) btnText = "Sort by Price: Low to High";
      if (sortState === 2) btnText = "Sort by Price: High to Low";
      sortPriceBtn.innerHTML = `<i class="fa-solid fa-arrow-down-wide-short me-1"></i> ${btnText}`;

      productItems.sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".product-price").textContent.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.querySelector(".product-price").textContent.replace(/[^0-9.]/g, ""));

        if (sortState === 1) return priceA - priceB;
        if (sortState === 2) return priceB - priceA;
        return 0;
      });

      productItems.forEach(item => {
        productGrid.appendChild(item);
      });
    });
  }
});