document.addEventListener("DOMContentLoaded", function () {

/* =====================================================
   ELEMENTS
===================================================== */

const pages = document.querySelectorAll(".page-section");
const navItems = document.querySelectorAll(".nav-item[data-page]");
const viewButtons = document.querySelectorAll(".view-button[data-page]");

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPopup =
    document.getElementById("notificationPopup");

const bookConsultationBtn =
    document.getElementById("bookConsultationBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const doctorSearch =
    document.getElementById("doctorSearch");

const doctorCards =
    document.querySelectorAll(".doctor-card");

const specializationButtons =
    document.querySelectorAll(".specialization-button");

const detailButtons =
    document.querySelectorAll(".details-button");

const backToDoctorsBtn =
    document.getElementById("backToDoctorsBtn");

const bookDoctorBtn =
    document.getElementById("bookDoctorBtn");

const timeSlots =
    document.querySelectorAll(".time-slot");

const confirmBookingBtn =
    document.getElementById("confirmBookingBtn");

const cancelBookingBtn =
    document.getElementById("cancelBookingBtn");

const sendMessageBtn =
    document.getElementById("sendMessageBtn");

const messageInput =
    document.getElementById("messageInput");

const chatContainer =
    document.getElementById("chatContainer");

const addMedicineBtn =
    document.getElementById("addMedicineBtn");

const endConsultationBtn =
    document.getElementById("endConsultationBtn");

const payNowBtn =
    document.getElementById("payNowBtn");


/* =====================================================
   DOCTOR DATA
===================================================== */

const doctorData = {

    "Dr. Sarah Wilson": {
        specialization: "General Physician",
        rating: "4.8",
        qualification: "MBBS, MD",
        experience: "10+ Years",
        consultations: "120+",
        fee: "₹500",
        about:
            "Dr. Sarah Wilson is an experienced healthcare professional who provides consultation and guidance to patients regarding their health concerns."
    },

    "Dr. Michael Brown": {
        specialization: "Cardiologist",
        rating: "4.7",
        qualification: "MBBS, MD, DM",
        experience: "12+ Years",
        consultations: "95+",
        fee: "₹800",
        about:
            "Dr. Michael Brown specializes in cardiovascular consultation and helps patients understand and manage their heart-related concerns."
    },

    "Dr. Emily Davis": {
        specialization: "Dermatologist",
        rating: "4.9",
        qualification: "MBBS, MD",
        experience: "9+ Years",
        consultations: "150+",
        fee: "₹700",
        about:
            "Dr. Emily Davis provides professional consultation for skin, hair and other dermatological concerns."
    },

    "Dr. David Miller": {
        specialization: "Neurologist",
        rating: "4.6",
        qualification: "MBBS, MD, DM",
        experience: "11+ Years",
        consultations: "87+",
        fee: "₹900",
        about:
            "Dr. David Miller provides consultation for neurological concerns and helps patients understand their symptoms and available medical guidance."
    }

};


/* =====================================================
   CURRENT CONSULTATION
===================================================== */

let selectedTime = "";
let currentAppointment = null;


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    pages.forEach(function (page) {
        page.classList.remove("active-section");
    });

    const selectedPage =
        document.getElementById(pageId);

    if (!selectedPage) {
        console.error("Page not found:", pageId);
        return;
    }

    selectedPage.classList.add("active-section");

    navItems.forEach(function (item) {

        item.classList.remove("active");

        if (item.dataset.page === pageId) {
            item.classList.add("active");
        }

    });

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SIDEBAR
===================================================== */

navItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        showPage(item.dataset.page);

        if (item.dataset.page === "consultations") {
            renderConsultations();
        }

        if (item.dataset.page === "history") {
            renderHistory();
        }

        if (item.dataset.page === "payments") {
            renderPayments();
        }

    });

});


/* =====================================================
   VIEW BUTTONS
===================================================== */

viewButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        showPage(button.dataset.page);

        if (button.dataset.page === "history") {
            renderHistory();
        }

        if (button.dataset.page === "payments") {
            renderPayments();
        }

    });

});


/* =====================================================
   BOOK CONSULTATION FROM DASHBOARD
===================================================== */

