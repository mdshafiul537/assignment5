document.addEventListener("DOMContentLoaded", (event) => {
  const availableSeats = 0,
    selectedSeats = [],
    totalPrice = 0,
    price = 0,
    isCoupon = false;

  const couponBtnElm = document.querySelector("#btnCoupon");
  couponBtnElm.addEventListener("click", (event) => {
    applyCoupon(selectedSeats);
  });

  document.querySelector(".seats")?.addEventListener("click", (e) => {
    onSeatsAction(e, selectedSeats);
  });

  const seatBookElm = document.querySelector("#seat_book");

  document.getElementById("next-btn").addEventListener("click", (e) => {
    e.preventDefault();

    const passNameElm = document.querySelector("#passenger-name");
    const passPhoneElm = document.querySelector("#passenger-phone");

    const passengerName = passNameElm.value;
    const passengerPhone = passPhoneElm.value;

    if (!passengerName) {
      passNameElm?.classList.add("outline", "outline-red-500");
    } else {
      passNameElm?.classList.remove("outline", "outline-red-500");
    }

    if (!passengerPhone) {
      passPhoneElm.classList.add("outline", "outline-red-500");
    } else {
      passPhoneElm.classList.remove("outline", "outline-red-500");
    }

    if (passengerName && passengerPhone) {
      seatBookElm.classList.add("modal-open");
    }
  });

  const continueBtn = document.getElementById("continue-btn");
  continueBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    seatBookElm.classList.remove("modal-open");
  });
});

function applyCoupon(seats) {
  const couponElm = document.querySelector("#coupon");
  const grandTotalElm = document.querySelector("#grand-total");
  const totalPriceElm = document.querySelector(".total-price");
  const couponArea = document.querySelector(".coupon-apply");
  let grandTotal = 0,
    totalPrice = Number(totalPriceElm?.innerText);

  grandTotal = totalPrice;

  if (seats.length < 4) {
    couponArea.querySelector(
      ".coupon-invalid"
    ).innerHTML = `Minimum 4 seat needed to Apply Coupon. Please, Select 4 seat and try again!!`;
  }

  if (couponElm && !isNaN(totalPrice) && seats.length === 4) {
    const coupon = couponElm.value;
    let discount = 0,
      discountPar = 0;

    if (coupon === "NEW15") {
      discountPar = 15;
      discount = (totalPrice * 15) / 100;
    } else if (coupon === "Couple 20") {
      discountPar = 20;

      discount = (totalPrice * 20) / 100;
    } else {
      couponArea.querySelector(
        ".coupon-invalid"
      ).innerHTML = `Coupon Invalid. Please, try again with correct one !!`;
    }

    grandTotal = totalPrice - discount;

    if (discount > 0) {
      const discountCal = couponArea?.querySelector("#dicount-cal");
      const couponInput = couponArea?.querySelector("#coupon-input");

      couponArea.querySelector(".coupon-invalid").innerHTML = ``;

      if (couponInput) {
        couponInput.classList.remove("flex");
        couponInput.classList.add("hidden");
      }

      if (discountCal) {
        discountCal.classList.remove("hidden");
        discountCal.classList.add("flex");
        discountCal.querySelector(".dicount-par").innerText = discountPar;
        discountCal.querySelector(".total-discount").innerText = discount;
      }
    }
  }

  grandTotalElm.innerText = grandTotal;
}

function changeAvailableSeatsCount() {
  const seats = document.querySelectorAll(".available ");
  const seatLeft = document.querySelector(".seat-left");
  seatLeft.innerText = seats?.length;
}
function removeSeat(seats, name) {
  let index = -1;
  if (Array.isArray(seats)) {
    seats.forEach((item, idx) => {
      if (item.name === name) {
        index = idx;
      }
    });

    seats.splice(index, 1);
  }
}

function onSeatsAction(e, selectedSeats = [], seats = []) {
  let element = e.target;

  if (element) {
    let isLimit = true;
    if (Array.isArray(selectedSeats)) {
      if (selectedSeats.length <= 3) {
        isLimit = false;
      }
    }

    if (element.classList.contains("available") && !isLimit) {
      element.classList.add("selected");
      element.classList.remove("available");

      selectedSeats.push({
        name: element.innerText,
        type: "Economy",
        price: 550,
      });
    } else if (element.classList.contains("selected")) {
      element.classList.remove("selected");
      element.classList.add("available");
      removeSeat(selectedSeats, element.innerText);
    }
  }

  restCoupon();

  calculatePrice(selectedSeats);
}

function changeSelectedSeatCount(count = 0) {
  const seatCount = document.querySelector(".selected-seat");
  seatCount.innerText = count;
}

function calculatePrice(seats) {
  changeAvailableSeatsCount();
  changeSelectedSeatCount(seats?.length);

  const selectedSeats = document.querySelector(".selected-seats");
  let items = ``,
    totalPrice = 0;
  seats.forEach((item) => {
    items += `<div
      class="flex flex-row justify-between items-center gap-4 py-2 "
    >
      <div class="">${item?.name}</div>
      <div class="">${item?.type}</div>
      <div class="">${item?.price}</div>
    </div>`;
    totalPrice += item.price;
  });
  document.querySelector(".total-price").innerText = totalPrice;
  document.querySelector("#grand-total").innerText = totalPrice;
  selectedSeats.innerHTML = items;
}

function restCoupon() {
  const discountCal = document.querySelector("#dicount-cal");
  const couponInput = document.querySelector("#coupon-input");

  if (couponInput) {
    couponInput.classList.add("flex");
    couponInput.classList.remove("hidden");
  }

  if (discountCal) {
    discountCal.classList.add("hidden");
    discountCal.classList.remove("flex");
  }
}
