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

            if (item.dataset.page === "profile") {
                loadProfile();
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

            if (button.dataset.page === "consultations") {
                renderConsultations();
            }

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

            const confirmed =
                confirm("Are you sure you want to logout?");

            if (confirmed) {
                alert("Logout functionality will be connected to the backend later.");
            }

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

            const doctorName =
                button.dataset.doctor;

            const doctor =
                doctorData[doctorName];

            if (!doctor) {

                alert("Doctor information not available.");

                return;
            }


            document.getElementById(
                "detailDoctorName"
            ).textContent = doctorName;


            document.getElementById(
                "detailSpecialization"
            ).textContent = doctor.specialization;


            document.getElementById(
                "detailRating"
            ).textContent = doctor.rating;


            document.getElementById(
                "detailQualification"
            ).textContent = doctor.qualification;


            document.getElementById(
                "detailExperience"
            ).textContent = doctor.experience;


            document.getElementById(
                "detailConsultations"
            ).textContent = doctor.consultations;


            document.getElementById(
                "detailFee"
            ).textContent = doctor.fee;


            document.getElementById(
                "detailAbout"
            ).textContent = doctor.about;


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
                document.getElementById(
                    "detailDoctorName"
                ).textContent.trim();


            const doctor =
                doctorData[doctorName];


            if (!doctor) {

                alert("Doctor information not available.");

                return;
            }


            document.getElementById(
                "bookingDoctorName"
            ).textContent = doctorName;


            document.getElementById(
                "bookingSpecialization"
            ).textContent =
                doctor.specialization;


            document.getElementById(
                "bookingRating"
            ).textContent =
                doctor.rating;


            document.getElementById(
                "bookingFee"
            ).textContent =
                doctor.fee;


            document.getElementById(
                "consultationDate"
            ).value = "";


            document.getElementById(
                "patientConcern"
            ).value = "";


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


            selectedTime =
                slot.dataset.time;

        });

    });


    /* =====================================================
       CONFIRM BOOKING
       
       IMPORTANT:
       New appointment starts as WAITING.
       It does NOT start as Confirmed.
    ===================================================== */

    if (confirmBookingBtn) {

        confirmBookingBtn.addEventListener("click", function () {

            const dateInput =
                document.getElementById(
                    "consultationDate"
                );


            const concernInput =
                document.getElementById(
                    "patientConcern"
                );


            const date =
                dateInput.value;


            const concern =
                concernInput.value.trim();


            const doctorName =
                document.getElementById(
                    "bookingDoctorName"
                ).textContent.trim();


            const specialization =
                document.getElementById(
                    "bookingSpecialization"
                ).textContent.trim();


            const fee =
                document.getElementById(
                    "bookingFee"
                ).textContent.trim();


            if (!date) {

                alert(
                    "Please select a consultation date."
                );

                return;
            }


            if (!selectedTime) {

                alert(
                    "Please select a consultation time."
                );

                return;
            }


            if (!concern) {

                alert(
                    "Please describe what you would like to discuss."
                );

                return;
            }


            /*
             * Appointment starts as WAITING.
             * Doctor must accept it before
             * it becomes CONFIRMED.
             */

            const appointment = {

                id: Date.now(),

                doctorName:
                    doctorName,

                specialization:
                    specialization,

                date:
                    date,

                time:
                    selectedTime,

                concern:
                    concern,

                fee:
                    fee,

                status:
                    "Waiting",

                paymentStatus:
                    "Pending",

                createdAt:
                    new Date().toISOString()

            };


            let appointments =
                getAppointments();


            appointments.push(
                appointment
            );


            saveAppointments(
                appointments
            );


            alert(
                "Consultation request sent successfully. Waiting for doctor confirmation."
            );


            showPage("consultations");

            renderConsultations();

        });

    }


    /* =====================================================
       RENDER MY CONSULTATIONS
       
       BUTTON ITSELF SHOWS:
       
       Waiting
       Confirmed
       Consult
       Completed
       Rejected
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
            getAppointments();


        container.innerHTML = "";


        if (appointments.length === 0) {

            if (emptyState) {
                emptyState.style.display = "block";
            }

            return;
        }


        if (emptyState) {
            emptyState.style.display = "none";
        }


        appointments.forEach(function (appointment) {

            const card =
                document.createElement("div");


            card.className =
                "consultation-appointment-card";


            /*
             * Decide what the button should display.
             */

            let actionHTML = "";


            if (appointment.status === "Waiting") {

                actionHTML = `
                    <button
                        class="consult-button status-button waiting"
                        disabled>
                        Waiting
                    </button>
                `;

            }


            else if (appointment.status === "Rejected") {

                actionHTML = `
                    <button
                        class="consult-button status-button rejected"
                        disabled>
                        Rejected
                    </button>
                `;

            }


            else if (appointment.status === "Completed") {

                actionHTML = `
                    <button
                        class="consult-button status-button completed"
                        disabled>
                        Completed
                    </button>
                `;

            }


            else if (
                appointment.status === "Confirmed"
            ) {

                /*
                 * Confirmed does NOT mean
                 * consultation can start immediately.
                 */

                if (isConsultationTime(appointment)) {

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
                            class="consult-button status-button confirmed"
                            disabled>
                            Confirmed
                        </button>
                    `;

                }

            }


            else if (
                appointment.status === "In Progress"
            ) {

                actionHTML = `
                    <button
                        class="consult-button"
                        data-id="${appointment.id}">
                        Consult
                    </button>
                `;

            }


            card.innerHTML = `

                <div class="consultation-appointment-header">

                    <div class="doctor-avatar">
                        ${getInitials(
                            appointment.doctorName
                        )}
                    </div>


                    <div class="consultation-appointment-details">

                        <h3>
                            ${escapeHTML(
                                appointment.doctorName
                            )}
                        </h3>


                        <p>
                            ${escapeHTML(
                                appointment.specialization
                            )}
                        </p>


                        <div class="consultation-meta">

                            <span>
                                📅
                                ${formatDate(
                                    appointment.date
                                )}
                            </span>


                            <span>
                                ⏰
                                ${escapeHTML(
                                    appointment.time
                                )}
                            </span>


                            <span>
                                💰
                                ${escapeHTML(
                                    appointment.fee
                                )}
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
       CONSULTATION TIME
       
       Consultation becomes available
       15 minutes before scheduled time.
    ===================================================== */

    function isConsultationTime(appointment) {

        if (
            !appointment ||
            !appointment.date ||
            !appointment.time
        ) {
            return false;
        }


        const appointmentDate =
            new Date(
                appointment.date +
                "T" +
                convertTimeTo24Hour(
                    appointment.time
                )
            );


        if (
            Number.isNaN(
                appointmentDate.getTime()
            )
        ) {
            return false;
        }


        const consultationStart =
            appointmentDate.getTime() -
            (15 * 60 * 1000);


        return (
            Date.now() >=
            consultationStart
        );

    }


    /* =====================================================
       OPEN CONSULTATION
    ===================================================== */

    function openConsultation(
        appointmentId
    ) {

        let appointments =
            getAppointments();


        currentAppointment =
            appointments.find(
                function (appointment) {

                    return (
                        Number(appointment.id) ===
                        Number(appointmentId)
                    );

                }
            );


        if (!currentAppointment) {

            alert(
                "Consultation not found."
            );

            return;
        }


        /*
         * Patient cannot enter consultation
         * while waiting for doctor.
         */

        if (
            currentAppointment.status ===
            "Waiting"
        ) {

            alert(
                "Please wait for the doctor to confirm your consultation."
            );

            return;
        }


        if (
            currentAppointment.status ===
            "Rejected"
        ) {

            alert(
                "This consultation was rejected by the doctor."
            );

            return;
        }


        if (
            currentAppointment.status ===
            "Confirmed" &&
            !isConsultationTime(
                currentAppointment
            )
        ) {

            alert(
                "Your consultation will become available 15 minutes before the scheduled time."
            );

            return;
        }


        /*
         * Once patient enters the room,
         * status becomes In Progress.
         */

        if (
            currentAppointment.status ===
            "Confirmed"
        ) {

            currentAppointment.status =
                "In Progress";


            appointments =
                appointments.map(
                    function (appointment) {

                        if (
                            Number(appointment.id) ===
                            Number(currentAppointment.id)
                        ) {
                            return currentAppointment;
                        }

                        return appointment;

                    }
                );


            saveAppointments(
                appointments
            );

        }


        const roomDoctorName =
            document.getElementById(
                "roomDoctorName"
            );


        const roomSpecialization =
            document.getElementById(
                "roomSpecialization"
            );


        const roomConcern =
            document.getElementById(
                "roomConcern"
            );


        if (roomDoctorName) {

            roomDoctorName.textContent =
                currentAppointment.doctorName;

        }


        if (roomSpecialization) {

            roomSpecialization.textContent =
                currentAppointment.specialization;

        }


        if (roomConcern) {

            roomConcern.textContent =
                currentAppointment.concern;

        }


        /*
         * Patient can VIEW prescriptions.
         * Patient cannot add/edit prescriptions.
         */

        loadPatientPrescription(
            currentAppointment.id
        );


        showPage(
            "consultation-room"
        );

    }


    /* =====================================================
       PATIENT PRESCRIPTION
       
       IMPORTANT:
       Patient-side prescription form is hidden.
       Patient can only view medicines added
       by doctor.
    ===================================================== */

    function disablePatientPrescriptionEditing() {

        const prescriptionForm =
            document.querySelector(
                ".doctor-prescription-form"
            );


        if (prescriptionForm) {

            prescriptionForm.style.display =
                "none";

        }


        const addMedicineBtn =
            document.getElementById(
                "addMedicineBtn"
            );


        if (addMedicineBtn) {

            addMedicineBtn.style.display =
                "none";

        }

    }


    function loadPatientPrescription(
        appointmentId
    ) {

        const prescriptionList =
            document.getElementById(
                "prescriptionList"
            );


        if (!prescriptionList) {
            return;
        }


        const allPrescriptions =
            JSON.parse(
                localStorage.getItem(
                    "patientPrescriptions"
                )
            ) || {};


        const prescriptions =
            allPrescriptions[
                String(appointmentId)
            ] || [];


        prescriptionList.innerHTML =
            "";


        if (prescriptions.length === 0) {

            prescriptionList.innerHTML = `
                <div class="prescription-item">

                    <div>
                        <strong>
                            No prescription yet
                        </strong>

                        <p>
                            Your doctor has not added a prescription for this consultation.
                        </p>
                    </div>

                </div>
            `;

            return;
        }


        prescriptions.forEach(
            function (prescription) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "prescription-item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escapeHTML(
                                prescription.medicine
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                prescription.instruction ||
                                "As directed by doctor"
                            )}
                        </p>

                    </div>


                    <span>
                        ${escapeHTML(
                            prescription.duration ||
                            "As prescribed"
                        )}
                    </span>

                `;


                prescriptionList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       SEND MESSAGE
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
            document.createElement(
                "div"
            );


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


        if (chatContainer) {

            chatContainer.appendChild(
                messageElement
            );


            chatContainer.scrollTop =
                chatContainer.scrollHeight;

        }


        /*
         * Save message locally.
         */

        if (currentAppointment) {

            const allMessages =
                JSON.parse(
                    localStorage.getItem(
                        "consultationMessages"
                    )
                ) || {};


            const appointmentId =
                String(
                    currentAppointment.id
                );


            if (
                !allMessages[appointmentId]
            ) {

                allMessages[
                    appointmentId
                ] = [];

            }


            allMessages[
                appointmentId
            ].push({

                sender: "patient",

                message: message,

                time:
                    new Date().toISOString()

            });


            localStorage.setItem(
                "consultationMessages",
                JSON.stringify(
                    allMessages
                )
            );

        }


        messageInput.value = "";

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
                 * Consultation is finished,
                 * but appointment becomes Completed
                 * only after payment.
                 */

                localStorage.setItem(
                    "currentPaymentAppointment",
                    JSON.stringify(
                        currentAppointment
                    )
                );


                const paymentDoctor =
                    document.getElementById(
                        "paymentDoctor"
                    );


                const paymentSpecialization =
                    document.getElementById(
                        "paymentSpecialization"
                    );


                const paymentAmount =
                    document.getElementById(
                        "paymentAmount"
                    );


                const paymentTotal =
                    document.getElementById(
                        "paymentTotal"
                    );


                if (paymentDoctor) {

                    paymentDoctor.textContent =
                        currentAppointment.doctorName;

                }


                if (paymentSpecialization) {

                    paymentSpecialization.textContent =
                        currentAppointment.specialization;

                }


                if (paymentAmount) {

                    paymentAmount.textContent =
                        currentAppointment.fee;

                }


                if (paymentTotal) {

                    paymentTotal.textContent =
                        currentAppointment.fee;

                }


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
                    getAppointments();


                appointments =
                    appointments.map(
                        function (appointment) {

                            if (
                                Number(appointment.id) ===
                                Number(storedAppointment.id)
                            ) {

                                return {

                                    ...appointment,

                                    status:
                                        "Completed",

                                    paymentStatus:
                                        "Paid",

                                    paidAt:
                                        new Date()
                                            .toISOString()

                                };

                            }


                            return appointment;

                        }
                    );


                saveAppointments(
                    appointments
                );


                /*
                 * Save payment.
                 */

                let payments =
                    JSON.parse(
                        localStorage.getItem(
                            "patientPayments"
                        )
                    ) || [];


                payments.push({

                    id:
                        Date.now(),

                    appointmentId:
                        storedAppointment.id,

                    doctorName:
                        storedAppointment.doctorName,

                    specialization:
                        storedAppointment.specialization,

                    date:
                        storedAppointment.date,

                    amount:
                        storedAppointment.fee,

                    status:
                        "Paid",

                    paymentMethod:
                        getSelectedPaymentMethod()

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


                currentAppointment =
                    null;


                alert(
                    "Payment successful! Consultation completed."
                );


                renderConsultations();

                renderHistory();

                renderPayments();

                showPage(
                    "history"
                );

            }
        );

    }


    /* =====================================================
       PAYMENT METHOD
    ===================================================== */

    function getSelectedPaymentMethod() {

        const selected =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        return selected
            ? selected.value
            : "UPI";

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
            getAppointments();


        const completedAppointments =
            appointments.filter(
                function (appointment) {

                    return (
                        appointment.status ===
                        "Completed"
                    );

                }
            );


        tableBody.innerHTML =
            "";


        if (completedCount) {

            completedCount.textContent =
                completedAppointments.length;

        }


        let total = 0;


        completedAppointments.forEach(
            function (appointment) {

                total += parseAmount(
                    appointment.fee
                );


                const row =
                    document.createElement(
                        "tr"
                    );


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


                tableBody.appendChild(
                    row
                );

            }
        );


        if (historyTotalFees) {

            historyTotalFees.textContent =
                "₹" + total;

        }


        const historyCard =
            document.querySelector(
                ".history-card"
            );


        if (
            completedAppointments.length ===
            0
        ) {

            if (historyCard) {
                historyCard.style.display =
                    "none";
            }


            if (emptyHistory) {
                emptyHistory.style.display =
                    "block";
            }

        } else {

            if (historyCard) {
                historyCard.style.display =
                    "block";
            }


            if (emptyHistory) {
                emptyHistory.style.display =
                    "none";
            }

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


        tableBody.innerHTML =
            "";


        payments.forEach(
            function (payment) {

                const row =
                    document.createElement(
                        "tr"
                    );


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


                tableBody.appendChild(
                    row
                );

            }
        );

    }


    /* =====================================================
       FIND DOCTOR BUTTONS
    ===================================================== */

    const findDoctorButtons =
        document.querySelectorAll(
            "#findDoctorFromConsultations, #findDoctorFromHistory"
        );


    findDoctorButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    showPage(
                        "find-doctor"
                    );

                }
            );

        }
    );


    /* =====================================================
       PROFILE
       
       We do NOT change your existing HTML design.
       The edit controls are added through JavaScript.
    ===================================================== */

    function getProfile() {

        const defaultProfile = {

            name: "John Doe",

            email: "john@example.com",

            phone: "+91 XXXXX XXXXX"

        };


        const savedProfile =
            JSON.parse(
                localStorage.getItem(
                    "patientProfile"
                )
            );


        return savedProfile ||
            defaultProfile;

    }


    function saveProfileData(profile) {

        localStorage.setItem(
            "patientProfile",
            JSON.stringify(
                profile
            )
        );

    }


    function loadProfile() {

        const profile =
            getProfile();


        /*
         * Update header.
         */

        const headerName =
            document.querySelector(
                ".profile-info strong"
            );


        const profileImage =
            document.querySelector(
                ".profile-image"
            );


        if (headerName) {

            headerName.textContent =
                profile.name;

        }


        if (profileImage) {

            profileImage.textContent =
                getInitials(
                    profile.name
                );

        }


        /*
         * Update dashboard greeting.
         */

        const greeting =
            document.querySelector(
                ".greeting"
            );


        if (greeting) {

            const firstName =
                profile.name
                    .trim()
                    .split(" ")[0];


            greeting.textContent =
                "Good morning, " +
                firstName +
                "! 👋";

        }


        /*
         * Update profile page.
         */

        const profileCard =
            document.querySelector(
                ".profile-card"
            );


        if (!profileCard) {
            return;
        }


        const profileName =
            profileCard.querySelector(
                "h2"
            );


        const profileEmail =
            profileCard.querySelector(
                ".profile-information div:nth-child(1) span"
            );


        const profilePhone =
            profileCard.querySelector(
                ".profile-information div:nth-child(2) span"
            );


        const largeProfile =
            profileCard.querySelector(
                ".large-profile"
            );


        if (profileName) {

            profileName.textContent =
                profile.name;

        }


        if (profileEmail) {

            profileEmail.textContent =
                profile.email;

        }


        if (profilePhone) {

            profilePhone.textContent =
                profile.phone;

        }


        if (largeProfile) {

            largeProfile.textContent =
                getInitials(
                    profile.name
                );

        }


        createProfileEditControls(
            profileCard,
            profile
        );

    }


    function createProfileEditControls(
        profileCard,
        profile
    ) {

        /*
         * Prevent duplicate controls.
         */

        let editor =
            document.getElementById(
                "profileEditor"
            );


        if (!editor) {

            editor =
                document.createElement(
                    "div"
                );


            editor.id =
                "profileEditor";


            editor.style.display =
                "none";


            editor.innerHTML = `

                <div class="form-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        id="profileEditName"
                        placeholder="Full Name">

                </div>


                <div class="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        id="profileEditEmail"
                        placeholder="Email">

                </div>


                <div class="form-group">

                    <label>
                        Phone
                    </label>

                    <input
                        type="text"
                        id="profileEditPhone"
                        placeholder="Phone">

                </div>


                <div
                    style="
                        display:flex;
                        gap:10px;
                        margin-top:20px;
                    "
                >

                    <button
                        class="primary-button"
                        id="saveProfileBtn"
                        type="button">
                        Save Profile
                    </button>


                    <button
                        class="secondary-button"
                        id="cancelProfileBtn"
                        type="button">
                        Cancel
                    </button>

                </div>

            `;


            profileCard.appendChild(
                editor
            );


            const editButton =
                document.createElement(
                    "button"
                );


            editButton.id =
                "editProfileBtn";


            editButton.className =
                "primary-button";


            editButton.type =
                "button";


            editButton.textContent =
                "Edit Profile";


            editButton.style.marginTop =
                "20px";


            profileCard.appendChild(
                editButton
            );


            editButton.addEventListener(
                "click",
                function () {

                    editor.style.display =
                        "block";


                    editButton.style.display =
                        "none";


                    document.getElementById(
                        "profileEditName"
                    ).value =
                        getProfile().name;


                    document.getElementById(
                        "profileEditEmail"
                    ).value =
                        getProfile().email;


                    document.getElementById(
                        "profileEditPhone"
                    ).value =
                        getProfile().phone;

                }
            );


            document.getElementById(
                "cancelProfileBtn"
            ).addEventListener(
                "click",
                function () {

                    editor.style.display =
                        "none";


                    editButton.style.display =
                        "inline-block";

                }
            );


            document.getElementById(
                "saveProfileBtn"
            ).addEventListener(
                "click",
                function () {

                    const name =
                        document.getElementById(
                            "profileEditName"
                        ).value.trim();


                    const email =
                        document.getElementById(
                            "profileEditEmail"
                        ).value.trim();


                    const phone =
                        document.getElementById(
                            "profileEditPhone"
                        ).value.trim();


                    if (!name) {

                        alert(
                            "Please enter your name."
                        );

                        return;
                    }


                    if (!email) {

                        alert(
                            "Please enter your email."
                        );

                        return;
                    }


                    const updatedProfile = {

                        name:
                            name,

                        email:
                            email,

                        phone:
                            phone ||
                            "+91 XXXXX XXXXX"

                    };


                    saveProfileData(
                        updatedProfile
                    );


                    editor.style.display =
                        "none";


                    editButton.style.display =
                        "inline-block";


                    loadProfile();


                    alert(
                        "Profile updated successfully."
                    );

                }
            );

        }

    }


    /* =====================================================
       SETTINGS
       
       Existing Settings section continues to work.
    ===================================================== */

    const settingsCard =
        document.querySelector(
            ".settings-card"
        );


    if (settingsCard) {

        const settingsInputs =
            settingsCard.querySelectorAll(
                "input"
            );


        const settingsSaveButton =
            settingsCard.querySelector(
                ".primary-button"
            );


        const profile =
            getProfile();


        if (settingsInputs[0]) {
            settingsInputs[0].value =
                profile.name;
        }


        if (settingsInputs[1]) {
            settingsInputs[1].value =
                profile.email;
        }


        if (settingsSaveButton) {

            settingsSaveButton.addEventListener(
                "click",
                function () {

                    const name =
                        settingsInputs[0]
                            ? settingsInputs[0]
                                .value
                                .trim()
                            : profile.name;


                    const email =
                        settingsInputs[1]
                            ? settingsInputs[1]
                                .value
                                .trim()
                            : profile.email;


                    if (!name || !email) {

                        alert(
                            "Please fill in all account information."
                        );

                        return;
                    }


                    saveProfileData({

                        name:
                            name,

                        email:
                            email,

                        phone:
                            getProfile().phone

                    });


                    loadProfile();


                    alert(
                        "Account information updated successfully."
                    );

                }
            );

        }

    }


    /* =====================================================
       DASHBOARD COUNTERS
    ===================================================== */

    function updateDashboardCounters() {

        const appointments =
            getAppointments();


        const upcoming =
            appointments.filter(
                function (appointment) {

                    return (
                        appointment.status ===
                        "Waiting" ||

                        appointment.status ===
                        "Confirmed" ||

                        appointment.status ===
                        "In Progress"
                    );

                }
            );


        const completed =
            appointments.filter(
                function (appointment) {

                    return (
                        appointment.status ===
                        "Completed"
                    );

                }
            );


        const upcomingCount =
            document.getElementById(
                "upcomingCount"
            );


        const completedDashboardCount =
            document.getElementById(
                "completedDashboardCount"
            );


        if (upcomingCount) {

            upcomingCount.textContent =
                upcoming.length;

        }


        if (completedDashboardCount) {

            completedDashboardCount.textContent =
                completed.length;

        }

    }


    /* =====================================================
       DASHBOARD UPCOMING APPOINTMENT
    ===================================================== */

    function updateDashboardAppointment() {

        const appointments =
            getAppointments();


        const upcoming =
            appointments
                .filter(
                    function (appointment) {

                        return (
                            appointment.status ===
                            "Waiting" ||

                            appointment.status ===
                            "Confirmed" ||

                            appointment.status ===
                            "In Progress"
                        );

                    }
                )
                .sort(
                    function (a, b) {

                        const dateA =
                            new Date(
                                a.date +
                                "T" +
                                convertTimeTo24Hour(
                                    a.time
                                )
                            );


                        const dateB =
                            new Date(
                                b.date +
                                "T" +
                                convertTimeTo24Hour(
                                    b.time
                                )
                            );


                        return (
                            dateA - dateB
                        );

                    }
                );


        const doctorName =
            document.getElementById(
                "dashboardDoctorName"
            );


        const dashboardDate =
            document.getElementById(
                "dashboardDate"
            );


        const dashboardTime =
            document.getElementById(
                "dashboardTime"
            );


        const dashboardStatus =
            document.querySelector(
                "#dashboard .appointment .status"
            );


        if (upcoming.length === 0) {

            if (doctorName) {
                doctorName.textContent =
                    "No upcoming consultation";
            }


            if (dashboardDate) {
                dashboardDate.textContent =
                    "—";
            }


            if (dashboardTime) {
                dashboardTime.textContent =
                    "—";
            }


            if (dashboardStatus) {
                dashboardStatus.textContent =
                    "None";
            }


            return;
        }


        const appointment =
            upcoming[0];


        if (doctorName) {

            doctorName.textContent =
                appointment.doctorName;

        }


        if (dashboardDate) {

            dashboardDate.textContent =
                formatDate(
                    appointment.date
                );

        }


        if (dashboardTime) {

            dashboardTime.textContent =
                appointment.time;

        }


        if (dashboardStatus) {

            dashboardStatus.textContent =
                appointment.status;

            dashboardStatus.className =
                "status " +
                getStatusClass(
                    appointment.status
                );

        }

    }


    /* =====================================================
       DOCTOR ACCEPT / REJECT SUPPORT
       
       These functions are provided so your future
       DOCTOR DASHBOARD can update the same appointment.
       
       Example from doctor dashboard:
       
       acceptAppointment(id)
       rejectAppointment(id)
    ===================================================== */

    window.acceptAppointment =
        function (appointmentId) {

            let appointments =
                getAppointments();


            appointments =
                appointments.map(
                    function (appointment) {

                        if (
                            Number(appointment.id) ===
                            Number(appointmentId)
                        ) {

                            return {

                                ...appointment,

                                status:
                                    "Confirmed",

                                confirmedAt:
                                    new Date()
                                        .toISOString()

                            };

                        }


                        return appointment;

                    }
                );


            saveAppointments(
                appointments
            );


            renderConsultations();

            updateDashboardCounters();

            updateDashboardAppointment();


            alert(
                "Appointment confirmed."
            );

        };


    window.rejectAppointment =
        function (appointmentId) {

            let appointments =
                getAppointments();


            appointments =
                appointments.map(
                    function (appointment) {

                        if (
                            Number(appointment.id) ===
                            Number(appointmentId)
                        ) {

                            return {

                                ...appointment,

                                status:
                                    "Rejected",

                                rejectedAt:
                                    new Date()
                                        .toISOString()

                            };

                        }


                        return appointment;

                    }
                );


            saveAppointments(
                appointments
            );


            renderConsultations();

            updateDashboardCounters();

            updateDashboardAppointment();


            alert(
                "Appointment rejected."
            );

        };


    /* =====================================================
       HELPERS
    ===================================================== */

    function getAppointments() {

        return (
            JSON.parse(
                localStorage.getItem(
                    "patientAppointments"
                )
            ) || []
        );

    }


    function saveAppointments(
        appointments
    ) {

        localStorage.setItem(
            "patientAppointments",
            JSON.stringify(
                appointments
            )
        );

    }


    function getInitials(name) {

        if (!name) {
            return "JD";
        }


        return name

            .replace(
                "Dr. ",
                ""
            )

            .trim()

            .split(" ")

            .filter(
                function (word) {
                    return word.length > 0;
                }
            )

            .map(
                function (word) {
                    return word.charAt(0);
                }
            )

            .join("")

            .substring(0, 2)

            .toUpperCase();

    }


    function formatDate(
        dateString
    ) {

        if (!dateString) {
            return "—";
        }


        const date =
            new Date(
                dateString +
                "T00:00:00"
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return dateString;
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function parseAmount(
        value
    ) {

        return Number(

            String(value)

                .replace(
                    "₹",
                    ""
                )

                .replace(
                    ",",
                    ""
                )

                .trim()

        ) || 0;

    }


    function convertTimeTo24Hour(
        timeString
    ) {

        if (!timeString) {
            return "00:00";
        }


        const parts =
            timeString
                .trim()
                .split(" ");


        const time =
            parts[0];


        const modifier =
            (
                parts[1] ||
                "AM"
            ).toUpperCase();


        let [
            hours,
            minutes
        ] =
            time
                .split(":")
                .map(Number);


        if (
            modifier === "PM" &&
            hours !== 12
        ) {

            hours += 12;

        }


        if (
            modifier === "AM" &&
            hours === 12
        ) {

            hours = 0;

        }


        return (

            String(hours)
                .padStart(2, "0")

            +

            ":" +

            String(minutes)
                .padStart(2, "0")

        );

    }


    function getStatusClass(
        status
    ) {

        switch (status) {

            case "Waiting":
                return "waiting";

            case "Confirmed":
                return "confirmed";

            case "In Progress":
                return "confirmed";

            case "Completed":
                return "completed";

            case "Rejected":
                return "rejected";

            default:
                return "confirmed";

        }

    }


    function escapeHTML(
        value
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            value == null
                ? ""
                : String(value);


        return div.innerHTML;

    }


    /* =====================================================
       PREVENT PATIENT FROM ADDING PRESCRIPTIONS
    ===================================================== */

    disablePatientPrescriptionEditing();


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadProfile();

    renderConsultations();

    renderHistory();

    renderPayments();

    updateDashboardCounters();

    updateDashboardAppointment();

    showPage("dashboard");


    /* =====================================================
       AUTOMATIC STATUS REFRESH
       
       Checks every 30 seconds so:
       
       Confirmed → Consult
       
       automatically becomes available when the
       15-minute window begins.
    ===================================================== */

    setInterval(
        function () {

            renderConsultations();

            updateDashboardCounters();

            updateDashboardAppointment();

        },
        30000
    );


});