if (bookConsultationBtn) {

    bookConsultationBtn.addEventListener("click", function () {

        showPage("find-doctor");

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuButton && sidebar) {

    menuButton.addEventListener("click", function () {

        sidebar.classList.toggle("open");

    });

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

if (notificationBtn && notificationPopup) {

    notificationBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        notificationPopup.classList.toggle("show");

    });

}


document.addEventListener("click", function (event) {

    if (
        notificationPopup &&
        notificationBtn &&
        !notificationPopup.contains(event.target) &&
        !notificationBtn.contains(event.target)
    ) {

        notificationPopup.classList.remove("show");

    }

});


/* =====================================================
   LOGOUT
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        alert("Logout functionality will be connected later.");

    });

}


/* =====================================================
   DOCTOR SEARCH
===================================================== */

function filterDoctors() {

    if (!doctorSearch) {
        return;
    }

    const searchValue =
        doctorSearch.value.trim().toLowerCase();

    const activeFilter =
        document.querySelector(
            ".specialization-button.active"
        );

    const selectedSpecialization =
        activeFilter
            ? activeFilter.dataset.specialization.toLowerCase()
            : "all";

    doctorCards.forEach(function (card) {

        const doctorName =
            (card.dataset.name || "").toLowerCase();

        const specialization =
            (card.dataset.specialization || "").toLowerCase();

        const matchesSearch =
            doctorName.includes(searchValue) ||
            specialization.includes(searchValue);

        const matchesSpecialization =
            selectedSpecialization === "all" ||
            specialization === selectedSpecialization;

        card.style.display =
            matchesSearch && matchesSpecialization
                ? ""
                : "none";

    });

}


if (doctorSearch) {
    doctorSearch.addEventListener("input", filterDoctors);
}


/* =====================================================
   SPECIALIZATION FILTER
===================================================== */

specializationButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        specializationButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterDoctors();

    });

});


/* =====================================================
   DOCTOR DETAILS
===================================================== */

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const doctorName = button.dataset.doctor;
        const doctor = doctorData[doctorName];

        if (!doctor) {
            alert("Doctor information not available.");
            return;
        }

        document.getElementById("detailDoctorName").textContent =
            doctorName;

        document.getElementById("detailSpecialization").textContent =
            doctor.specialization;

        document.getElementById("detailRating").textContent =
            doctor.rating;

        document.getElementById("detailQualification").textContent =
            doctor.qualification;

        document.getElementById("detailExperience").textContent =
            doctor.experience;

        document.getElementById("detailConsultations").textContent =
            doctor.consultations;

        document.getElementById("detailFee").textContent =
            doctor.fee;

        document.getElementById("detailAbout").textContent =
            doctor.about;

        showPage("doctor-details");

    });

});


/* =====================================================
   BACK TO DOCTORS
===================================================== */

if (backToDoctorsBtn) {

    backToDoctorsBtn.addEventListener("click", function () {

        showPage("find-doctor");

    });

}


/* =====================================================
   DOCTOR DETAILS → BOOK
===================================================== */

if (bookDoctorBtn) {

    bookDoctorBtn.addEventListener("click", function () {

        const doctorName =
            document.getElementById("detailDoctorName")
                .textContent.trim();

        const doctor = doctorData[doctorName];

        if (!doctor) {
            alert("Doctor information not available.");
            return;
        }

        document.getElementById("bookingDoctorName")
            .textContent = doctorName;

        document.getElementById("bookingSpecialization")
            .textContent = doctor.specialization;

        document.getElementById("bookingRating")
            .textContent = doctor.rating;

        document.getElementById("bookingFee")
            .textContent = doctor.fee;

        document.getElementById("consultationDate").value = "";
        document.getElementById("patientConcern").value = "";

        timeSlots.forEach(function (slot) {
            slot.classList.remove("selected");
        });

        selectedTime = "";

        showPage("book-consultation");

    });

}


/* =====================================================
   TIME SLOT
===================================================== */

timeSlots.forEach(function (slot) {

    slot.addEventListener("click", function () {

        timeSlots.forEach(function (button) {
            button.classList.remove("selected");
        });

        slot.classList.add("selected");

        selectedTime = slot.dataset.time;

    });

});


/* =====================================================
   CONFIRM BOOKING
===================================================== */

