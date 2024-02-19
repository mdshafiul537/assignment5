document.addEventListener("DOMContentLoaded", (event) => {
  const availableSeats = 0,
    selectedSeats = [],
    totalPrice = 0,
    price = 0,
    isCoupon = false;

  const couponBtnElm = document.querySelector("#btnCoupon");
  couponBtnElm.addEventListener("click", (event) => {
    applyCoupon();
  });

  document.querySelector(".seats")?.addEventListener("click", (e) => {
    onSeatsAction(e, selectedSeats);
  });

  const seatBookElm = document.querySelector("#seat_book");

  document.getElementById("next-btn").addEventListener("click", (e) => {
    e.preventDefault();

    const passNameElm = document.querySelector("#passenger-name");
    const passPhoneElm = document.querySelector("#passenger-phone");

    console.log("passNameElm, ", passNameElm);
    console.log("passPhoneElm, ", passPhoneElm);

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

    console.log("passengerName ", passengerName);
    console.log("passengerPhone ", passengerPhone);

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

function applyCoupon() {
  const couponElm = document.querySelector("#coupon");
  const grandTotalElm = document.querySelector("#grand-total");
  const totalPriceElm = document.querySelector(".total-price");
  const couponArea = document.querySelector(".coupon-apply");
  let grandTotal = 0,
    totalPrice = Number(totalPriceElm?.innerText);

  if (couponElm && !isNaN(totalPrice)) {
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
      couponArea.innerHTML = `<div
      class="flex flex-row justify-between items-center gap-4 py-2 font-bold border-t border-solid"
    >
      <div class="">Total Discount (${discountPar}%)</div>
      <div class="">BDT <span>${discount}</span> </div>
    </div>`;
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
      console.log("selected ");
      element.classList.remove("selected");
      element.classList.add("available");
      console.log("available Remove ", e);
      removeSeat(selectedSeats, element.innerText);
    }
  }

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
  selectedSeats.innerHTML = items;
}