if (confirmBookingBtn) {

    confirmBookingBtn.addEventListener("click", function () {

        const dateInput =
            document.getElementById("consultationDate");

        const concernInput =
            document.getElementById("patientConcern");

        const date = dateInput.value;

        const concern =
            concernInput.value.trim();

        const doctorName =
            document.getElementById("bookingDoctorName")
                .textContent.trim();

        const specialization =
            document.getElementById("bookingSpecialization")
                .textContent.trim();

        const fee =
            document.getElementById("bookingFee")
                .textContent.trim();


        if (!date) {
            alert("Please select a consultation date.");
            return;
        }

        if (!selectedTime) {
            alert("Please select a consultation time.");
            return;
        }

        if (!concern) {
            alert(
                "Please describe what you would like to discuss."
            );
            return;
        }


        const appointment = {

            id: Date.now(),

            doctorName: doctorName,

            specialization: specialization,

            date: date,

            time: selectedTime,

            concern: concern,

            fee: fee,

            status: "Confirmed",

            paymentStatus: "Pending"

        };


        let appointments =
            JSON.parse(
                localStorage.getItem(
                    "patientAppointments"
                )
            ) || [];


        appointments.push(appointment);

        localStorage.setItem(
            "patientAppointments",
            JSON.stringify(appointments)
        );


        alert("Consultation booked successfully!");

        showPage("consultations");

        renderConsultations();

    });

}


/* =====================================================
   RENDER MY CONSULTATIONS
===================================================== */

function renderConsultations() {

    const container =
        document.getElementById(
            "consultationsContainer"
        );

    const emptyState =
        document.getElementById(
            "emptyConsultations"
        );

    if (!container) {
        return;
    }

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "patientAppointments"
            )
        ) || [];


    container.innerHTML = "";


    if (appointments.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    appointments.forEach(function (appointment) {

        const card =
            document.createElement("div");

        card.className =
            "consultation-appointment-card";


        const consultationReady =
            isConsultationTime(
                appointment
            );


        let actionHTML = "";


        if (appointment.status === "Completed") {

            actionHTML = `
                <span class="status completed">
                    Completed
                </span>
            `;

        } else if (consultationReady) {

            actionHTML = `
                <button
                    class="consult-button"
                    data-id="${appointment.id}">
                    Consult
                </button>
            `;

        } else {

            actionHTML = `
                <button
                    class="consult-button disabled"
                    disabled>
                    Consult
                </button>
            `;

        }


        card.innerHTML = `

            <div class="consultation-appointment-header">

                <div class="doctor-avatar">
                    ${getInitials(appointment.doctorName)}
                </div>

                <div class="consultation-appointment-details">

                    <h3>
                        ${appointment.doctorName}
                    </h3>

                    <p>
                        ${appointment.specialization}
                    </p>

                    <div class="consultation-meta">

                        <span>
                            📅 ${formatDate(appointment.date)}
                        </span>

                        <span>
                            ⏰ ${appointment.time}
                        </span>

                        <span>
                            💰 ${appointment.fee}
                        </span>

                        <span>
                            ${appointment.status}
                        </span>

                    </div>

                </div>

                ${actionHTML}

            </div>

        `;


        const consultButton =
            card.querySelector(
                ".consult-button:not([disabled])"
            );


        if (consultButton) {

            consultButton.addEventListener(
                "click",
                function () {

                    openConsultation(
                        appointment.id
                    );

                }
            );

        }


        container.appendChild(card);

    });

}


/* =====================================================
   CONSULTATION TIME CHECK
   Demo rule:
   - Button becomes active on selected date/time.
   ===================================================== */

function isConsultationTime(appointment) {

    const now = new Date();

    const appointmentDate =
        new Date(
            appointment.date +
            " " +
            convertTimeTo24Hour(
                appointment.time
            )
        );


    /*
     * For demonstration:
     * Allow consultation 15 minutes before
     * the scheduled time and afterwards.
     */

    const startTime =
        appointmentDate.getTime() -
        (15 * 60 * 1000);


    return now.getTime() >= startTime;

}


/* =====================================================
   OPEN CONSULTATION ROOM
===================================================== */

function openConsultation(appointmentId) {

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "patientAppointments"
            )
        ) || [];


    currentAppointment =
        appointments.find(function (appointment) {

            return appointment.id === appointmentId;

        });


    if (!currentAppointment) {

        alert("Consultation not found.");

        return;

    }


    document.getElementById(
        "roomDoctorName"
    ).textContent =
        currentAppointment.doctorName;


    document.getElementById(
        "roomSpecialization"
    ).textContent =
        currentAppointment.specialization;


    document.getElementById(
        "roomConcern"
    ).textContent =
        currentAppointment.concern;


    showPage("consultation-room");

}


/* =====================================================
   SEND MESSAGE
   THIS MAKES THE TEXTAREA ACTUALLY WORK
===================================================== */

function sendMessage() {

    if (!messageInput) {
        return;
    }

    const message =
        messageInput.value.trim();


    if (!message) {
        return;
    }


    const messageElement =
        document.createElement("div");

    messageElement.className =
        "chat-message patient-message";


    const currentTime =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    messageElement.innerHTML = `

        <div class="message-label">
            You
        </div>

        <p>
            ${escapeHTML(message)}
        </p>

        <small>
            ${currentTime}
        </small>

    `;


    chatContainer.appendChild(
        messageElement
    );


    messageInput.value = "";

    chatContainer.scrollTop =
        chatContainer.scrollHeight;

}


if (sendMessageBtn) {

    sendMessageBtn.addEventListener(
        "click",
        sendMessage
    );

}


if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


/* =====================================================
   ADD MEDICINE
===================================================== */

if (addMedicineBtn) {

    addMedicineBtn.addEventListener(
        "click",
        function () {

            const medicineName =
                document.getElementById(
                    "medicineName"
                ).value.trim();

            const instruction =
                document.getElementById(
                    "medicineInstruction"
                ).value.trim();

            const duration =
                document.getElementById(
                    "medicineDuration"
                ).value.trim();


            if (!medicineName) {

                alert(
                    "Please enter the medicine name."
                );

                return;

            }


            const prescriptionList =
                document.getElementById(
                    "prescriptionList"
                );


            const item =
                document.createElement("div");

            item.className =
                "prescription-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escapeHTML(medicineName)}
                    </strong>

                    <p>
                        ${escapeHTML(
                            instruction ||
                            "As directed by doctor"
                        )}
                    </p>

                </div>

                <span>
                    ${escapeHTML(
                        duration || "As prescribed"
                    )}
                </span>

            `;


            prescriptionList.appendChild(item);


            document.getElementById(
                "medicineName"
            ).value = "";

            document.getElementById(
                "medicineInstruction"
            ).value = "";

            document.getElementById(
                "medicineDuration"
            ).value = "";

        }
    );

}


/* =====================================================
   END CONSULTATION
===================================================== */

if (endConsultationBtn) {

    endConsultationBtn.addEventListener(
        "click",
        function () {

            if (!currentAppointment) {

                alert(
                    "No active consultation found."
                );

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to end this consultation?"
                );


            if (!confirmed) {
                return;
            }


            /*
             * Store consultation details
             * temporarily for payment.
             */

            localStorage.setItem(
                "currentPaymentAppointment",
                JSON.stringify(
                    currentAppointment
                )
            );


            /*
             * Move to payment.
             */

            document.getElementById(
                "paymentDoctor"
            ).textContent =
                currentAppointment.doctorName;


            document.getElementById(
                "paymentSpecialization"
            ).textContent =
                currentAppointment.specialization;


            document.getElementById(
                "paymentAmount"
            ).textContent =
                currentAppointment.fee;


            document.getElementById(
                "paymentTotal"
            ).textContent =
                currentAppointment.fee;


            showPage(
                "consultation-payment"
            );

        }
    );

}


/* =====================================================
   PAYMENT
===================================================== */

if (payNowBtn) {

    payNowBtn.addEventListener(
        "click",
        function () {

            const storedAppointment =
                JSON.parse(
                    localStorage.getItem(
                        "currentPaymentAppointment"
                    )
                );


            if (!storedAppointment) {

                alert(
                    "Payment information not found."
                );

                return;

            }


            let appointments =
                JSON.parse(
                    localStorage.getItem(
                        "patientAppointments"
                    )
                ) || [];


            appointments =
                appointments.map(
                    function (appointment) {

                        if (
                            appointment.id ===
                            storedAppointment.id
                        ) {

                            return {

                                ...appointment,

                                status: "Completed",

                                paymentStatus: "Paid",

                                paidAt:
                                    new Date()
                                        .toISOString()

                            };

                        }

                        return appointment;

                    }
                );


            localStorage.setItem(
                "patientAppointments",
                JSON.stringify(
                    appointments
                )
            );


            /*
             * Save payment record
             */

            let payments =
                JSON.parse(
                    localStorage.getItem(
                        "patientPayments"
                    )
                ) || [];


            payments.push({

                id: Date.now(),

                doctorName:
                    storedAppointment.doctorName,

                specialization:
                    storedAppointment.specialization,

                date:
                    storedAppointment.date,

                amount:
                    storedAppointment.fee,

                status:
                    "Paid"

            });


            localStorage.setItem(
                "patientPayments",
                JSON.stringify(
                    payments
                )
            );


            localStorage.removeItem(
                "currentPaymentAppointment"
            );


            alert(
                "Payment successful! Consultation completed."
            );


            renderHistory();

            renderPayments();

            showPage("history");

        }
    );

}


/* =====================================================
   HISTORY
===================================================== */

function renderHistory() {

    const tableBody =
        document.getElementById(
            "historyTableBody"
        );

    const emptyHistory =
        document.getElementById(
            "emptyHistory"
        );

    const completedCount =
        document.getElementById(
            "completedCount"
        );

    const historyTotalFees =
        document.getElementById(
            "historyTotalFees"
        );


    if (!tableBody) {
        return;
    }


    const appointments =
        JSON.parse(
            localStorage.getItem(
                "patientAppointments"
            )
        ) || [];


    const completedAppointments =
        appointments.filter(
            function (appointment) {

                return appointment.status ===
                    "Completed";

            }
        );


    tableBody.innerHTML = "";


    completedCount.textContent =
        completedAppointments.length;


    let total = 0;


    completedAppointments.forEach(
        function (appointment) {

            total += parseAmount(
                appointment.fee
            );


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        appointment.doctorName
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        appointment.specialization
                    )}
                </td>

                <td>
                    ${formatDate(
                        appointment.date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        appointment.time
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        appointment.fee
                    )}
                </td>

                <td>

                    <span class="status completed">
                        Completed
                    </span>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );


    historyTotalFees.textContent =
        "₹" + total;


    if (completedAppointments.length === 0) {

        document.querySelector(
            ".history-card"
        ).style.display = "none";

        emptyHistory.style.display =
            "block";

    } else {

        document.querySelector(
            ".history-card"
        ).style.display = "block";

        emptyHistory.style.display =
            "none";

    }

}


/* =====================================================
   PAYMENTS
===================================================== */

function renderPayments() {

    const tableBody =
        document.getElementById(
            "paymentTableBody"
        );


    if (!tableBody) {
        return;
    }


    const payments =
        JSON.parse(
            localStorage.getItem(
                "patientPayments"
            )
        ) || [];


    tableBody.innerHTML = "";


    payments.forEach(function (payment) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                General Consultation
            </td>

            <td>
                ${escapeHTML(
                    payment.doctorName
                )}
            </td>

            <td>
                ${formatDate(
                    payment.date
                )}
            </td>

            <td>
                ${escapeHTML(
                    payment.amount
                )}
            </td>

            <td>

                <span class="status paid">
                    Paid
                </span>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =====================================================
   FIND DOCTOR BUTTONS
===================================================== */

const findDoctorButtons =
    document.querySelectorAll(
        "#findDoctorFromConsultations, #findDoctorFromHistory"
    );


findDoctorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        showPage("find-doctor");

    });

});


/* =====================================================
   HELPERS
===================================================== */

function getInitials(name) {

    return name
        .replace("Dr. ", "")
        .split(" ")
        .map(function (word) {
            return word.charAt(0);
        })
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function parseAmount(value) {

    return Number(
        String(value)
            .replace("₹", "")
            .replace(",", "")
            .trim()
    ) || 0;

}


function convertTimeTo24Hour(timeString) {

    const parts =
        timeString
            .trim()
            .split(" ");

    const time = parts[0];
    const modifier =
        parts[1].toUpperCase();

    let [hours, minutes] =
        time.split(":")
            .map(Number);


    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
        hours = 0;
    }


    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0")
    );

}


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =====================================================
   INITIAL LOAD
===================================================== */

renderConsultations();
renderHistory();
renderPayments();

showPage("dashboard");

});
